"use client";

// Re-opens the POPIA consent banner (defined in public/consent.js) so visitors
// can change or withdraw their analytics consent at any time.
export function CookiePreferences() {
  return (
    <button
      type="button"
      onClick={() => {
        const c = (window as unknown as { carronConsent?: { open?: () => void } })
          .carronConsent;
        c?.open?.();
      }}
      className="text-bone-muted underline-offset-2 transition-colors hover:text-gold hover:underline"
    >
      Cookie preferences
    </button>
  );
}
