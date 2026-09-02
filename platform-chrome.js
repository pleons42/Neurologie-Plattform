// ════════════════════════════════════════════════════════════════════════
//  Plattform-Chrome (Phase 3) — geteilt über alle Modul-Screens
//   • Modul-Akzentstreifen oben (Orientierung)
//   • EINHEITLICHE Bottom-Navigation: Start · Suche · Kontakte · Mehr
//     (deckungsgleich mit dem Home-Screen)
//   • Deep-Link-Handler: #status/#fahreignung/#lyse/#cha2ds2/#grading
//     aktiviert nach dem Laden den passenden Reiter (best-effort)
// ════════════════════════════════════════════════════════════════════════
(function () {
  "use strict";
  var ACCENT = { "asm.html":"#2D6A4F", "icans.html":"#2E75B6", "stroke.html":"#C0392B", "neuroimmun.html":"#0F766E", "kontakte.html":"#4B3FB0", "index.html":"#8a8f98" };
  var NAV = [
    { label:"Start",    icon:"\u2302", href:"index.html" },
    { label:"Suche",    icon:"\uD83D\uDD0D", href:"index.html#suche" },
    { label:"Kontakte", icon:"\u260E", href:"kontakte.html" },
    { label:"Mehr",     icon:"\u22EF", href:"index.html" }
  ];
  var path = (location.pathname.split("/").pop() || "").toLowerCase();
  var accent = ACCENT[path] || "#8a8f98";

  function ready(fn){ if(document.readyState==="loading") document.addEventListener("DOMContentLoaded",fn); else fn(); }

  ready(function () {
    // "Zuletzt benutzt" auf Themen-/Werkzeug-Ebene (nicht Modul-Ebene)
    var TOPICS = {
      "asm.html":             { id:"asm-ix",     label:"Wechselwirkungen",       sub:"ASM · Interaktionen",     href:"asm.html" },
      "asm.html#status":      { id:"asm-se",     label:"Status epilepticus",     sub:"ASM · Akuttherapie",      href:"asm.html#status" },
      "asm.html#fahreignung": { id:"asm-fahr",   label:"Fahreignung",            sub:"ASM",                     href:"asm.html#fahreignung" },
      "icans.html":           { id:"icans-grad", label:"ICANS-Grading",          sub:"ICE-Score · Therapie",    href:"icans.html" },
      "icans.html#grading":   { id:"icans-grad", label:"ICANS-Grading",          sub:"ICE-Score · Therapie",    href:"icans.html#grading" },
      "stroke.html":          { id:"stroke-zna", label:"NIHSS \u00b7 Lyse",       sub:"Stroke · ZNA",            href:"stroke.html#zna" },
      "stroke.html#zna":      { id:"stroke-zna", label:"NIHSS \u00b7 Lyse",       sub:"Stroke · ZNA",            href:"stroke.html#zna" },
      "stroke.html#lyse":     { id:"stroke-lyse",label:"Lyse-Kontraindikationen",sub:"Stroke · ZNA",            href:"stroke.html#lyse" },
      "stroke.html#su":       { id:"stroke-su",  label:"Stroke Unit",            sub:"Sekundärprophylaxe",      href:"stroke.html#su" },
      "stroke.html#cha2ds2":  { id:"stroke-cha", label:"CHA\u2082DS\u2082-VASc",  sub:"Stroke Unit",             href:"stroke.html#cha2ds2" },
      "stroke.html#paed":     { id:"stroke-paed",label:"Pädiatrie",              sub:"Kindlicher Schlaganfall", href:"stroke.html#paed" },
      "stroke.html#grav":     { id:"stroke-grav",label:"Schwangere · Lyse",       sub:"Stroke · Rekanalisation", href:"stroke.html#grav" },
      "stroke.html#syndd":    { id:"stroke-syndd",label:"Syndrom-DD",             sub:"Anticholinerg/Serotonin/MNS", href:"stroke.html#syndd" },
      "stroke.html#antikoag": { id:"stroke-antikoag",label:"Antikoagulation · Antagonisierung", sub:"Reversierung / Lyse-Eignung", href:"stroke.html#antikoag" },
      "kontakte.html":        { id:"kontakte",   label:"Kontakte",               sub:"Notfallnummern · MHH",    href:"kontakte.html" }
    };
    function logTopic(t) {
      if (!t) return;
      try {
        var r = []; try { r = JSON.parse(localStorage.getItem("neuro_recents")) || []; } catch (e) {}
        r = r.filter(function (x) { return x.id !== t.id; });
        r.unshift({ id: t.id, label: t.label, sub: t.sub, href: t.href, ts: Date.now() });
        localStorage.setItem("neuro_recents", JSON.stringify(r.slice(0, 3)));
      } catch (e) {}
    }
    try { logTopic(TOPICS[path + (location.hash || "")] || TOPICS[path] || null); } catch (e) {}
    // Tab-/Werkzeug-Wechsel als Thema protokollieren
    try {
      var ASM_TAB = { ix:TOPICS["asm.html"], syn:{id:"asm-syn",label:"Syndrome",sub:"ASM · Syndrom-Modul",href:"asm.html"}, se:TOPICS["asm.html#status"], fahr:TOPICS["asm.html#fahreignung"] };
      if (typeof window.switchTab === "function") { var _sw = window.switchTab; window.switchTab = function (id) { var rr = _sw.apply(this, arguments); logTopic(ASM_TAB[id]); return rr; }; }
      var STROKE_TAB = { zna:TOPICS["stroke.html#zna"], su:TOPICS["stroke.html#su"], paed:TOPICS["stroke.html#paed"], grav:TOPICS["stroke.html#grav"], syndd:TOPICS["stroke.html#syndd"], antikoag:TOPICS["stroke.html#antikoag"] };
      if (typeof window.showTab === "function") { var _st = window.showTab; window.showTab = function (id) { var rr = _st.apply(this, arguments); logTopic(STROKE_TAB[id]); return rr; }; }
    } catch (e) {}
    // Akzentstreifen oben
    var strip = document.createElement("div");
    strip.style.cssText = "position:fixed;top:0;left:0;right:0;height:3px;z-index:801;background:"+accent+";pointer-events:none";
    document.body.appendChild(strip);

    // Einheitliche Bottom-Navigation
    var nav = document.createElement("nav");
    nav.setAttribute("aria-label","Navigation");
    nav.style.cssText = [
      "position:fixed","left:0","right:0","bottom:0","z-index:800",
      "display:flex","justify-content:space-around","align-items:stretch",
      "padding:4px 6px","padding-bottom:calc(4px + env(safe-area-inset-bottom,0px))",
      "background:rgba(246,244,239,.8)",
      "-webkit-backdrop-filter:blur(20px) saturate(1.5)","backdrop-filter:blur(20px) saturate(1.5)",
      "border-top:1px solid rgba(60,60,67,.12)","box-shadow:0 -4px 24px rgba(31,40,90,.06)"
    ].join(";");
    NAV.forEach(function (m) {
      var active = (m.href.split("#")[0] === path);
      var a = document.createElement("a");
      a.href = m.href;
      if (active) a.setAttribute("aria-current","page");
      a.style.cssText = [
        "flex:1","display:flex","flex-direction:column","align-items:center","justify-content:center","gap:2px",
        "min-height:52px","padding:6px 0","border-radius:12px","text-decoration:none",
        "font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif",
        "font-size:11px","font-weight:"+(active?"700":"500"),
        "color:"+(active?"#0062CC":"#6a6f78"),
        "background:"+(active?"rgba(0,98,204,.06)":"transparent")
      ].join(";");
      a.innerHTML = '<span style="font-size:19px;line-height:1">'+m.icon+"</span><span>"+m.label+"</span>";
      nav.appendChild(a);
    });
    document.body.appendChild(nav);

    var prev = parseFloat(getComputedStyle(document.body).paddingBottom) || 0;
    if (prev < 72) document.body.style.paddingBottom = "calc(72px + env(safe-area-inset-bottom,0px))";

    // ── Deep-Link-Handler (best-effort) ──
    var DEEP = {
      status:      { tab:"Status epilepticus" },
      fahreignung: { tab:"Fahreignung" },
      lyse:        { tab:"ZNA", scroll:"Absolute Kontraindikationen" },
      cha2ds2:     { tab:"Stroke Unit", sub:"Sekundärprophylaxe", scroll:"CHA" },
      grading:     { scroll:"ICE-Score erheben" },
      zna:         { tab:"ZNA" },
      su:          { tab:"Stroke Unit" },
      paed:        { tab:"Pädiatrie" },
      grav:        { tab:"Schwangere" },
      syndd:       { tab:"Syndrom-DD" },
      antikoag:    { tab:"Antikoag." }
    };
    // Sanftes Bestätigungs-Aufblitzen des Ziels nach Deep-Link-Navigation
    try {
      var _fs = document.createElement("style");
      _fs.textContent = "@keyframes nfFlash{0%{box-shadow:0 0 0 0 rgba(0,98,204,0);background-color:rgba(0,98,204,0)}18%{box-shadow:0 0 0 4px rgba(0,98,204,.22);background-color:rgba(0,98,204,.10)}100%{box-shadow:0 0 0 0 rgba(0,98,204,0);background-color:rgba(0,98,204,0)}}.nf-flash{animation:nfFlash 1.25s cubic-bezier(.22,.61,.36,1);border-radius:12px}@media (prefers-reduced-motion:reduce){.nf-flash{animation:none}}";
      (document.head || document.documentElement).appendChild(_fs);
    } catch (e) {}
    function flashEl(el) { try { el.classList.add("nf-flash"); setTimeout(function () { el.classList.remove("nf-flash"); }, 1300); } catch (e) {} }
    function findTab(text) { var els = document.querySelectorAll('.tabbar button,.tabnav button,.tb,.stb,[data-tab],[role="tab"]'); var t = text.toLowerCase(); for (var i = 0; i < els.length; i++) { if ((els[i].textContent || "").toLowerCase().indexOf(t) !== -1) return els[i]; } return null; }
    function findText(text) { var t = text.toLowerCase(); var all = document.querySelectorAll("h1,h2,h3,h4,div,span,p,button,section,a,li"); for (var i = 0; i < all.length; i++) { var tc = (all[i].textContent || ""); if (tc.length < 120 && tc.toLowerCase().indexOf(t) !== -1) { var r = all[i].getBoundingClientRect(); if (r.width > 0 && r.height > 0) return all[i]; } } return null; }
    function activePanel() {
      var cands = document.querySelectorAll('.tabpanel,.tpanel,.tab-content,.spanel,.panel,[role="tabpanel"]');
      for (var i = 0; i < cands.length; i++) { var c = cands[i]; if (c.offsetParent !== null && c.getBoundingClientRect().height > 60) return c; }
      return null;
    }
    function runDeep() {
      var h = (location.hash || "").replace(/^#/, "").toLowerCase();
      if (!DEEP[h]) return;
      var d = DEEP[h], tries = 0, flashed = false;
      var run = function () {
        tries++;
        var tabOk = d.tab ? clickTab(d.tab) : true;
        var subOk = d.sub ? clickTab(d.sub) : true;
        var scrollOk = d.scroll ? scrollToText(d.scroll) : true;
        if (tabOk && subOk && scrollOk && !flashed) {
          flashed = true;
          setTimeout(function () {
            var target = d.scroll ? findText(d.scroll) : activePanel();
            if (!target) target = d.sub ? findTab(d.sub) : (d.tab ? findTab(d.tab) : null);
            if (target) flashEl(target);
          }, 300);
        }
        if ((!tabOk || !subOk || !scrollOk) && tries < 8) setTimeout(run, 300);
      };
      setTimeout(run, 150);
    }
    runDeep();
    window.addEventListener("hashchange", runDeep);

    function clickTab(text) {
      var els = document.querySelectorAll('.tabbar button,.tabnav button,.tb,.stb,[data-tab],[role="tab"]');
      var t = text.toLowerCase();
      for (var i=0;i<els.length;i++){
        if ((els[i].textContent||"").toLowerCase().indexOf(t)!==-1){ els[i].click(); return true; }
      }
      return false;
    }
    function scrollToText(text) {
      var t = text.toLowerCase();
      var all = document.querySelectorAll("h1,h2,h3,h4,div,span,p,button,section,a,li");
      for (var i=0;i<all.length;i++){
        var tc=(all[i].textContent||"");
        if (tc.length<120 && tc.toLowerCase().indexOf(t)!==-1){
          var r=all[i].getBoundingClientRect();
          if (r.width>0 && r.height>0){ all[i].scrollIntoView({block:"center"}); return true; }
        }
      }
      return false;
    }
  });
})();
