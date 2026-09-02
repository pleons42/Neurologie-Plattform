// ════════════════════════════════════════════════════════════════════════
//  Plattform-Barrierefreiheit (geteilt über alle Seiten)
//   • Zoom / dynamische Schriftgröße respektieren (Viewport)
//   • Sichtbarer Tastatur-Fokus (:focus-visible)
//   • ARIA-Rollen/-Label für Modals & Icon-Buttons + Fokus-Handling + Escape
//   • prefers-reduced-motion / -transparency: Transitions & Glas-/Blur-Effekte aus
// ════════════════════════════════════════════════════════════════════════
(function () {
  "use strict";

  // ── 1) Viewport: Pinch-Zoom / vergrößerte Schrift zulassen ───────────
  try {
    var vp = document.querySelector('meta[name="viewport"]');
    if (!vp) { vp = document.createElement("meta"); vp.name = "viewport"; document.head.appendChild(vp); }
    vp.setAttribute("content", "width=device-width, initial-scale=1, viewport-fit=cover");
  } catch (e) {}

  // ── 2) A11y-Stylesheet (Fokus + reduced-motion/-transparency) ────────
  var css = [
    // Sichtbarer Tastatur-Fokus
    'a:focus-visible,button:focus-visible,input:focus-visible,select:focus-visible,textarea:focus-visible,',
    '[role="button"]:focus-visible,[tabindex]:focus-visible,.tb:focus-visible,.stb:focus-visible,',
    '.nb:focus-visible,.sci:focus-visible,.ni-opt:focus-visible{',
    '  outline:3px solid #2E75B6 !important; outline-offset:2px !important;',
    '}',
    // Bewegung reduzieren
    '@media (prefers-reduced-motion: reduce){',
    '  *,*::before,*::after{ transition-duration:1ms !important; animation-duration:1ms !important;',
    '    animation-iteration-count:1 !important; scroll-behavior:auto !important; }',
    '}',
    // Glas/Blur reduzieren (bei reduzierter Bewegung ODER Transparenz) — solider Fallback
    '@media (prefers-reduced-motion: reduce),(prefers-reduced-transparency: reduce){',
    '  *{ -webkit-backdrop-filter:none !important; backdrop-filter:none !important; }',
    '  .card{ background:#ffffff; }',                 /* farbcodierte Karten behalten Farbe (höhere Spezifität) */
    '  .nb,.btn-s{ background:#eef0f3; }',
    '  .subtnav,.seg button{ background:#f2f4f7; }',
    '  nav[aria-label="Modulnavigation"]{ background:#ffffff !important; }',
    '  #ki-modal>div,#lp-modal>div,#kontra-modal>div,#quickref-modal>div,#intro-modal>div,',
    '  #hlh-modal>div,#crs-algo-modal>div,#vqr-modal>div,#vqr-scanner-modal>div,#vqr-import-modal>div{',
    '    background:#ffffff !important; }',
    '}'
  ].join("\n");
  try {
    var st = document.createElement("style");
    st.id = "platform-a11y";
    st.textContent = css;
    document.head.appendChild(st);
  } catch (e) {}

  // ── 3) Icon-only Buttons beschriften (nur Symbol-Inhalt) ─────────────
  function labelIconButtons() {
    try {
      document.querySelectorAll("button:not([aria-label])").forEach(function (b) {
        var t = (b.textContent || "").trim();
        if (t.length <= 2 && /^[\u00D7\u2715\u2716xX\u2039\u203A<>\u2261\u22EF\u2026]?$/.test(t)) {
          var isClose = /[\u00D7\u2715\u2716xX]/.test(t) || /close/i.test(b.getAttribute("onclick") || "");
          b.setAttribute("aria-label", isClose ? "Schließen" : (t || "Aktion"));
        }
      });
    } catch (e) {}
  }

  // ── 4) Modals: ARIA + Fokus-Handling + Escape ────────────────────────
  var MODAL_SEL = ["#ki-modal", "#lp-modal", "#kontra-modal", "#quickref-modal",
    "#intro-modal", "#hlh-modal", "#crs-algo-modal", "#vqr-modal",
    "#vqr-scanner-modal", "#vqr-import-modal", ".ausweis-overlay"];
  var lastFocus = null;
  var openModal = null;

  function labelFor(m) {
    var cand = m.querySelector("h1,h2,h3,h4,.cdtl,.modal-title,[id*='title'],[class*='title']");
    if (!cand) { // erstes inline-fettes Titel-Element (überspringt Fließtext-Fettungen)
      var els = m.querySelectorAll("div,span,p");
      for (var i = 0; i < els.length; i++) {
        var s = els[i].getAttribute("style") || "";
        var tt = (els[i].textContent || "").trim();
        if (/font-weight\s*:\s*(700|800|bold)/i.test(s) && tt.length >= 3 && tt.length <= 80) { cand = els[i]; break; }
      }
    }
    var t = cand && cand.textContent ? cand.textContent.trim() : "";
    if (!t) { t = (m.textContent || "").replace(/\s+/g, " ").trim().slice(0, 60); }
    return t ? t.slice(0, 80) : "Dialog";
  }
  function isVisible(m) {
    return m && getComputedStyle(m).display !== "none" && getComputedStyle(m).visibility !== "hidden";
  }
  function focusables(m) {
    return m.querySelectorAll('a[href],button:not([disabled]),input:not([disabled]),select:not([disabled]),textarea:not([disabled]),[tabindex]:not([tabindex="-1"])');
  }
  function onOpen(m) {
    openModal = m;
    lastFocus = document.activeElement;
    m.setAttribute("role", "dialog");
    m.setAttribute("aria-modal", "true");
    if (!m.getAttribute("aria-label")) m.setAttribute("aria-label", labelFor(m));
    if (!m.hasAttribute("tabindex")) m.setAttribute("tabindex", "-1");
    var f = focusables(m);
    setTimeout(function () { (f.length ? f[0] : m).focus(); }, 30);
  }
  function onClose() {
    openModal = null;
    if (lastFocus && typeof lastFocus.focus === "function") { try { lastFocus.focus(); } catch (e) {} }
    lastFocus = null;
  }
  function findClose(m) {
    var btns = m.querySelectorAll('button,[onclick],a');
    for (var i = 0; i < btns.length; i++) {
      var b = btns[i];
      var t = (b.textContent || "").trim().toLowerCase();
      var oc = (b.getAttribute("onclick") || "").toLowerCase();
      if (t === "schließen" || t === "\u00D7" || t === "x" || /close|hide|schlie/i.test(oc)) return b;
    }
    return null;
  }

  function watchModals() {
    MODAL_SEL.forEach(function (sel) {
      document.querySelectorAll(sel).forEach(function (m) {
        // Grund-ARIA sofort setzen
        m.setAttribute("role", "dialog");
        m.setAttribute("aria-modal", "true");
        if (!m.hasAttribute("tabindex")) m.setAttribute("tabindex", "-1");
        var wasVisible = isVisible(m);
        var mo = new MutationObserver(function () {
          var vis = isVisible(m);
          if (vis && !wasVisible) onOpen(m);
          else if (!vis && wasVisible) onClose();
          wasVisible = vis;
        });
        mo.observe(m, { attributes: true, attributeFilter: ["style", "class", "hidden"] });
      });
    });
  }

  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape" && openModal) {
      var c = findClose(openModal);
      if (c) c.click(); else { openModal.style.display = "none"; }
    }
  });

  function boot() { labelIconButtons(); watchModals(); }
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", boot);
  else boot();
})();
