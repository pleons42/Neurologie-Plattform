// ════════════════════════════════════════════════════════════════════════
//  Plattform-Ansichtsmodus (Mobil / Desktop) — geteilt über alle Seiten
//   • Umschalt-Button auf JEDER Seite (unten rechts, einhändig erreichbar)
//   • Modus wird gespeichert und gilt seitenübergreifend (localStorage)
//   • Mobil: schmale, einhändige Spalte · Desktop: breitere Spalte
//   • Desktop-Home: Modul-Kacheln mehrspaltig
//  Orientiert am Claude-Design-Vorschlag (Desktop/Mobil-Umschaltung je Seite).
// ════════════════════════════════════════════════════════════════════════
(function () {
  "use strict";
  var KEY = "neuro_viewmode";

  function getMode() {
    var m = null; try { m = localStorage.getItem(KEY); } catch (e) {}
    if (m !== "mobile" && m !== "desktop") m = (window.innerWidth >= 900) ? "desktop" : "mobile";
    return m;
  }
  var mode = getMode();
  document.documentElement.setAttribute("data-view", mode);

  var css = [
    // Content-Spalte: Breite je Modus (Header/Nav bleiben unberührt)
    "[data-view] .wrap,[data-view] .ct,[data-view] main.main{ margin-left:auto !important; margin-right:auto !important; transition:max-width .18s ease; }",
    "[data-view=mobile] .wrap,[data-view=mobile] .ct,[data-view=mobile] main.main{ max-width:480px !important; }",
    "[data-view=desktop] .wrap,[data-view=desktop] .ct,[data-view=desktop] main.main{ max-width:1040px !important; }",
    // Bottom-Navigation an die Spalte anlegen
    "[data-view] nav[aria-label]{ margin-left:auto; margin-right:auto; }",
    "[data-view=mobile] nav[aria-label]{ max-width:480px; }",
    "[data-view=desktop] nav[aria-label]{ max-width:1040px; }",
    // Desktop-Home: Kacheln & Häufig mehrspaltig, mehr Luft
    "[data-view=desktop] .modules{ display:grid !important; grid-template-columns:1fr 1fr; gap:12px; }",
    "[data-view=desktop] .recents{ }",
    "[data-view=desktop] h1{ font-size:30px; }",
    // Umschalt-Button (unten rechts, über der Nav)
    "#viewmode-toggle{ position:fixed; right:12px; bottom:calc(84px + env(safe-area-inset-bottom,0px)); z-index:803;",
    "  display:flex; gap:2px; padding:3px; border-radius:999px;",
    "  background:rgba(255,255,255,.78); -webkit-backdrop-filter:blur(16px) saturate(1.4); backdrop-filter:blur(16px) saturate(1.4);",
    "  border:1px solid rgba(60,60,67,.15); box-shadow:0 4px 16px rgba(20,30,60,.18); }",
    "#viewmode-toggle button{ font:600 11px -apple-system,BlinkMacSystemFont,'Segoe UI',system-ui,sans-serif;",
    "  border:none; background:none; color:#5a6270; padding:6px 12px; border-radius:999px; cursor:pointer; min-height:32px; }",
    "#viewmode-toggle button.on{ background:linear-gradient(135deg,#0062CC,#4B3FB0); color:#fff; }",
    // Desktop: Fachmodul-Inhalt zweispaltig (Karten fliessen in zwei Spalten)
    "[data-view=desktop] .tabpanel, [data-view=desktop] .spanel{ column-count:2; column-gap:22px; }",
    "[data-view=desktop] .tabpanel > *, [data-view=desktop] .spanel > *{ break-inside:avoid; -webkit-column-break-inside:avoid; }",
    "[data-view=desktop] .tabbar, [data-view=desktop] .subtnav, [data-view=desktop] .stbwrap{ column-span:all; }",
    "[data-view=mobile] .ssumgrid{ grid-template-columns:1fr !important; }",
    "[data-view=mobile] #tab-se.active{ display:flex !important; flex-direction:column; }",
    "[data-view=mobile] #tab-se.active > .mhh-section-title, [data-view=mobile] #tab-se.active > #mhh-contacts{ order:90; }",
    "@media (prefers-reduced-motion: reduce){ [data-view] .wrap,[data-view] .ct,[data-view] main.main{ transition:none; } }"
  ].join("\n");
  var st = document.createElement("style"); st.id = "viewmode-style"; st.textContent = css;
  (document.head || document.documentElement).appendChild(st);

  function setMode(m) {
    mode = m;
    try { localStorage.setItem(KEY, m); } catch (e) {}
    document.documentElement.setAttribute("data-view", m);
    var box = document.getElementById("viewmode-toggle");
    if (box) box.querySelectorAll("button").forEach(function (b) { b.classList.toggle("on", b.getAttribute("data-m") === m); });
  }

  function build() {
    if (document.getElementById("viewmode-toggle")) return;
    var box = document.createElement("div");
    box.id = "viewmode-toggle"; box.setAttribute("role", "group"); box.setAttribute("aria-label", "Ansicht: Mobil oder Desktop");
    [["mobile", "Mobil"], ["desktop", "Desktop"]].forEach(function (p) {
      var b = document.createElement("button"); b.type = "button"; b.textContent = p[1];
      b.setAttribute("data-m", p[0]); b.setAttribute("aria-label", "Ansicht " + p[1]);
      if (p[0] === mode) b.className = "on";
      b.onclick = function () { setMode(p[0]); };
      box.appendChild(b);
    });
    document.body.appendChild(box);
  }
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", build); else build();
})();
