/* Carron — POPIA consent gate for Google Analytics 4.
 * GA4 (gtag.js) is NOT loaded and NO analytics data is collected until the
 * visitor explicitly accepts. Works on both the Next app and the static
 * questionnaire/result pages (plain vanilla, no dependencies).
 *
 * Exposes:
 *   window.gaEvent(name, params)  — sends a GA4 event ONLY if consent granted
 *   window.carronConsent.granted() / .open()  — state + re-open the banner
 */
(function () {
  "use strict";
  var GA_ID = "G-XZQR7L8MWZ";
  var KEY = "carron_consent"; // localStorage: "granted" | "denied" | (unset)

  window.dataLayer = window.dataLayer || [];
  window.gtag = window.gtag || function () { dataLayer.push(arguments); };

  function state() { try { return localStorage.getItem(KEY); } catch (e) { return null; } }
  function save(v) { try { localStorage.setItem(KEY, v); } catch (e) {} }

  var gaLoaded = false;
  function loadGA() {
    if (gaLoaded) return;
    gaLoaded = true;
    var s = document.createElement("script");
    s.async = true;
    s.src = "https://www.googletagmanager.com/gtag/js?id=" + GA_ID;
    (document.head || document.documentElement).appendChild(s);
    gtag("js", new Date());
    gtag("config", GA_ID);
  }

  // Events only reach GA4 when consent has been granted.
  window.gaEvent = function (name, params) {
    if (state() === "granted") gtag("event", name, params || {});
  };

  var el = null;
  function close() { if (el && el.parentNode) el.parentNode.removeChild(el); el = null; }

  function banner() {
    if (el || state() === "denied" || state() === "granted") {
      if (state() === "granted") return; // nothing to show
    }
    if (el) return;
    var bar = document.createElement("div");
    bar.setAttribute("role", "dialog");
    bar.setAttribute("aria-label", "Privacy and cookies");
    bar.style.cssText =
      "position:fixed;left:0;right:0;bottom:0;z-index:2147483647;background:#08251A;" +
      "border-top:2px solid #D4AF37;color:#EFE9DA;padding:16px;" +
      "font-family:system-ui,-apple-system,'Segoe UI',Roboto,sans-serif;" +
      "box-shadow:0 -8px 30px -12px rgba(0,0,0,.55)";

    var inner = document.createElement("div");
    inner.style.cssText =
      "max-width:1100px;margin:0 auto;display:flex;flex-wrap:wrap;align-items:center;" +
      "gap:14px;justify-content:space-between";

    var txt = document.createElement("p");
    txt.style.cssText = "margin:0;flex:1 1 300px;font-size:13.5px;line-height:1.55;color:#EFE9DA";
    txt.innerHTML =
      "We'd like to use Google Analytics to understand how visitors use this site so we " +
      "can improve it. No analytics data is collected until you accept. See our " +
      '<a href="/privacy" style="color:#D4AF37;text-decoration:underline">Privacy Notice</a>.';

    var btns = document.createElement("div");
    btns.style.cssText = "display:flex;gap:10px;flex:0 0 auto";

    var decline = document.createElement("button");
    decline.type = "button";
    decline.textContent = "Decline";
    decline.style.cssText =
      "cursor:pointer;border:1px solid rgba(212,175,55,.5);background:transparent;color:#EFE9DA;" +
      "font-weight:600;font-size:13.5px;padding:10px 18px;border-radius:999px";

    var accept = document.createElement("button");
    accept.type = "button";
    accept.textContent = "Accept";
    accept.style.cssText =
      "cursor:pointer;border:none;background:#D4AF37;color:#08251A;font-weight:700;" +
      "font-size:13.5px;padding:10px 20px;border-radius:999px";

    decline.addEventListener("click", function () { save("denied"); close(); });
    accept.addEventListener("click", function () { save("granted"); close(); loadGA(); });

    btns.appendChild(decline);
    btns.appendChild(accept);
    inner.appendChild(txt);
    inner.appendChild(btns);
    bar.appendChild(inner);
    (document.body || document.documentElement).appendChild(bar);
    el = bar;
  }

  window.carronConsent = {
    granted: function () { return state() === "granted"; },
    open: function () { banner(); }
  };

  // Boot: load GA if already granted; otherwise show the banner (once undecided).
  var st = state();
  if (st === "granted") {
    loadGA();
  } else if (st !== "denied") {
    if (document.readyState === "loading") {
      document.addEventListener("DOMContentLoaded", banner);
    } else {
      banner();
    }
  }
})();
