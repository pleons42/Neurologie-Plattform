// ════════════════════════════════════════════════════════════════════════
//  Pädiatrie-Reiter · Tools (isoliert, eigener Zustand)
//   • PedNIHSS-Scorer — schnelles Zahlen-Layout (1 Tap/Item, alle Items sichtbar)
//   • IV-Lyse-Rechner (Alteplase 0,9 mg/kg, max. 90 mg)
//   • Tool-Auswahl (Pfad / PedNIHSS / IV-Lyse)
//  Quellen: AHA/ASA 2026 (Stroke); PedNIHSS Ichord RN et al., Stroke 2011;
//           Dosis: UCSF Pediatric Hyperacute AIS Guidelines / Review PMC8431982.
// ════════════════════════════════════════════════════════════════════════
(function () {
  "use strict";
  var PS = {}; // Pädiatrischer NIHSS-Zustand (getrennt vom Erwachsenen-Scorer)

  function data() { return (typeof STROKE_DATA !== "undefined") ? STROKE_DATA.nihss : null; }

  window.togglePNI = function () {};
  var pniStep = 0;
  function isMobileP() { return document.documentElement.getAttribute("data-view") === "mobile"; }
  function pTotal() { var d = data(), t = 0; if (d) d.forEach(function (it) { var v = PS[it.id]; if (v !== "UN" && typeof v === "number") t += v; }); return t; }
  function pAnswered() { var d = data(), c = 0; if (d) d.forEach(function (it) { if (PS[it.id] !== undefined) c++; }); return c; }

  function buildPedAll(host, d) {
    host.innerHTML = d.map(function (it) {
      var btns = it.opts.map(function (o) {
        var lab = (o.v === "UN") ? "n.b." : o.v;
        return '<button class="nb' + (String(PS[it.id]) === String(o.v) ? " sel" : "") + '" id="pno-' + it.id + "-" + o.v +
          '" onclick="selPNI(\'' + it.id + "','" + o.v + '\')">' + lab + "</button>";
      }).join("");
      var cur = PS[it.id];
      return '<div class="nrow" id="pni-' + it.id + '">' +
        '<div class="nrow-top"><span class="ni-num">' + it.num + "</span>" +
        '<span class="ni-name">' + it.name + "</span>" +
        '<span class="ni-sc" id="pnv-' + it.id + '">' + (cur === undefined ? "—" : (cur === "UN" ? "n.b." : cur)) + "</span></div>" +
        '<div class="nbtns">' + btns + "</div>" +
        '<div class="ndesc" id="pnd-' + it.id + '">Wert antippen …</div>' +
      "</div>";
    }).join("");
  }
  function buildPedStepper(host, d) {
    if (pniStep >= d.length) pniStep = 0;
    host.innerHTML =
      '<div class="ni-step"><div class="ni-prog"><div class="ni-prog-top">' +
        '<span>Item <b id="pni-step-n">1</b> / ' + d.length + "</span>" +
        '<span id="pni-step-sum">Summe 0</span></div>' +
        '<div class="ni-prog-bar"><div id="pni-prog-fill"></div></div></div>' +
      '<div id="pni-item"></div>' +
      '<div class="ni-nav"><button class="ni-prev" type="button" onclick="pniNav(-1)">‹ Zurück</button>' +
      '<button class="ni-next" type="button" onclick="pniNav(1)">Weiter ›</button></div></div>';
    renderPedStep();
  }
  function renderPedStep() {
    var host = document.getElementById("pni-item"); if (!host) return;
    var d = data(), i = pniStep, N = d.length, it = d[i];
    var cards = it.opts.map(function (o) {
      var sel = String(PS[it.id]) === String(o.v);
      var badge = (o.v === "UN") ? "n.b." : o.v;
      return '<button class="ni-opt-card' + (sel ? " sel" : "") + '" type="button" onclick="selPNI(\'' + it.id + "','" + o.v + '\')">' +
        '<span class="ni-opt-b">' + badge + '</span><span class="ni-opt-l">' + o.l + '</span></button>';
    }).join("");
    host.innerHTML =
      '<div class="ni-item-h"><span class="ni-item-num">' + it.num + "</span>" +
      '<span class="ni-item-name">' + it.name + "</span></div>" +
      '<div class="ni-opts">' + cards + "</div>";
    var n = document.getElementById("pni-step-n"); if (n) n.textContent = (i + 1);
    var sum = document.getElementById("pni-step-sum"); if (sum) sum.textContent = "Summe " + pTotal() + " · " + pAnswered() + "/" + N + " bewertet";
    var fill = document.getElementById("pni-prog-fill"); if (fill) fill.style.width = (((i + 1) / N) * 100) + "%";
    var prev = document.querySelector("#pni-list .ni-prev"); if (prev) prev.disabled = (i === 0);
    var next = document.querySelector("#pni-list .ni-next"); if (next) next.disabled = (i === N - 1);
  }
  window.pniNav = function (delta) {
    var d = data(); pniStep = Math.max(0, Math.min(d.length - 1, pniStep + delta)); renderPedStep();
  };
  window.buildPedNIHSS = function () {
    var host = document.getElementById("pni-list"); var d = data();
    if (!host || !d) return;
    if (isMobileP()) buildPedStepper(host, d); else buildPedAll(host, d);
  };

  window.selPNI = function (id, val) {
    PS[id] = (val === "UN") ? "UN" : parseInt(val, 10);
    updatePedTot();
    var d = data();
    if (document.getElementById("pni-item")) { // Stepper aktiv → Auto-Weiter
      var idx = d.findIndex(function (x) { return x.id === id; });
      pniStep = (idx > -1 && idx < d.length - 1) ? idx + 1 : idx;
      renderPedStep();
    } else {
      var it = d.find(function (i) { return i.id === id; });
      it.opts.forEach(function (o) { var e = document.getElementById("pno-" + id + "-" + o.v); if (e) e.classList.toggle("sel", String(o.v) === String(val)); });
      var nv = document.getElementById("pnv-" + id); if (nv) nv.textContent = (val === "UN") ? "n.b." : val;
      var opt = it.opts.find(function (o) { return String(o.v) === String(val); });
      var nd = document.getElementById("pnd-" + id); if (nd && opt) nd.textContent = opt.l;
    }
  };

  window.updatePedTot = function () {
    var d = data(); if (!d) return;
    var tot = 0, cnt = 0;
    d.forEach(function (it) {
      var v = PS[it.id];
      if (v === undefined) return;
      cnt++;
      if (v !== "UN" && typeof v === "number") tot += v;
    });
    var te = document.getElementById("pni-tot");
    var de = document.getElementById("pni-desc");
    if (!te) return;
    if (cnt === 0) {
      te.textContent = "—"; te.style.color = "var(--tx3)";
      if (de) de.textContent = "Wert je Item antippen";
      return;
    }
    te.textContent = tot; te.style.color = "var(--pri)";
    if (de) de.textContent = cnt + " / 15 Items bewertet";
  };

  window.resetPedNIHSS = function () {
    PS = {}; pniStep = 0;
    buildPedNIHSS();
    updatePedTot();
  };

  // ── IV-Lyse-Rechner (gewichtsbasiert) ─────────────────────────────────
  window.calcPedLyse = function () {
    var el = document.getElementById("ped-kg");
    var out = document.getElementById("ped-lyse-out");
    if (!out) return;
    var kg = parseFloat(el && el.value);
    if (!kg || kg <= 0) {
      out.innerHTML = '<div class="rbox rneu"><div class="rt">Ausstehend</div><div class="rd">Körpergewicht eingeben.</div></div>';
      return;
    }
    var total = Math.min(0.9 * kg, 90);
    var capped = (0.9 * kg > 90);
    var bolus = total * 0.1;
    var inf = total * 0.9;
    var de = function (n) { return n.toFixed(1).replace(".", ","); };
    out.innerHTML =
      '<div class="rbox rok"><div class="rt">Alteplase 0,9 mg/kg</div>' +
      '<div class="rd"><strong>Gesamtdosis: ' + de(total) + " mg</strong>" +
      (capped ? " (auf Maximum 90 mg begrenzt)" : "") + "<br>" +
      "Bolus (10 %): <strong>" + de(bolus) + " mg</strong> über 1 min i.v.<br>" +
      "Infusion (90 %): <strong>" + de(inf) + " mg</strong> über 60 min i.v.</div></div>" +
      '<div class="info" style="border-left:3px solid var(--wrn);margin-top:10px">' +
      "<strong>COR 2b</strong> (AHA/ASA 2026) · Wirksamkeit unsicher. Vor Gabe lokale SOP/Fachinformation &amp; Kinderneurologie bestätigen; Sorgeberechtigte aufklären.</div>" +
      '<div class="refline" style="margin-top:8px">Dosis: UCSF Pediatric Hyperacute AIS Guidelines · Review PMC8431982 (2–17 J., wie Erwachsene)</div>';
  };

  // ── Tool-Auswahl (isoliert) ───────────────────────────────────────────
  window.paedTool = function (id, btn) {
    ["pfad", "score", "lyse"].forEach(function (t) {
      var el = document.getElementById("ptool-" + t);
      if (el) el.style.display = (t === id) ? "" : "none";
    });
    var nav = document.getElementById("paed-toolnav");
    if (nav) nav.querySelectorAll(".stb").forEach(function (b) { b.classList.remove("on"); });
    if (btn) btn.classList.add("on");
    if (id === "score") {
      var l = document.getElementById("pni-list");
      if (l && !l.innerHTML.trim()) { buildPedNIHSS(); updatePedTot(); }
    }
  };

  (function () {
    var mo = new MutationObserver(function (m) {
      for (var i = 0; i < m.length; i++) if (m[i].attributeName === "data-view") {
        var l = document.getElementById("pni-list");
        if (l && l.innerHTML.trim()) window.buildPedNIHSS();
        break;
      }
    });
    mo.observe(document.documentElement, { attributes: true, attributeFilter: ["data-view"] });
  })();
})();
