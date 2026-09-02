// ════════════════════════════════════════════════════════════════════════
//  Stroke-UI (additiv, überschreibt App-Funktionen sauber)
//   • NIHSS modusabhängig:
//       – Mobil:  ein Item pro Screen (große Options-Karten, Fortschritt,
//                 Auto-Weiter) — intuitiveres Scoring nach Claude-Design-Vorschlag
//       – Desktop: Übersicht (alle Items als Zahlenreihen)
//   • ABCD²: sichtbare Interpretation der Punktwerte + Aktiv-Band
//  Quelle ABCD²: Johnston SC et al., Lancet 2007;369:283–292 (2-Tage-Risiko).
// ════════════════════════════════════════════════════════════════════════
(function () {
  "use strict";

  function isMobile() { return document.documentElement.getAttribute("data-view") === "mobile"; }
  function niTotal() { var t = 0; for (var k in S.nihss) { var v = S.nihss[k]; if (v !== "UN" && typeof v === "number") t += v; } return t; }
  function niAnswered() { var c = 0; for (var k in S.nihss) { if (S.nihss[k] !== undefined) c++; } return c; }

  window.toggleNI = function () {};

  // ── Desktop: Übersicht (alle Items) ──────────────────────────────────
  function buildAllItems(host) {
    host.innerHTML = D.nihss.map(function (it) {
      var btns = it.opts.map(function (o) {
        var lab = (o.v === "UN") ? "n.b." : o.v;
        return '<button class="nb' + (String(S.nihss[it.id]) === String(o.v) ? " sel" : "") + '" id="no-' + it.id + "-" + o.v +
          '" onclick="selNI(\'' + it.id + "','" + o.v + '\')">' + lab + "</button>";
      }).join("");
      var cur = S.nihss[it.id];
      return '<div class="nrow" id="ni-' + it.id + '">' +
        '<div class="nrow-top"><span class="ni-num">' + it.num + "</span>" +
        '<span class="ni-name">' + it.name + "</span>" +
        '<span class="ni-sc" id="nv-' + it.id + '">' + (cur === undefined ? "—" : (cur === "UN" ? "n.b." : cur)) + "</span></div>" +
        '<div class="nbtns">' + btns + "</div>" +
        '<div class="ndesc" id="nd-' + it.id + '">Wert antippen …</div>' +
      "</div>";
    }).join("");
  }

  // ── Mobil: ein Item pro Screen (Stepper) ─────────────────────────────
  function buildStepper(host) {
    if (typeof S.niStep !== "number") S.niStep = 0;
    host.innerHTML =
      '<div class="ni-step">' +
        '<div class="ni-prog"><div class="ni-prog-top">' +
          '<span>Item <b id="ni-step-n">1</b> / ' + D.nihss.length + "</span>" +
          '<span id="ni-step-sum">Summe 0</span></div>' +
          '<div class="ni-prog-bar"><div id="ni-prog-fill"></div></div></div>' +
        '<div id="ni-item"></div>' +
        '<div class="ni-nav">' +
          '<button class="ni-prev" type="button" onclick="niStep(-1)">‹ Zurück</button>' +
          '<button class="ni-next" type="button" onclick="niStep(1)">Weiter ›</button></div>' +
      "</div>";
    renderStep();
  }

  function renderStep() {
    var host = document.getElementById("ni-item"); if (!host) return;
    var i = S.niStep, N = D.nihss.length, it = D.nihss[i];
    var cards = it.opts.map(function (o) {
      var sel = String(S.nihss[it.id]) === String(o.v);
      var badge = (o.v === "UN") ? "n.b." : o.v;
      return '<button class="ni-opt-card' + (sel ? " sel" : "") + '" type="button" onclick="selNI(\'' + it.id + "','" + o.v + '\')">' +
        '<span class="ni-opt-b">' + badge + '</span><span class="ni-opt-l">' + o.l + '</span></button>';
    }).join("");
    host.innerHTML =
      '<div class="ni-item-h"><span class="ni-item-num">' + it.num + "</span>" +
      '<span class="ni-item-name">' + it.name + "</span></div>" +
      '<div class="ni-opts">' + cards + "</div>";
    var n = document.getElementById("ni-step-n"); if (n) n.textContent = (i + 1);
    var sum = document.getElementById("ni-step-sum"); if (sum) sum.textContent = "Summe " + niTotal() + " · " + niAnswered() + "/" + N + " bewertet";
    var fill = document.getElementById("ni-prog-fill"); if (fill) fill.style.width = (((i + 1) / N) * 100) + "%";
    var prev = document.querySelector(".ni-prev"); if (prev) prev.disabled = (i === 0);
    var next = document.querySelector(".ni-next"); if (next) next.disabled = (i === N - 1);
  }
  window.renderStep = renderStep;

  window.niStep = function (d) {
    var N = D.nihss.length;
    S.niStep = Math.max(0, Math.min(N - 1, (S.niStep || 0) + d));
    renderStep();
  };

  window.buildNIHSS = function () {
    var host = document.getElementById("nihss-list");
    if (!host || typeof D === "undefined") return;
    if (isMobile()) buildStepper(host); else buildAllItems(host);
  };

  window.selNI = function (id, val) {
    S.nihss[id] = (val === "UN") ? "UN" : parseInt(val, 10);
    if (typeof updateNIHSStot === "function") updateNIHSStot();
    if (typeof updateIVT === "function") updateIVT();
    if (document.getElementById("ni-item")) { // Stepper aktiv → Auto-Weiter
      var idx = D.nihss.findIndex(function (x) { return x.id === id; });
      S.niStep = (idx > -1 && idx < D.nihss.length - 1) ? idx + 1 : idx;
      renderStep();
    } else { // Übersicht
      var it = D.nihss.find(function (i) { return i.id === id; });
      it.opts.forEach(function (o) { var e = document.getElementById("no-" + id + "-" + o.v); if (e) e.classList.toggle("sel", String(o.v) === String(val)); });
      var nv = document.getElementById("nv-" + id); if (nv) nv.textContent = (val === "UN") ? "n.b." : val;
      var opt = it.opts.find(function (o) { return String(o.v) === String(val); });
      var nd = document.getElementById("nd-" + id); if (nd && opt) nd.textContent = opt.l;
    }
  };

  // Bei Moduswechsel NIHSS neu aufbauen (Stepper ↔ Übersicht)
  var _mo = new MutationObserver(function (m) {
    for (var i = 0; i < m.length; i++) if (m[i].attributeName === "data-view") {
      if (document.getElementById("nihss-list")) window.buildNIHSS();
      break;
    }
  });
  _mo.observe(document.documentElement, { attributes: true, attributeFilter: ["data-view"] });

  // ── ABCD²: Interpretation / Entsprechung der Punktwerte ──────────────
  function injectABCDinterp() {
    var items = document.getElementById("ab-items");
    if (!items || document.getElementById("ab-interp")) return;
    var d = document.createElement("div");
    d.className = "ab-interp"; d.id = "ab-interp";
    d.innerHTML =
      '<div class="abi-row" data-band="low"><span class="abi-range">0–3</span>' +
        '<span class="abi-txt"><b>Niedriges Risiko</b> · ~1,0 % Schlaganfall in 2 Tagen</span></div>' +
      '<div class="abi-row" data-band="mod"><span class="abi-range">4–5</span>' +
        '<span class="abi-txt"><b>Moderates Risiko</b> · ~4,1 % · fachärztliche Abklärung / Aufnahme erwägen</span></div>' +
      '<div class="abi-row" data-band="high"><span class="abi-range">6–7</span>' +
        '<span class="abi-txt"><b>Hohes Risiko</b> · ~8,1 % · stationär, antithrombotische Therapie beginnen</span></div>' +
      '<div class="refline" style="margin-top:8px">2-Tage-Risiko · Johnston SC et al., Lancet 2007;369:283–292</div>';
    items.parentNode.insertBefore(d, items.nextSibling);
  }
  var _updAB = window.updAB;
  window.updAB = function () {
    if (typeof _updAB === "function") _updAB();
    var band = null;
    try {
      if (typeof calcSum === "function" && typeof D !== "undefined" && typeof S !== "undefined") {
        var sc = calcSum(D.abcd2, S.ab);
        band = sc <= 3 ? "low" : (sc <= 5 ? "mod" : "high");
      }
    } catch (e) {}
    document.querySelectorAll("#ab-interp .abi-row").forEach(function (r) {
      r.classList.toggle("active", r.getAttribute("data-band") === band);
    });
  };

  function boot() { injectABCDinterp(); if (typeof updAB === "function") updAB(); }
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", boot);
  else boot();

  // ── Mini-Onset-Timer: spiegelt #timer-disp, sichtbar nur mobil + ZNA ──
  (function () {
    function znaActive() { var z = document.getElementById("tab-zna"); return !!z && getComputedStyle(z).display !== "none"; }
    function updMini() {
      var mini = document.getElementById("mini-onset"), disp = document.getElementById("timer-disp");
      if (!mini || !disp) return;
      var t = document.getElementById("mo-time"); if (t) t.textContent = disp.textContent;
      ["tv-ok", "tv-warn", "tv-err"].forEach(function (c) { mini.classList.toggle(c, disp.classList.contains(c)); });
      var show = (document.documentElement.getAttribute("data-view") === "mobile") && znaActive();
      mini.classList.toggle("show", show);
    }
    function boot2() {
      var disp = document.getElementById("timer-disp"); if (!disp) return;
      new MutationObserver(updMini).observe(disp, { childList: true, characterData: true, subtree: true, attributes: true, attributeFilter: ["class"] });
      var _showTab = window.showTab;
      if (typeof _showTab === "function") window.showTab = function () { var r = _showTab.apply(this, arguments); setTimeout(updMini, 30); return r; };
      new MutationObserver(function (m) { for (var i = 0; i < m.length; i++) if (m[i].attributeName === "data-view") { updMini(); break; } })
        .observe(document.documentElement, { attributes: true, attributeFilter: ["data-view"] });
      updMini();
    }
    if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", boot2); else boot2();
  })();

})();
