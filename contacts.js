/* ════════════════════════════════════════════════════════════════════════
 *  MHH Neurologie · Tools — Gemeinsame Notfallkontakte (Shared Service)
 *  EINE Pflegestelle für alle Module. Quelle: verbatim aus dem ASM-Modul.
 *
 *  Datenmodell je Eintrag:
 *    name      Bezeichnung der Stelle
 *    note      Zusatz (Zeiten / Fachbereich)
 *    number    Rufnummer in Anzeigeform — EINZIGE Quelle; der Wähllink
 *              (tel:) wird daraus abgeleitet → Anzeige und Wahl können nicht
 *              mehr auseinanderlaufen.
 *    verified  false = im Original widersprüchlich, Wählen deaktiviert bis
 *              Bestätigung (siehe flag).
 *    flag      Klartext-Hinweis bei verified:false.
 *
 *  Wähllink-Ableitung: tel:00 + alle Ziffern ohne führende 0 … hier bewusst
 *  simpel gehalten — number enthält bereits die vollständige interne Nummer,
 *  daher tel: = "tel:" + Ziffern von number.
 * ════════════════════════════════════════════════════════════════════════ */

window.MHH_CONTACTS = {
  sectionTitle: "Wichtige Telefonnummern (MHH intern)",
  heading:      "Umgehende Kontaktaufnahme",
  footer:       "Gesamte Zeile antippen zum Wählen · MHH Hannover",
  entries: [
    { name: "Anästhesie Poliklinik", note: "07:30 – 16:30 Uhr",      number: "01761-532-2131", verified: true },
    { name: "Anästhesie",            note: "16:30 – 07:30 Uhr",      number: "01761-532-2000", verified: true },
    { name: "Intensivstation 44",    note: "ANE",                    number: "01761-532-1444", verified: true },
    { name: "Intensivstation 34",    note: "NCH",                    number: "01761-532-6892", verified: true },
    { name: "Intensivstation 24",    note: "KAR",                    number: "01761-532-7005", verified: true },
    { name: "Intensivstation 14",    note: "INN – Nummer 1",         number: "01761-532-2143", verified: true },
    { name: "Intensivstation 14",    note: "INN – Nummer 2",         number: "0511-532-7623",  verified: true },
    { name: "Intensivstation 73",    note: "UCH",                    number: "01761-532-7042", verified: true },
    { name: "Intensivstation 74",    note: "HTTG",                   number: "01761-532-4068", verified: true },
    { name: "Intensivstation 81",    note: "",                       number: "01761-532-1818", verified: true }
  ]
};

/* Hilfsfunktion: Anzeige-Nummer → tel:-Wählstring im E.164-Format (+49…).
 * Nationales Format mit führender 0 löst in Standalone-PWAs teils den Wähler
 * nicht aus; +49 ist standardkonform und geräteübergreifend zuverlässig.
 * Die Zielrufnummer bleibt identisch — nur die Schreibweise ändert sich. */
window.MHH_CONTACTS.telHref = function (number) {
  var d = String(number).replace(/[^0-9]/g, "");   // nur Ziffern
  if (d.charAt(0) === "0") d = "49" + d.slice(1);   // 0… → 49… (Deutschland)
  return "tel:+" + d;
};
