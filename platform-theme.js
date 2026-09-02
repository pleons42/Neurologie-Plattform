// ════════════════════════════════════════════════════════════════════════
//  Plattform-Theme (Phase 1) — neues Designsystem aus dem Claude-Design-Mockup
//   • Warmer Hintergrund-Verlauf (#e6ecfa → #f6f4ef → #e8eef7)
//   • Etwas großzügigere Rundungen
//  Additiv über die bestehenden, funktionierenden Modul-Screens (nicht Launcher).
//  Verlauf/Primärfarbe (#0062CC → #4B3FB0) bleibt — deckt sich bereits mit dem Mockup.
// ════════════════════════════════════════════════════════════════════════
(function () {
  "use strict";
  var css = [
    // Warmer Hintergrund (Signature des neuen Designs)
    "body{",
    "  background: linear-gradient(160deg, #e6ecfa 0%, #f6f4ef 52%, #e8eef7 100%) !important;",
    "  background-attachment: fixed !important;",
    "}",
    // Etwas rundere Karten/Flächen (Mockup: 14–20px)
    ".card{ border-radius:18px; }",
    ".nb, .btn-p, .btn-s, .seg, .subtnav{ border-radius:12px; }",
    // Bottom-Navigation & Modalfenster an die warme Fläche angleichen
    'nav[aria-label="Modulnavigation"]{ background:rgba(246,244,239,.78) !important; }',
    "#ki-modal>div,#lp-modal>div,#kontra-modal>div,#quickref-modal>div,#intro-modal>div,",
    "#hlh-modal>div,#crs-algo-modal>div,#vqr-modal>div,#vqr-scanner-modal>div,#vqr-import-modal>div{",
    "  border-radius:20px !important;",
    "}",
    // ── Einheitliche helle Modul-Kopfzeilen (passend zum warmen Plattform-Design) ──
    ".masthead{ background:rgba(255,255,255,.82) !important; color:#16233d !important;",
    "  -webkit-backdrop-filter:blur(16px) saturate(1.5) !important; backdrop-filter:blur(16px) saturate(1.5) !important;",
    "  border:1px solid rgba(60,60,67,.10) !important; box-shadow:0 2px 14px rgba(31,40,90,.06) !important; }",
    "header.hdr, div.hdr{ background:rgba(255,255,255,.82) !important; color:#16233d !important;",
    "  -webkit-backdrop-filter:blur(16px) saturate(1.5) !important; backdrop-filter:blur(16px) saturate(1.5) !important;",
    "  border-bottom:1px solid rgba(60,60,67,.10) !important; box-shadow:0 1px 12px rgba(31,40,90,.05) !important; }",
    ".masthead h1, header.hdr h1, div.hdr h1{ color:#16233d !important; }",
    "header.hdr .sub, .hdr .sub{ color:#5a6472 !important; }",
    ".masthead-right{ color:#7a8290 !important; }",
    '.masthead a[href="index.html"]{ background:rgba(0,98,204,.08) !important; color:#0062CC !important; border:1px solid rgba(0,98,204,.18) !important; border-radius:10px !important; padding:6px 12px !important; }',
    "header.hdr .back, .hdr .back{ background:rgba(0,98,204,.08) !important; color:#0062CC !important; border:1px solid rgba(0,98,204,.18) !important; }",
    "div.hdr img.banner{ display:none !important; }",
    ".hdr-title{ display:flex; flex-direction:column; gap:2px; padding:13px 16px; }",
    ".hdr-title strong{ font-size:17px; font-weight:800; color:#16233d; letter-spacing:.01em; }",
    ".hdr-title span{ font-size:12px; color:#5a6472; }",
    'a[title="Zur Startseite"]{ background:rgba(0,98,204,.08) !important; color:#0062CC !important; border:1px solid rgba(0,98,204,.18) !important; }',
    // ── ICANS Dienst/Visiten-Umschalter als Chips (wie "Häufig im Dienst") ──
    "#mode-toggle-bar{ gap:8px !important; border:none !important; overflow:visible !important; border-radius:0 !important; }",
    "#mode-toggle-bar button{ flex:1; border-radius:999px !important; border:1px solid rgba(60,60,67,.14) !important;",
    "  background:rgba(255,255,255,.72) !important; -webkit-backdrop-filter:blur(12px); backdrop-filter:blur(12px);",
    "  color:#16233d !important; min-height:46px; font-weight:600 !important; box-shadow:0 1px 6px rgba(31,40,90,.05); transition:background .15s,color .15s,box-shadow .15s; }",
    // ── P1: Stroke-Reiter (.tabnav/.tb) als umbrechende Chips (wie ASM) ──
    ".tabnav{ display:flex !important; flex-wrap:wrap !important; gap:8px !important; border:none !important; overflow:visible !important; white-space:normal !important; }",
    ".tabnav .tb{ flex:0 0 auto; border-radius:999px !important; border:1px solid rgba(60,60,67,.14) !important; background:rgba(255,255,255,.72) !important; -webkit-backdrop-filter:blur(12px); backdrop-filter:blur(12px); color:#16233d !important; padding:9px 16px !important; min-height:44px; font-weight:600 !important; white-space:nowrap; box-shadow:0 1px 6px rgba(31,40,90,.05); }",
    ".tabnav .tb.on{ background:linear-gradient(135deg,#0062CC,#4B3FB0) !important; color:#fff !important; border-color:transparent !important; box-shadow:0 4px 14px rgba(0,98,204,.28) !important; }",
    // ── P2: Touch-Ziele ≥ 44 px (plattformweit) ──
    ".ptin, .ptsel{ min-height:44px !important; }",
    ".ice-btn{ min-height:44px !important; }",
    ".liver-btn{ min-height:44px !important; }",
    ".es-btns button{ min-height:44px !important; min-width:44px !important; }",
    "input.wakeup-cb{ width:22px !important; height:22px !important; }",
    "button[onclick*='resetNIHSS']{ min-height:40px !important; font-size:.72rem !important; padding:7px 13px !important; }",
    "a[title='Zur Startseite']{ min-height:44px !important; display:inline-flex; align-items:center; }",
    "#mode-toggle-bar button{ min-height:40px !important; }",
    // ── ASM-Reiter als umbrechende Chips (wie "Häufig im Dienst") ──
    ".tabbar{ display:flex !important; flex-wrap:wrap !important; gap:8px !important; border:none !important; }",
    ".tabbar button{ flex:0 0 auto; border-radius:999px !important; border:1px solid rgba(60,60,67,.14) !important;",
    "  background:rgba(255,255,255,.72) !important; -webkit-backdrop-filter:blur(12px); backdrop-filter:blur(12px);",
    "  color:#16233d !important; padding:9px 16px !important; min-height:44px; font-weight:600 !important; white-space:nowrap; box-shadow:0 1px 6px rgba(31,40,90,.05); }",
    ".tabbar button.active{ background:linear-gradient(135deg,#0062CC,#4B3FB0) !important; color:#fff !important; border-color:transparent !important; box-shadow:0 4px 14px rgba(0,98,204,.28) !important; }",
    "#mode-toggle-bar button.on-chip{ background:linear-gradient(135deg,#0062CC,#4B3FB0) !important; color:#fff !important; border-color:transparent !important; box-shadow:0 4px 14px rgba(0,98,204,.28) !important; }",
  ].join("\n");
  try {
    var s = document.createElement("style");
    s.id = "platform-theme";
    s.textContent = css;
    (document.head || document.documentElement).appendChild(s);
  } catch (e) {}
  try {
    if (/icans/i.test(location.pathname)) {
      var addTitle = function () {
        var hdr = document.querySelector("div.hdr");
        if (hdr && !hdr.querySelector(".hdr-title")) {
          var t = document.createElement("div");
          t.className = "hdr-title";
          t.innerHTML = "<strong>ICANS / CRS</strong><span>Grading &middot; Therapie &middot; Risikostratifizierung</span>";
          hdr.appendChild(t);
        }
      };
      if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", addTitle); else addTitle();
    }
  } catch (e) {}
})();
