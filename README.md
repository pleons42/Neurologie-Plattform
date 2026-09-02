# MHH Neurologie · Tools — Plattform (PWA)

Gemeinsame Hülle für klinische Entscheidungswerkzeuge der Klinik für Neurologie,
MHH Hannover. Ein Launcher, ein Service-Worker, mehrere Module.

> Konzeptentwurf — kein klinisches Dokument. Vor klinischer Nutzung auf einem
> echten Gerät testen (inkl. Screenreader). Alle klinischen Angaben gegen
> Primärquelle/Fachinformation und lokale SOP prüfen.

## Installation / Betrieb
1. Alle Dateien dieses Ordners auf einen Webserver mit HTTPS legen (z. B. GitHub
   Pages) — Service Worker laufen nicht über file://.
2. index.html öffnen. Auf dem Handy: „Zum Home-Bildschirm hinzufügen".
3. Nach dem ersten Laden vollständig offline verfügbar (ein gemeinsamer Cache).

## Struktur
- index.html — Launcher / Startseite (Modulauswahl, Suche)
- manifest.json, sw.js — Plattform-Manifest und EIN gemeinsamer Service-Worker
- asm.html (+ asm-manifest.json) — Modul ASM (Anfallssuppressive Therapie)
- icans.html (+ icans-manifest.json) — Modul ICANS / CRS
- stroke.html (+ stroke-manifest.json) — Modul Stroke (im Aufbau)
  - Reiter: ZNA (NIHSS mit schnellem Zahlen-Layout, Onset-Timer, Kontraindikationen,
    Lyse-Checkliste), Stroke Unit (Sekundaerprophylaxe, CHA2DS2-VASc, HAS-BLED,
    ABCD2 mit Interpretationstabelle, DOAK, Reversal), Paediatrie
    (klinischer Pfad + Tool-Auswahl: Pfad / PedNIHSS / IV-Lyse-Rechner)
  - stroke-data.js — klinische Referenzdaten (DIESE Datei bearbeiten)
  - stroke-data.json — identische JSON-Referenz (nicht geladen)
  - stroke-paed.js — Paediatrie-Tools (PedNIHSS-Scorer, Alteplase-Rechner)
  - stroke-ui.js — NIHSS-Zahlen-Layout + ABCD2-Interpretation (ueberschreibt App-Funktionen)
- kontakte.html + contacts.js — geteilter Notfallkontakte-Screen
- platform-chrome.js — geteilte Bottom-Modulnavigation + Modul-Akzent (alle Module)
- platform-a11y.js — Barrierefreiheit (Zoom, Fokus, ARIA fuer Modals, reduced-motion)
- icons/ — Plattform- und Modul-Icons, ICANS-Banner

## Design & Bedienung
Apple-Glass-Sprache ueber die Module (weicher Verlauf, Glas-Karten/-Buttons mit vividem
Verlauf fuer aktiv/primaer, schwebende Glas-Fenster fuer Modals). Gemeinsame Bottom-Navigation
mit Modul-Akzent (ASM gruen, ICANS blau, Stroke rot). NIHSS/PedNIHSS mit direktem
Zahlen-Layout (1 Antippen pro Item). Farbcodierte Severity-Elemente bleiben erhalten.

Barrierefreiheit: Pinch-Zoom/dynamische Schrift erlaubt, sichtbarer Tastatur-Fokus,
Modals mit role="dialog"/aria-label/Fokus-Handling/Escape, und prefers-reduced-motion
bzw. -transparency schalten Transitions und Glas-/Blur-Effekte ab (solide Fallback-Flaechen).

## Quellen (Auswahl)
ABCD2-Interpretation: Johnston SC et al., Lancet 2007;369:283-292.
Paediatrie: AHA/ASA 2026 AIS-Guideline, Save ChildS Pro (Lancet Child Adolesc Health 2024),
PedNIHSS (Ichord RN et al., Stroke 2011), AWMF S2k 024-024 (2025),
UCSF Pediatric Hyperacute AIS Guidelines. Evidenz teils niedriggradig (COR 2b);
Dosierungen vor Gabe gegen lokale SOP/Fachinformation und Kinderneurologie freigeben.
Sobald hausinterne SOPs vorliegen, ersetzen diese die Leitlinienangaben.


