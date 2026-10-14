#!/usr/bin/env bash
#
# Deploy carron.co.za.
#
# Publishing this site means exactly one thing: fast-forwarding `main` on the
# `carron` remote. Cloudflare Workers Builds watches that branch and deploys it.
#
#   NEVER run `wrangler deploy` from a Claude Code session. There is no API
#   token available and the OAuth flow is interactive, so it hangs or
#   half-publishes. An empty .github/workflows/ does NOT mean there is no
#   auto-deploy — the deploy is wired up on Cloudflare's side, not here.
#
#   NEVER run `npm run build` while a dev preview is running: it corrupts the
#   dev server's .next and breaks the live preview. Use --check (tsc) instead.
#
# Usage:
#   bash scripts/deploy.sh              deploy
#   bash scripts/deploy.sh --dry-run    run every check, push nothing
#   bash scripts/deploy.sh --check      type-check first, then deploy
#
# Safe by design: it pushes only if your commit already contains the current
# remote main (a true fast-forward). It never force-pushes and never rewrites
# history. If the remote has moved ahead, it stops and tells you to merge.

set -euo pipefail

REMOTE="carron"
BRANCH="main"
DRY_RUN=0
CHECK=0

for arg in "$@"; do
  case "$arg" in
    --dry-run) DRY_RUN=1 ;;
    --check)   CHECK=1 ;;
    -h|--help) sed -n '2,28p' "$0" | sed 's/^# \?//'; exit 0 ;;
    *) printf 'Unknown option: %s (try --help)\n' "$arg" >&2; exit 2 ;;
  esac
done

say()  { printf '  %s\n' "$1"; }
ok()   { printf '  \033[32mok\033[0m    %s\n' "$1"; }
warn() { printf '  \033[33mwarn\033[0m  %s\n' "$1"; }
die()  { printf '\n  \033[31mSTOP\033[0m  %s\n\n' "$1" >&2; exit 1; }

printf '\n  Deploying carron.co.za\n  ----------------------\n'

# --- 0. Repository ---------------------------------------------------------
ROOT="$(git rev-parse --show-toplevel 2>/dev/null)" || die "not inside a git repository."
cd "$ROOT"
say "repo    $ROOT"

git remote get-url "$REMOTE" >/dev/null 2>&1 \
  || die "no '$REMOTE' remote here. Expected the Carron-Advisory GitHub repo."

HEAD_SHA="$(git rev-parse HEAD)"
HEAD_REF="$(git rev-parse --abbrev-ref HEAD)"
say "branch  $HEAD_REF ($(git rev-parse --short HEAD))"

# --- 1. Nothing uncommitted ------------------------------------------------
# Only committed work is deployed, so a dirty tree almost always means someone
# is about to deploy something other than what they are looking at.
if [ -n "$(git status --porcelain --untracked-files=no)" ]; then
  printf '\n'; git status --short --untracked-files=no | sed 's/^/      /'
  die "you have uncommitted changes. Commit them first — only committed work deploys."
fi
ok "working tree clean"

UNTRACKED="$(git ls-files --others --exclude-standard | head -5)"
if [ -n "$UNTRACKED" ]; then
  warn "untracked files present; they will NOT be deployed:"
  printf '%s\n' "$UNTRACKED" | sed 's/^/          /'
fi

# --- 2. Optional type check ------------------------------------------------
if [ "$CHECK" = "1" ]; then
  # node/npm are not on PATH on this machine.
  export PATH="/c/Program Files/nodejs:$PATH"
  command -v npx >/dev/null 2>&1 || die "npx not found. Is Node installed at C:\Program Files\nodejs?"
  say "checking types (tsc --noEmit) ..."
  npx --no-install tsc --noEmit || die "type errors. Fix them before deploying."
  ok "types clean"
fi

# --- 3. Refresh the remote -------------------------------------------------
# Several worktrees share this repo and other sessions push, so never trust a
# cached remote ref.
git fetch "$REMOTE" "$BRANCH" --quiet || die "could not fetch $REMOTE/$BRANCH. Check your network."
REMOTE_SHA="$(git rev-parse "$REMOTE/$BRANCH")"
ok "fetched $REMOTE/$BRANCH ($(git rev-parse --short "$REMOTE/$BRANCH"))"

# --- 4. Is there anything to do? -------------------------------------------
if [ "$HEAD_SHA" = "$REMOTE_SHA" ]; then
  printf '\n  Nothing to deploy — %s/%s is already at your commit.\n\n' "$REMOTE" "$BRANCH"
  exit 0
fi

# --- 5. Fast-forward only --------------------------------------------------
if ! git merge-base --is-ancestor "$REMOTE_SHA" "$HEAD_SHA"; then
  printf '\n      %s/%s has commits you do not have:\n\n' "$REMOTE" "$BRANCH"
  git --no-pager log --oneline --no-decorate "$HEAD_SHA..$REMOTE_SHA" | sed 's/^/        /'
  die "this would not be a fast-forward. Merge $REMOTE/$BRANCH into your branch, re-check, then run again. Do NOT force-push."
fi
ok "fast-forward (your commit contains $REMOTE/$BRANCH)"

# --- 6. Show exactly what ships -------------------------------------------
COUNT="$(git rev-list --count "$REMOTE_SHA..$HEAD_SHA")"
printf '\n  %s commit(s) will go live:\n\n' "$COUNT"
git --no-pager log --oneline --no-decorate "$REMOTE_SHA..$HEAD_SHA" | sed 's/^/      /'
printf '\n  Files changed:\n\n'
git --no-pager diff --stat "$REMOTE_SHA..$HEAD_SHA" | sed 's/^/      /'
printf '\n'

if [ "$DRY_RUN" = "1" ]; then
  printf '  \033[33mDry run\033[0m — every check passed, nothing was pushed.\n'
  printf '  Run without --dry-run to deploy.\n\n'
  exit 0
fi

# --- 7. Push = deploy ------------------------------------------------------
say "pushing to $REMOTE/$BRANCH ..."
git push "$REMOTE" "$HEAD_SHA:refs/heads/$BRANCH"
ok "pushed"

printf '\n  Deployed. Cloudflare Workers Builds picks this up automatically;\n'
printf '  it usually takes a couple of minutes to go live at https://carron.co.za\n'
printf '  Build log: Cloudflare dashboard -> Workers & Pages -> the site -> Builds\n'

# --- 8. Leave no stale local main -----------------------------------------
# Worktrees cannot check out a branch another worktree holds, so a deploy from
# a feature branch leaves the main checkout behind. Say so rather than silently
# touching another worktree.
if [ "$HEAD_REF" != "$BRANCH" ]; then
  MAIN_WT="$(git worktree list --porcelain \
    | awk -v b="refs/heads/$BRANCH" '/^worktree /{wt=$2} $0=="branch "b{print wt; exit}')"
  if [ -n "$MAIN_WT" ]; then
    printf '\n  Note: your %s checkout is now behind. Update it with:\n\n      git -C "%s" pull\n' "$BRANCH" "$MAIN_WT"
  fi
fi
printf '\n'