## Neuer Home-Screen & Bedienung (Stand v4.4)
- Warmes Dashboard (index.html): Patientenkontext (manuell, lokal), "Zuletzt benutzt"
  (localStorage, erfasst tatsaechliches Modul-Oeffnen), Module, "Haeufig im Dienst", Suche, Offline-Anzeige.
- Einheitliche Bottom-Navigation (Start/Suche/Kontakte/Mehr) ueber alle Screens; Modul-Akzentstreifen oben.
- Deep-Links aus "Haeufig im Dienst" springen in den passenden Reiter/Score
  (Status epilepticus, Fahreignung, Lyse-Kontraindikationen, CHA2DS2-VASc, ICANS-Grading).
- Kontakte: prominenter Notfall-Button "Notfall-Team / Reanimation" (0511-532-4949) mit
  Sicherheitsabfrage "Notfallteam anrufen?" vor dem Waehlen.
- ASM: "Fuer Uebergabe kopieren" legt die Interaktionsanalyse als Text in die Zwischenablage
  (braucht HTTPS/localhost; Fallback vorhanden).
- Patientenkontext & Recents liegen nur lokal auf dem Geraet (localStorage), nicht synchronisiert.


## Mobil-/Desktop-Ansicht (Stand v4.5)
- Umschalt-Button auf JEDER Seite (unten rechts, einhaendig erreichbar): Mobil / Desktop.
- Modus wird gespeichert und gilt seitenuebergreifend (localStorage). Standard nach Bildschirmbreite.
- Mobil: schmale, einhaendige Spalte (max. 480px, zentriert). Desktop: breite Spalte (max. 1040px);
  Home-Dashboard mit mehrspaltigen Modul-Kacheln. Umgesetzt in platform-viewmode.js.


## Desktop-Zweispalter & Stroke-Kacheln (Stand v4.8)
- Desktop-Modus: Fachmodule (ASM, ICANS, Stroke) legen den Karten-Inhalt in zwei Spalten
  (Kopfzeile/Tabs/Mode-Umschalter spannen ueber beide Spalten). ASM/Stroke ausgewogen;
  ICANS zweispaltig mit Referenz rechts (Balance strukturbedingt weniger gleichmaessig).
- Launcher: ZNA, Stroke Unit und Paediatrie als grosse Modul-Kacheln (Stroke-Rot),
  jeweils per Deep-Link in den passenden Reiter (stroke.html#zna / #su / #paed).
- Deep-Links laufen jetzt auch bei reinem Hash-Wechsel (hashchange), nicht nur beim Laden.


## Launcher-Kacheln & Mobil (Stand v5.4)
- Launcher-Kacheln im quadratischen Format (Icon oben, Titel/Untertitel darunter, Akzentbalken):
  Mobil 2-spaltig, Desktop 3-spaltig neben der Dienst-Seitenleiste.
- ICANS bleibt im Desktop einspaltig (breit) - ein sauberer Zweispalter ist wegen der grossen
  monolithischen Inhaltsbloecke ohne riskanten Umbau nicht moeglich; ASM/Stroke sind zweispaltig.
- Nebenbei behoben: vorbestehender, nicht-fataler ICANS-Init-Fehler (fehlende pt-Vorschau-Elemente).

## Module aktualisieren
Bei Aenderung einer Datei die Cache-Version in sw.js erhoehen (CACHE_VERSION).

## Weitere Hinweise
- PDF-Export (Stroke) nutzt jsPDF (CDN) — nach einmaligem Online-Laden offline verfuegbar.
- Stroke speichert NIHSS-Visiten lokal (localStorage), nicht auf einem Server.
- Icons teils Platzhalter.

Klinik fuer Neurologie mit Klinischer Neurophysiologie, MHH Hannover.
