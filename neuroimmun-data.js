/* ════════════════════════════════════════════════════════════════════════
   Neuroimmunologie · Datenbasis  (Stand: kuratierte v1 — IM AUFBAU)
   Alle klinischen Angaben sind gegen die aktuelle Fachinformation, die
   DGN-/KKNMS-Leitlinien und die hausinterne SOP zu prüfen. Keine erfundenen
   Werte; wo Intervalle je nach Präparat/Leitlinie variieren, ist dies
   gekennzeichnet ("gemäß Fachinformation").
   ════════════════════════════════════════════════════════════════════════ */
window.NI_DATA = {

  /* ── 1) EDSS — Funktionelle Systeme nach Kurtzke ──────────────────────
     Quelle: Kurtzke JF. Rating neurologic impairment in multiple sclerosis:
     an expanded disability status scale (EDSS). Neurology 1983;33:1444–1452.
     Definitionen gekürzt; verbindliche Bewertung nach Neurostatus. */
  edss: {
    fs: [
      { id:"pyr", name:"Pyramidenbahn (Kraft)", opts:[
        {v:0,l:"Normal"},
        {v:1,l:"Abnorme Zeichen ohne Behinderung"},
        {v:2,l:"Minimale Behinderung"},
        {v:3,l:"Leichte/mäßige Para- oder Hemiparese; schwere Monoparese"},
        {v:4,l:"Deutliche Para-/Hemiparese; mäßige Tetraparese; Monoplegie"},
        {v:5,l:"Paraplegie, Hemiplegie oder deutliche Tetraparese"},
        {v:6,l:"Tetraplegie"}
      ]},
      { id:"cer", name:"Kleinhirn (Koordination)", opts:[
        {v:0,l:"Normal"},
        {v:1,l:"Abnorme Zeichen ohne Behinderung"},
        {v:2,l:"Leichte Ataxie"},
        {v:3,l:"Mäßige Rumpf- oder Extremitätenataxie"},
        {v:4,l:"Schwere Ataxie aller Extremitäten"},
        {v:5,l:"Keine koordinierten Bewegungen wegen Ataxie möglich"}
      ]},
      { id:"bs", name:"Hirnstamm", opts:[
        {v:0,l:"Normal"},
        {v:1,l:"Nur Zeichen"},
        {v:2,l:"Mäßiger Nystagmus oder andere leichte Behinderung"},
        {v:3,l:"Schwerer Nystagmus, deutliche Augenmuskelparese, mäßige HN-Behinderung"},
        {v:4,l:"Deutliche Dysarthrie oder andere deutliche Behinderung"},
        {v:5,l:"Schluck- oder Sprechunfähigkeit"}
      ]},
      { id:"sen", name:"Sensibilität", opts:[
        {v:0,l:"Normal"},
        {v:1,l:"Nur Vibrations-/Schreibfigur-Minderung in 1–2 Extremitäten"},
        {v:2,l:"Leichte Minderung Berührung/Schmerz/Lage in 1–2 (oder Vibration in 3–4)"},
        {v:3,l:"Mäßige Minderung Berührung/Schmerz/Lage in 1–2 (oder leicht in 3–4)"},
        {v:4,l:"Deutliche Minderung/Lageverlust in 1–2; oder mäßig in >2 Extremitäten"},
        {v:5,l:"Sensibilitätsverlust in 1–2; oder mäßige Minderung Großteil unter dem Kopf"},
        {v:6,l:"Sensibilitätsverlust im Wesentlichen unterhalb des Kopfes"}
      ]},
      { id:"bb", name:"Blasen-/Mastdarmfunktion", opts:[
        {v:0,l:"Normal"},
        {v:1,l:"Leichter Harndrang/-verhalt"},
        {v:2,l:"Mäßiger Drang/Verhalt oder seltene Harninkontinenz"},
        {v:3,l:"Häufige Harninkontinenz"},
        {v:4,l:"Nahezu ständige Katheterisierung nötig"},
        {v:5,l:"Blaseninkontinenz"},
        {v:6,l:"Blasen- und Darminkontinenz"}
      ]},
      { id:"vis", name:"Sehfunktion", opts:[
        {v:0,l:"Normal"},
        {v:1,l:"Skotom, Visus (korr.) besser als ~0,7"},
        {v:2,l:"Schlechteres Auge Visus ~0,7–0,34 mit Skotom"},
        {v:3,l:"Großes Skotom / mäßige GF-Einschränkung, Visus ~0,33–0,2"},
        {v:4,l:"Deutliche GF-Einschränkung, Visus ~0,2–0,1"},
        {v:5,l:"Schlechteres Auge Visus <0,1"},
        {v:6,l:"Grad 5 + besseres Auge Visus ≤0,3"}
      ]},
      { id:"men", name:"Zerebrale / mentale Funktionen", opts:[
        {v:0,l:"Normal"},
        {v:1,l:"Nur Stimmungsänderung (ohne EDSS-Einfluss)"},
        {v:2,l:"Leichte Minderung der Denkfähigkeit"},
        {v:3,l:"Mäßige Minderung der Denkfähigkeit"},
        {v:4,l:"Deutliche Minderung der Denkfähigkeit"},
        {v:5,l:"Demenz / chronisch hirnorganisches Syndrom"}
      ]}
    ],
    /* Gehfähigkeit steuert die EDSS-Stufe ≥ 4,0. Maximale Gehstrecke am
       Stück (ohne Pause). Werte je Kurtzke 1983. */
    ambulation: [
      {v:0.0, l:"Uneingeschränkt gehfähig — EDSS folgt den Funktionssystemen"},
      {v:4.0, l:"Gehfähig ohne Hilfe, aber ≥500 m begrenzt"},
      {v:4.5, l:"Gehstrecke ohne Hilfe ~300 m"},
      {v:5.0, l:"Gehstrecke ohne Hilfe ~200 m"},
      {v:5.5, l:"Gehstrecke ohne Hilfe ~100 m"},
      {v:6.0, l:"~100 m mit einseitiger Hilfe (Stock/Schiene), ggf. mit Pause"},
      {v:6.5, l:"~20 m mit beidseitiger Hilfe, ohne Pause"},
      {v:7.0, l:"<5 m auch mit Hilfe; im Rollstuhl, bewegt/transferiert sich selbst"},
      {v:7.5, l:"Nur wenige Schritte; Rollstuhl, benötigt Hilfe beim Transfer"},
      {v:8.0, l:"Bett-/Stuhl-/Rollstuhlgebunden, tagsüber viel auf, Arme funktionsfähig"},
      {v:8.5, l:"Weitgehend bettlägerig, etwas Armfunktion, etwas Selbstversorgung"},
      {v:9.0, l:"Hilfloser Bettpatient, kann kommunizieren und essen"},
      {v:9.5, l:"Totale Hilflosigkeit; kann nicht effektiv kommunizieren/schlucken"}
    ]
  },

  /* ── 2) DMT-Monitoring (MS) ───────────────────────────────────────────
     Grundlage: jeweilige Fachinformation und KKNMS-Qualitätshandbuch MS/NMOSD
     sowie DGN-Leitlinie. Parameter sind etabliert; Intervalle gemäß aktueller
     Fachinformation prüfen. "procedere" = Textbaustein für den Arztbrief. */
  dmt: [
    { name:"Interferon-β", brands:"Avonex®, Rebif®, Betaferon®, Extavia®, Plegridy®", moa:"Immunmodulation",
      base:["Blutbild (Differenzial)","Leberwerte (Transaminasen, Bilirubin)","TSH","Schwangerschaftstest"],
      ongoing:["Blutbild + Leberwerte + TSH: nach 1, 3 und 6 Monaten, danach alle 6–12 Monate (gemäß Fachinformation)"],
      prophylaxe:["Keine spezifische antiinfektive Prophylaxe","Standard-/Grippeimpfung (Totimpfstoffe) möglich"],
      trigger:["Transaminasen > 5× ULN oder relevante Zytopenie → Dosisreduktion/Pause, Rücksprache","Neu aufgetretene Depression → evaluieren","Zeichen thrombotischer Mikroangiopathie (Hämolyse, Thrombozytopenie, Kreatininanstieg) → sofort absetzen"],
      risks:["Transaminasenanstieg","Zytopenie","Schilddrüsenfunktionsstörung","Depression/grippale Symptome","thrombotische Mikroangiopathie (selten)"],
      procedere:["Blutbild, Transaminasen und TSH nach 1, 3, 6 Monaten, danach alle 6–12 Monate","Auf depressive Symptome achten","Bei Transaminasen > 5× ULN oder relevanter Zytopenie Dosisanpassung/Pause"] },
    { name:"Glatirameracetat", brands:"Copaxone®, Clift®", moa:"Immunmodulation",
      base:["Keine spezifischen Laborkontrollen erforderlich"],
      ongoing:["Klinische Verlaufskontrolle; Injektionsstellen beurteilen"],
      prophylaxe:["Keine spezifische Prophylaxe","Standardimpfungen möglich"],
      trigger:["Lipoatrophie an Injektionsstellen → Rotation/Beratung","Sofort-Post-Injektions-Reaktion (Flush/Dyspnoe) → i. d. R. selbstlimitierend, aufklären"],
      risks:["Injektionsreaktionen","Lipoatrophie","sofortige Post-Injektions-Reaktion (selbstlimitierend)"],
      procedere:["Keine routinemäßigen Laborkontrollen erforderlich","Injektionsstellen und klinischen Verlauf beurteilen"] },
    { name:"Teriflunomid", brands:"Aubagio®", moa:"Dihydroorotat-Dehydrogenase-Hemmer",
      base:["Leberwerte","Blutbild","Blutdruck","Tuberkulose-Ausschluss","Schwangerschaftstest"],
      ongoing:["Transaminasen: initial alle 2 Wochen für ~6 Monate (bzw. monatlich), danach gemäß Fachinformation","Blutdruck regelmäßig","Blutbild bei Infektzeichen"],
      prophylaxe:["Sichere Kontrazeption (Frauen im gebärfähigen Alter; Teratogenität)","Bei Kinderwunsch/Schwangerschaft/schwerer Toxizität beschleunigte Elimination (Colestyramin oder Aktivkohle)","TB-Ausschluss vor Beginn"],
      trigger:["Transaminasen > 3× ULN → engmaschig, ggf. absetzen + Auswaschung","Blutdruckanstieg → behandeln","Schwere Infektion → pausieren"],
      risks:["Hepatotoxizität","Blutdruckanstieg","Leukopenie","Haarausfall","Teratogenität"],
      procedere:["Transaminasen initial alle 2 Wochen für 6 Monate (bzw. monatlich), danach gemäß Fachinformation","Blutdruck- und Blutbildkontrollen","Sichere Kontrazeption; bei Kinderwunsch/Schwangerschaft beschleunigte Elimination (Colestyramin)","Bei Transaminasen > 3× ULN Therapie überprüfen"] },
    { name:"Dimethylfumarat / Diroximelfumarat", brands:"Tecfidera®, Vumerity®, Skilarence®", moa:"Nrf2-Aktivierung / Immunmodulation",
      base:["Blutbild inkl. absolute Lymphozyten","Leberwerte","Urinstatus"],
      ongoing:["Blutbild inkl. Lymphozyten: nach 3 Monaten, dann alle 3 Monate (bzw. gemäß Fachinformation)","Leberwerte regelmäßig"],
      prophylaxe:["Bei anhaltender schwerer Lymphopenie PML-Risiko beachten (JCV-Status erwägen)","Standardimpfungen (Totimpfstoffe) möglich"],
      trigger:["Lymphozyten < 0,5 ×10⁹/l über > 6 Monate → Therapie überprüfen (PML-Risiko)","Lymphozyten 0,5–0,8 ×10⁹/l anhaltend → engmaschiger kontrollieren","Neue neurologische Symptome/MRT-Auffälligkeit → PML-Abklärung"],
      risks:["Lymphopenie → PML-Risiko bei anhaltend < 0,5 ×10⁹/l","Flush","gastrointestinale Beschwerden","Transaminasenanstieg"],
      procedere:["Blutbild inkl. Lymphozyten nach 3 Monaten, dann alle 3 Monate; Leberwerte regelmäßig","Bei anhaltender Lymphopenie < 0,5 ×10⁹/l (> 6 Monate) Therapie überprüfen (PML-Risiko)","Auf PML-Warnsymptome achten"] },
    { name:"S1P-Modulatoren", brands:"Fingolimod (Gilenya®), Siponimod (Mayzent®), Ozanimod (Zeposia®), Ponesimod (Ponvory®)", moa:"Sphingosin-1-Phosphat-Rezeptor-Modulation",
      base:["Blutbild inkl. absolute Lymphozyten","VZV-Serologie","EKG","Ophthalmologie (OCT: Makulaödem)","Leberwerte","dermatologischer Status","Blutdruck","Siponimod: CYP2C9-Genotyp"],
      ongoing:["Erstdosis-Überwachung (Fingolimod/Siponimod: 6 h EKG + RR) gemäß Fachinformation","Blutbild inkl. Lymphozyten: nach ~1, 3, 6 Monaten, dann regelmäßig","Leberwerte regelmäßig","augenärztliche Kontrolle nach 3–4 Monaten und bei Sehstörung","Hautkrebs-Screening"],
      prophylaxe:["VZV-seronegativ: Varizellen-Impfung ≥ 2–4 Wochen vor Beginn","Keine Lebendimpfstoffe während und bis ~2 Monate nach Therapie","Auf HSV/VZV/Kryptokokken achten"],
      trigger:["Absolute Lymphozyten < 0,2 ×10⁹/l bestätigt → Therapie pausieren/absetzen (Erholung abwarten), gemäß Fachinformation","Makulaödem → augenärztlich, ggf. absetzen","Bradykardie/AV-Block bei Erstgabe → Monitoring verlängern","Schwere Infektion → pausieren"],
      risks:["Bradykardie/AV-Block (Erstgabe)","Makulaödem","Lymphopenie/Infektionen (VZV)","Transaminasenanstieg","Hautmalignome","Blutdruckanstieg"],
      procedere:["Vor Beginn VZV-Serologie (ggf. Impfung ≥ 2–4 Wochen vorher), EKG, Augenarzt (OCT), Blutbild, Leberwerte","Erstdosis-Überwachung gemäß Fachinformation","Blutbild inkl. Lymphozyten nach 1, 3, 6 Monaten, dann regelmäßig; Leberwerte; Augen- und Hautkontrollen","Bei bestätigten Lymphozyten < 0,2 ×10⁹/l Therapie pausieren/absetzen"] },
    { name:"Natalizumab", brands:"Tysabri®, Tyruko®", moa:"Anti-α4-Integrin (VLA-4)",
      base:["Anti-JCV-Antikörper inkl. Index","cMRT (aktuell, als Referenz)","Blutbild"],
      ongoing:["Anti-JCV-Antikörper (Index): alle 6 Monate","cMRT-Surveillance: bei niedrigem PML-Risiko jährlich, bei erhöhtem Risiko alle 3–6 Monate (gemäß Risikostratifizierung/Fachinformation)"],
      prophylaxe:["JCV-negativ: niedriges PML-Risiko, AK alle 6 Monate wiederholen (Serokonversion möglich)","Keine spezifische antiinfektive Prophylaxe"],
      trigger:["PML-Risiko steigt mit JCV-Index-Höhe, Therapiedauer (> 24 Monate) und vorheriger Immunsuppression","JCV-negativ → niedriges Risiko; JCV-positiv Index ≤ 0,9 → niedrigeres Risiko","JCV-positiv, Index > 1,5 + Therapie > 24 Monate ohne vorherige Immunsuppression → höheres Risiko: MRT engmaschiger, Therapie neu bewerten (verlängertes Dosisintervall/Deeskalation erwägen)","Neue/progrediente Symptome oder MRT-Auffälligkeit → sofortige PML-Abklärung (cMRT, ggf. Liquor-JCV-PCR), Natalizumab pausieren"],
      risks:["PML — Risiko steigt mit JCV-Index, Therapiedauer > 24 Monate und vorheriger Immunsuppression","Infusionsreaktionen"],
      procedere:["Anti-JCV-Antikörper inkl. Index alle 6 Monate","cMRT-Surveillance gemäß PML-Risikostratifizierung (niedriges Risiko jährlich, erhöhtes Risiko alle 3–6 Monate)","Bei JCV-Index > 1,5 und Therapie > 24 Monate ohne vorherige Immunsuppression: erhöhtes PML-Risiko, Therapie neu bewerten","Patientenaufklärung über PML-Warnsymptome; bei neuen Symptomen sofortige cMRT und Vorstellung"] },
    { name:"Anti-CD20 (Ocrelizumab, Ofatumumab, Ublituximab, Rituximab)", brands:"Ocrevus®, Kesimpta®, Briumvi®, MabThera®/Rituximab (off-label)", moa:"B-Zell-Depletion (anti-CD20)",
      base:["Hepatitis-B-Screening (HBsAg, Anti-HBc, ggf. Anti-HBs)","Immunglobuline (IgG, IgM)","Blutbild inkl. Neutrophile/Lymphozyten","Impfstatus prüfen"],
      ongoing:["Immunglobuline (IgG): vor jedem Zyklus bzw. regelmäßig","Blutbild (auch späte Neutropenie möglich)","Infektzeichen bei jeder Gabe","CD19-B-Zellen optional zur Therapiesteuerung"],
      prophylaxe:["Impfungen vor Beginn abschließen: Lebendimpfstoffe ≥ 4 Wochen, Totimpfstoffe ≥ 2 Wochen vorher","Anti-HBc positiv → Hepatologie, ggf. antivirale HBV-Prophylaxe + HBV-DNA-Monitoring","PJP-Prophylaxe bei zusätzlicher Immunsuppression/Lymphopenie erwägen"],
      trigger:["Hypogammaglobulinämie (IgG niedrig) + rezidivierende Infekte → Therapie überprüfen, ggf. IgG-Substitution","Späte Neutropenie → Blutbild, Infektmanagement","HBV-Reaktivierung (Transaminasen-/HBV-DNA-Anstieg) → Hepatologie, antiviral"],
      risks:["Infektionen (Hypogammaglobulinämie bei Langzeittherapie)","HBV-Reaktivierung","Infusions-/Injektionsreaktionen","selten PML","späte Neutropenie"],
      procedere:["Vor Beginn HBV-Screening, Immunglobuline, Blutbild; Impfungen abschließen (Lebendimpfstoffe ≥ 4 Wochen vorher)","Im Verlauf IgG (vor jedem Zyklus) und Blutbild; Infektzeichen beachten","Bei Anti-HBc-Positivität hepatologische Mitbeurteilung / antivirale Prophylaxe","Bei Hypogammaglobulinämie mit Infekten Therapie überprüfen, ggf. IgG-Substitution"] },
    { name:"Cladribin", brands:"Mavenclad®", moa:"selektive Lymphozyten-Depletion (Immunrekonstitution)",
      base:["Blutbild inkl. Lymphozyten","HBV-/HCV-/HIV-/TB-Screening","VZV-Serologie","cMRT","Schwangerschaftstest","Malignom-Anamnese"],
      ongoing:["Lymphozyten: vor jedem Behandlungszyklus (Schwellenwert erreichen, z. B. Jahr 2 ≥ 0,8 ×10⁹/l) sowie 2 und 6 Monate nach Zyklusbeginn, danach regelmäßig","Malignom-Vorsorge altersentsprechend"],
      prophylaxe:["VZV-seronegativ: Impfung vor Beginn","Herpes-zoster-Prophylaxe (z. B. Aciclovir) bei Grad-3/4-Lymphopenie erwägen (gemäß Fachinformation)","Strenge Kontrazeption (Frauen und Männer) während und ≥ 6 Monate nach letzter Dosis"],
      trigger:["Lymphozyten unterhalb Schwellenwert vor Zyklus 2 → Verschiebung um bis zu 6 Monate (Erholung), gemäß Fachinformation","Grad-4-Lymphopenie → Herpes-Prophylaxe, Infektwachsamkeit","Neue neurologische Symptome → (sehr selten PML) abklären"],
      risks:["Lymphopenie/Infektionen (Herpes zoster)","Malignom-Wachsamkeit","Teratogenität (strenge Kontrazeption)"],
      procedere:["Vor Beginn Blutbild, Infektionsscreening (HBV/HCV/HIV/TB), VZV-Serologie, Malignom-Anamnese","Lymphozyten vor jedem Zyklus (Schwellenwert beachten) sowie 2 und 6 Monate nach Zyklusbeginn","Strenge Kontrazeption; bei Grad-3/4-Lymphopenie Herpes-Prophylaxe erwägen","Auf Infektzeichen (v. a. Herpes zoster) achten"] },
    { name:"Alemtuzumab", brands:"Lemtrada®", moa:"Anti-CD52 (Immunrekonstitution)",
      base:["Blutbild + Differenzial","Kreatinin","Urinstatus","TSH","HBV-/VZV-/TB-Screening","EKG/Basisdiagnostik"],
      ongoing:["Monatliches Blutbild, Kreatinin und Urinstatus bis 48 Monate nach der letzten Infusion","TSH alle 3 Monate bis 48 Monate nach der letzten Infusion"],
      prophylaxe:["Herpes-Prophylaxe (Aciclovir) ab Tag 1 jedes Zyklus für ≥ 1 Monat (gemäß Fachinformation)","PJP-Prophylaxe erwägen","VZV-seronegativ: Impfung ≥ 6 Wochen vor Beginn","Listerien-Vorsichtsmaßnahmen (Ernährung) um die Infusion"],
      trigger:["Thrombozytopenie/Blutungsneigung → sofort ITP-Abklärung","Hämaturie/Kreatininanstieg → Anti-GBM-Nephropathie ausschließen","Schilddrüsensymptome/TSH-Veränderung → endokrinologisch abklären"],
      risks:["sekundäre Autoimmunität (ITP, Anti-GBM-Nephropathie, Schilddrüse)","Infusionsreaktionen","Infektionen"],
      procedere:["Monatliches Blutbild, Kreatinin und Urinstatus bis 48 Monate nach der letzten Infusion","TSH alle 3 Monate bis 48 Monate","Herpes-Prophylaxe (Aciclovir) gemäß Fachinformation","Patientenaufklärung über Warnsymptome (Blutungsneigung, Hämaturie, Schilddrüsensymptome)"] }
  ],

  /* ── 3) Myasthenia gravis — Wirkstoffe mit Verschlechterungs-/Auslöse-
     Potenzial ───────────────────────────────────────────────────────────
     Grundlage: International Consensus Guidance for Management of MG (Narayanaswami/Sanders/Wolfe, Neurology 2021) · MGFA Cautionary Drugs · Leitlinie myasthene Syndrome (Wiendl et al. 2023). Frühere Grundlage: DGN-Leitlinie Myasthenia
     gravis; internationale Empfehlungen/MGFA). KURATIERT, nicht vollständig.
     Fehlen eines Wirkstoffs bedeutet NICHT automatisch Unbedenklichkeit.
     Klinische Einzelfallentscheidung; Nutzen/Risiko abwägen. */
  mgDrugs: [
    {sub:"Telithromycin", brands:["Ketek"], level:"avoid", evidence:"kontraindiziert · stärkste Evidenz", use:"Antibiotikum (Ketolid)", alt:"Alternatives Antibiotikum nach Erreger/Resistenz (z. B. Penicilline/Cephalosporine).", note:"Schwere, z. T. tödliche Exazerbation — nicht anwenden (International Consensus 2020; MGFA)."},
    {sub:"Magnesium (parenteral, hochdosiert)", brands:["Magnesium Verla i.v.","Mg 5-Sulfat"], level:"avoid", evidence:"kontraindiziert · stärkste Evidenz (parenteral)", use:"Elektrolytsubstitution / Antiarrhythmie / (Prä-)Eklampsie", alt:"Orale Substitution meist unkritisch; parenteral nur bei zwingender Indikation, niedrigste Dosis, Überwachung.", note:"Hemmt neuromuskuläre Übertragung — i.v. potenziell gefährlich."},
    {sub:"Botulinumtoxin", brands:["Botox","Dysport","Xeomin"], level:"avoid", evidence:"kontraindiziert · stärkste Evidenz", use:"Muskelrelaxans (Dystonie, Spastik, kosmetisch)", alt:"Je nach Indikation orale Antispastika/Physiotherapie.", note:"Verstärkt neuromuskuläre Blockade — meiden."},
    {sub:"Penicillamin / D-Penicillamin", brands:["Metalcaptase"], level:"avoid", evidence:"kontraindiziert · stärkste Evidenz (kann MG auslösen)", use:"Chelatbildner (M. Wilson, selten RA)", alt:"M. Wilson: Trientine/Zink; andere Indikation: alternatives Verfahren.", note:"Kann eine (Autoantikörper-vermittelte) Myasthenie induzieren."},
    {sub:"Immun-Checkpoint-Inhibitoren (Pembrolizumab, Nivolumab, Ipilimumab, Atezolizumab)", brands:["Keytruda","Opdivo","Yervoy","Tecentriq"], level:"avoid", evidence:"kann MG auslösen · hohe Letalität", use:"Onkologische Immuntherapie", alt:"Interdisziplinäre (neuro-onkologische) Nutzen-Risiko-Abwägung; ggf. präventiv IVIG/PLEX; engmaschig überwachen.", note:"Kann de-novo-MG auslösen/verschlechtern; auf CK/Troponin achten (Myokarditis/Myositis-Overlap), Letalität bis ~50 % in der Krise."},
    {sub:"Chinin", brands:["Limptar"], level:"avoid", evidence:"kontraindiziert · stärkste Evidenz", use:"Wadenkrämpfe / (Antimalariamittel)", alt:"Nicht-medikamentöse Maßnahmen; Chinin meiden.", note:"Beeinträchtigt neuromuskuläre Übertragung (MGFA: avoid)."},
    {sub:"Aminoglykoside (Gentamicin, Tobramycin, Amikacin, Neomycin, Streptomycin)", brands:["Refobacin","Gentamicin","Tobrex","Bramitob"], level:"avoid", evidence:"meiden · belegt", use:"Antibiotikum (v. a. gramnegativ / schwere Infekte)", alt:"Wenn möglich Penicilline/Cephalosporine/Carbapeneme; nur bei zwingender Indikation unter Überwachung.", note:"Neuromuskuläre Blockade — möglichst meiden."},
    {sub:"Fluorchinolone (Ciprofloxacin, Levofloxacin, Moxifloxacin, Ofloxacin, Norfloxacin)", brands:["Ciprobay","Tavanic","Avalox","Ciloxan"], level:"avoid", evidence:"meiden · belegt (FDA-Warnung)", use:"Antibiotikum (Atemwege, Harnwege, GI)", alt:"Je nach Indikation Penicilline/Cephalosporine; bei HWI z. B. Fosfomycin/Nitrofurantoin.", note:"MG-Exazerbationen berichtet (FDA-Warnhinweis)."},
    {sub:"Makrolide (Azithromycin, Clarithromycin, Erythromycin)", brands:["Zithromax","Klacid","Erythrocin"], level:"avoid", evidence:"meiden · belegt", use:"Antibiotikum (Atemwege, atypische Erreger)", alt:"Penicilline/Cephalosporine; Doxycyclin meist unkritisch (Auswahl nach Erreger).", note:"Beeinträchtigt neuromuskuläre Übertragung — meiden/mit Vorsicht."},
    {sub:"Nicht-depolarisierende Muskelrelaxanzien (Rocuronium, Vecuronium, Atracurium)", brands:["Esmeron","Norcuron","Tracrium"], level:"avoid", evidence:"meiden · belegt (Anästhesie)", use:"Muskelrelaxation in Anästhesie", alt:"Anästhesie informieren: möglichst ohne/mit ~1/10 Dosis, TOF-Monitoring; Rocuronium + Sugammadex-Reversal (siehe Perioperatives Management).", note:"Ausgeprägte Empfindlichkeit, verlängerte Wirkung."},
    {sub:"Procainamid / Chinidin", brands:["Chinidin"], level:"avoid", evidence:"meiden · belegt", use:"Antiarrhythmikum (Klasse I)", alt:"Alternatives Antiarrhythmikum nach Rhythmusstörung (kardiologische Rücksprache).", note:"Neuromuskuläre Blockade — meiden."},
    {sub:"Interferon-α", brands:["IntronA","Roferon"], level:"avoid", evidence:"meiden · kann auslösen", use:"Antiviral / onkologisch", alt:"Je nach Indikation alternative (moderne antivirale) Therapie.", note:"Kann Myasthenie auslösen/verschlechtern."},
    {sub:"Chloroquin / Hydroxychloroquin", brands:["Resochin","Quensyl"], level:"avoid", evidence:"meiden · kann auslösen/verschlechtern", use:"Antimalariamittel / Antirheumatikum (SLE, RA)", alt:"Je nach Indikation alternative DMARDs/Immunsuppressiva; Nutzen-Risiko abwägen.", note:"Kann Myasthenie auslösen/verschlechtern."},
    {sub:"Betablocker (auch topisch, z. B. Timolol-Augentropfen)", brands:["Beloc","Bisoprolol","Metoprolol","Timolol","Tim-Ophtal"], level:"caution", evidence:"Vorsicht · belegt", use:"Antihypertensivum / Frequenzkontrolle / Glaukom (topisch)", alt:"Bei Hypertonie ACE-Hemmer/ARB; kardiale Indikation kann Betablocker erfordern → unter Beobachtung; topisch: alternative Glaukomtherapie.", note:"Kann MG verschlechtern — auch topisch beachten."},
    {sub:"Calciumantagonisten (Verapamil, Diltiazem)", brands:["Isoptin","Dilzem"], level:"caution", evidence:"Vorsicht · berichtet", use:"Antihypertensivum / Frequenzkontrolle", alt:"Bei Hypertonie ACE-Hemmer/ARB als Option; Indikation prüfen.", note:"Können neuromuskuläre Übertragung beeinträchtigen."},
    {sub:"Statine (Atorvastatin, Simvastatin, Pravastatin, Rosuvastatin u. a.)", brands:["Sortis","Zocor","Simvahexal","Atorvastatin","Simvastatin","Pravastatin","Rosuvastatin"], level:"caution", evidence:"Vorsicht · belegt (niedrigste Dosis)", use:"Lipidsenker (kardiovaskuläre Prävention)", alt:"Bei Verschlechterung Ezetimib/PCSK9-Hemmer; wenn indiziert niedrigste wirksame Dosis; nicht pauschal absetzen.", note:"Können MG verschlechtern/demaskieren (MG-artige Symptome)."},
    {sub:"Jodhaltiges Kontrastmittel", brands:["Imeron","Ultravist","Accupaque"], level:"caution", evidence:"Vorsicht · ältere Berichte (moderne KM sicherer)", use:"Röntgen-/CT-Kontrastmittel", alt:"Indikation prüfen; falls möglich alternative Bildgebung; bei Notwendigkeit überwachen.", note:"Ältere Berichte über Verschlechterung; moderne Mittel gelten als sicherer."},
    {sub:"Lithium", brands:["Quilonum","Hypnorex"], level:"caution", evidence:"Vorsicht · berichtet", use:"Phasenprophylaktikum (bipolare Störung)", alt:"Alternative Phasenprophylaxe (z. B. Valproat/Lamotrigin) — psychiatrische Rücksprache.", note:"Kann Muskelschwäche verstärken."},
    {sub:"Phenytoin", brands:["Phenhydan"], level:"caution", evidence:"Vorsicht · berichtet", use:"Antiepileptikum / Antiarrhythmikum", alt:"Alternatives Antiepileptikum (z. B. Levetiracetam/Lacosamid) — neurologische Abstimmung.", note:"Kann neuromuskuläre Übertragung beeinträchtigen."},
    {sub:"Glukokortikoide (hochdosiert, Beginn)", brands:["Prednisolon","Decortin","Urbason"], level:"caution", evidence:"Vorsicht · initiale Verschlechterung (therapeutisch etabliert)", use:"Immunsuppression — auch MG-Basistherapie", alt:"In der MG-Therapie etabliert; einschleichend beginnen, stationär überwachen.", note:"Initial passagere Verschlechterung möglich."},
    {sub:"Chlorpromazin / Neuroleptika (Phenothiazine)", brands:["Propaphenin"], level:"caution", evidence:"Vorsicht · berichtet", use:"Antipsychotikum", alt:"Substanz mit geringerer neuromuskulärer Wirkung wählen (psychiatrische Rücksprache).", note:"Können Muskelschwäche verstärken."},
    {sub:"Gabapentin / Pregabalin", brands:["Neurontin","Lyrica"], level:"caution", evidence:"Vorsicht · berichtet", use:"Antikonvulsivum / neuropathischer Schmerz", alt:"Alternative Schmerz-/Anfallstherapie; niedrig dosieren.", note:"Hochdosiert selten Verschlechterung."},
    {sub:"Tetracycline (Doxycyclin, Minocyclin)", brands:["Doxycyclin","Minocyclin","Vibramycin"], level:"caution", evidence:"Vorsicht · NMJ-Interferenz (berichtet)", use:"Antibiotikum", alt:"Je nach Indikation Penicilline/Cephalosporine; bei Notwendigkeit überwachen.", note:"Kann die neuromuskuläre Übertragung beeinträchtigen."},
    {sub:"Respiratorische Depressiva (Benzodiazepine, Opioide, Sedativa)", brands:["Diazepam","Lorazepam","Tavor","Midazolam","Morphin"], level:"caution", evidence:"Vorsicht · Atemdepression (Krisenrisiko)", use:"Sedierung / Analgesie / Anxiolyse", alt:"Zurückhaltend dosieren, Atmung überwachen; multimodale/opioidsparende Analgesie.", note:"Können bei respiratorisch grenzwertiger MG eine Krise begünstigen (perioperativ relevant)."}
  ],

  /* ── 4) QMG-Score (Quantitativer Myasthenia-gravis-Score) ─────────────
     Quelle: MHH-SOP "Myasthenische Krise" (Tabelle 1), verändert nach
     Jaretzki et al. 2000. Jeder Punkt 0–3; ZNA-Hinweis: Vitalkapazität und
     Handkraft können in der ZNA aktuell nicht erhoben werden → "n.e.". */
  qmg: [
    {id:"dipl", name:"Doppelbilder beim Blick zur Seite", opts:[{v:0,l:"60 s"},{v:1,l:"11–59 s"},{v:2,l:"1–10 s"},{v:3,l:"spontan"}]},
    {id:"ptosis", name:"Ptosis (Aufblick)", opts:[{v:0,l:"60 s"},{v:1,l:"11–59 s"},{v:2,l:"1–10 s"},{v:3,l:"spontan"}]},
    {id:"face", name:"Gesichtsmuskulatur", opts:[{v:0,l:"Normal, kräftiger Lidschluss"},{v:1,l:"Vollständiger Lidschluss, minimale Schwäche, etwas Widerstand"},{v:2,l:"Vollständiger Lidschluss, widerstandslos"},{v:3,l:"Unvollständiger Lidschluss"}]},
    {id:"swallow", name:"Schlucken", opts:[{v:0,l:"Normal"},{v:1,l:"Minimales Husten/Räuspern"},{v:2,l:"Schweres Husten/Würgen/Naseninsuffizienz"},{v:3,l:"Kein Schlucken möglich"}]},
    {id:"speech", name:"Dysarthrie (1–50 laut zählen)", opts:[{v:0,l:"Keine bei #50"},{v:1,l:"bei #30–49"},{v:2,l:"bei #10–29"},{v:3,l:"bei #9"}]},
    {id:"armR", name:"Armhalteversuch rechts (90° sitzend)", opts:[{v:0,l:"240 s"},{v:1,l:"90–239 s"},{v:2,l:"10–89 s"},{v:3,l:"0–9 s"}]},
    {id:"armL", name:"Armhalteversuch links (90° sitzend)", opts:[{v:0,l:"240 s"},{v:1,l:"90–239 s"},{v:2,l:"10–89 s"},{v:3,l:"0–9 s"}]},
    {id:"vc", name:"Vitalkapazität", zna:true, opts:[{v:0,l:"≥80 %"},{v:1,l:"65–79 %"},{v:2,l:"50–64 %"},{v:3,l:"<50 %"},{v:-1,l:"nicht erhoben (ZNA)"}]},
    {id:"gripR", name:"Handkraft rechts", zna:true, opts:[{v:0,l:"♂ ≥45 · ♀ ≥30 kg"},{v:1,l:"♂ 15–44 · ♀ 10–29 kg"},{v:2,l:"♂ 5–14 · ♀ 5–9 kg"},{v:3,l:"♂/♀ 0–4 kg"},{v:-1,l:"nicht erhoben (ZNA)"}]},
    {id:"gripL", name:"Handkraft links", zna:true, opts:[{v:0,l:"♂ ≥45 · ♀ ≥30 kg"},{v:1,l:"♂ 15–44 · ♀ 10–29 kg"},{v:2,l:"♂ 5–14 · ♀ 5–9 kg"},{v:3,l:"♂/♀ 0–4 kg"},{v:-1,l:"nicht erhoben (ZNA)"}]},
    {id:"head", name:"Kopfhalteversuch (45° liegend)", opts:[{v:0,l:"120 s"},{v:1,l:"30–119 s"},{v:2,l:"1–29 s"},{v:3,l:"0 s"}]},
    {id:"legR", name:"Beinhalteversuch rechts (45–50°)", opts:[{v:0,l:"100 s"},{v:1,l:"31–99 s"},{v:2,l:"1–30 s"},{v:3,l:"0 s"}]},
    {id:"legL", name:"Beinhalteversuch links (45–50°)", opts:[{v:0,l:"100 s"},{v:1,l:"31–99 s"},{v:2,l:"1–30 s"},{v:3,l:"0 s"}]}
  ],

  /* ── 5) Umstellung orale Pyridostigmin-Gabe → i.v. NEOSTIGMIN (Perfusor)
     Quelle: MHH-SOP "Umstellung orale Pyridostigmin-Gabe auf i.v.
     Neostigmin-Gabe bei myasthener Krise" (nach Vertriebseinstellung der
     Kalymin-Ampullen). Faktor ca. 80:1. Neostigmin i.v. = off-label. */
  neostigmin: {
    faktor: 80,
    konz: 0.05,
    loesung: "5 Ampullen Neostigmin (0,5 mg/1 ml) = 2,5 mg in 5 ml + 45 ml NaCl 0,9% = 50 ml → 0,05 mg Neostigmin/ml",
    bolus: "Initial 0,5 mg Neostigmin i.v. als Bolus (= 1 Ampulle 0,5 mg/1 ml)",
    maxIV: "8–12 mg/d",
    maxOral: 720,
    table: [
      {oral:90,  iv:1.125, mgh:"0,047", mlh:"0,94", round:"1 ml/h"},
      {oral:180, iv:2.25,  mgh:"0,094", mlh:"1,88", round:"1,9 ml/h"},
      {oral:270, iv:3.375, mgh:"0,140", mlh:"2,8",  round:"2,8 ml/h"},
      {oral:360, iv:4.5,   mgh:"0,188", mlh:"3,76", round:"3,8 ml/h"},
      {oral:450, iv:5.625, mgh:"0,234", mlh:"4,68", round:"4,7 ml/h"},
      {oral:720, iv:9,     mgh:"0,375", mlh:"7,5",  round:"7,5 ml/h"},
      {oral:900, iv:11.25, mgh:"0,5",   mlh:"10",   round:"10 ml/h"}
    ]
  },

  /* ── 6) Myasthene Krise — SOP-Kurzpfad (MHH) ──────────────────────────
     Quelle: MHH-SOP "Myasthenische Krise" (v1.0, genehmigt 19.06.2024).
     Kontaktnummern MHH-intern. */
  krise: {
    contacts: [
      {label:"Intensivstation (ITS 17)", number:"17-1444", note:"Bettenhandy Station 44"},
      {label:"Plasmapherese / IA — Station 10", number:"17-1103", note:"Notfallplasmapherese / Immunadsorption"}
    ],
    steps: [
      {t:"Klinische Untersuchung", tag:"Assessment", d:"Progrediente Muskelschwäche? QMG-Score erheben (in der Akutsituation ohne Handkraft/LuFu → QMG-Reiter). Zeichen der respiratorischen Insuffizienz (Dyspnoe, Atemfrequenz, tracheobronchiale Sekretstauung, schwere Dysphagie, Einsatz der Hilfsatemmuskulatur)? Vegetative Symptome (Schwitzen, Tachykardie, Speichelfluss) oder Infekt?", link:{label:"Zum QMG-Score", tab:"qmg"}},
      {t:"Basismaßnahmen", tag:"Basis", d:"Oberkörper hochlagern · Rachen freihalten (ggf. Guedel-Tubus, Absaugung) · O₂ 2–10 L/min über Maske · periphervenösen Zugang (PVK) anlegen."},
      {t:"Monitoring (ZNA)", tag:"Monitoring", d:"SpO₂-Überwachung, RR, EKG."},
      {t:"Anamnese", tag:"Anamnese", d:"Auslöser: Myasthenie-verstärkende Medikamente (→ Wirkstoff-Check)? Begleiterkrankungen, Infekt, Sepsis? Differenzialdiagnosen screenen: Vigilanzminderung durch CO₂-Narkose, konkurrierende ZNS-Erkrankung, cholinerge Krise/Intoxikation.", link:{label:"Zum Wirkstoff-Check", scroll:"mg-check-card"}},
      {t:"Labor", tag:"Labor", d:"NEU-Profil (ZNA) + venöse BGA mit Na, K (pCO₂ > 50 mmHg?)."},
      {t:"Intensivstation", tag:"ITS 17-1444", d:"Kontaktaufnahme mit ITS 17: 17-1444 (Bettenhandy Station 44). Transport in Arztbegleitung mit Monitoring + Ambu-Beutel. Rückverlegung auf Stroke Unit/Normalstation: oberärztliche Entscheidung."},
      {t:"Symptomatische Therapie (ITS)", tag:"Therapie", d:"Auslöser beseitigen, Myasthenie-verstärkende Medikamente absetzen (DGN-Leitlinie). Bei Dysphagie oder fehlender Magensonde: orale Pyridostigmin- auf i.v. Neostigmin-Gabe umstellen (→ Umrechner). Ggf. Atropin 0,25–0,5 mg s.c. 3–6×/d bei cholinergen UAW (Speichelsekretion). Kalium auf hochnormale Werte ausgleichen.", link:{label:"Zum Pyridostigmin\u2192Neostigmin-Umrechner", scroll:"mg-neo-card"}},
      {t:"Immunmodulation", tag:"Immun", d:"Notfallplasmapherese oder Immunadsorption (Station 10: 17-1103) oder IVIG 0,4 g/kg KG/Tag. Ggf. einschleichend Prednisolon 25 mg/d i.v. oder Methylprednisolon 250–1000 mg i.v. für 3–5 d (bei bereits intubierten Patienten)."},
      {t:"Infektdiagnostik/-therapie", tag:"Infekt", d:"BK, U-Bak, Trachealsekret, Rachenabstrich, Rö-Thorax. Ggf. Antibiose vorzugsweise mit 3.-Generations-Cephalosporin, z. B. Ceftriaxon 2–4 g i.v./d (CAVE: myasthenieverstärkende Antibiotika)."},
      {t:"Indikation zur Beatmung", tag:"Beatmung", d:"VK < 15 ml/kg KG · Atemzugvolumen < 5 ml/kg KG · Atemfrequenz > 35/min · arterielle BGA pO₂ < 80 mmHg · pCO₂ > 50 mmHg.", crit:true},
      {t:"Differenzialdiagnosen", tag:"DD", d:"Cholinerge Krise (Überdosierung Cholinesterasehemmer bzw. versäumte Reduktion nach erfolgreicher Immunsuppression) · Botulismus · Organophosphat-Intoxikation · Schlangenbiss.", info:true}
    ]
  },

  periop: { sections: [
      {t:"Präoperativ · Risikostratifizierung", items:["Prädiktoren für postoperative respiratorische Insuffizienz / verlängerte Beatmung: MG-Dauer > 2 Jahre, bulbäre oder respiratorische Symptome, generalisierte mittelschwere+ Schwäche, frühere myasthene Krise, Pyridostigmin > 750 mg/d; patientenseitig COPD, BMI > 28 kg/m²","Krankheitsaktivität vor Elektiveingriff optimieren; Vitalkapazität und bulbäre Funktion prüfen","Bei schwerer/instabiler MG präoperativ IVIG oder Plasmapherese/IA erwägen","Interdisziplinär planen (Neurologie, Anästhesie, Chirurgie); postoperative Überwachung/ITS-Kapazität einplanen"], links:[]},
      {t:"Anästhesie & Muskelrelaxanzien", items:["Nicht-depolarisierende Relaxanzien (NDMR): ausgeprägte Empfindlichkeit → möglichst vermeiden; wenn nötig ~1/10 der Standard-Intubationsdosis unter quantitativem TOF-Monitoring; Rocuronium ist Mittel der Wahl (Sugammadex-reversierbar)","Succinylcholin: Resistenz (ED95 ~2,5×), Gefahr eines Phase-II-Blocks; Cholinesterasehemmer verlängern die Wirkung","Induktion (Propofol, Etomidat, Ketamin) unproblematisch; kurzwirksame Opioide (Remifentanil) bevorzugt; volatile Anästhetika (Sevofluran/Desfluran) möglich und selbst relaxierend","NMBD-freie Allgemeinanästhesie und/oder Regionalanästhesie erwägen (weniger ICU-Aufnahmen und postoperative Krisen)"], links:[]},
      {t:"Reversierung & Monitoring", items:["Sugammadex (für Rocuronium/Vecuronium) gegenüber Neostigmin bevorzugt: schnelle, vollständige Reversierung; kann Krisen-/Pneumonierisiko senken","Dosis nach Blockadetiefe (2–16 mg/kg); Reversierung bei MG unvorhersehbar → obligates quantitatives TOF-Monitoring, Ziel TOFR > 0,9","Bei unvollständiger Erholung trotz Sugammadex ggf. vorsichtig Cholinesterasehemmer (Einzelfälle beschrieben)"], links:[]},
      {t:"Cholinesterasehemmer perioperativ", items:["Handhabung individualisiert (Rücksprache Neurologie/Anästhesie)","Bei Nüchternheit/Dysphagie orale Pyridostigmin- auf i.v. Neostigmin-Gabe umstellen","Postoperativ gewohnte MG-Medikation zeitnah wieder ansetzen; Stress-Dosis-Steroide bei Dauertherapie erwägen"], links:[{label:"Zum Pyridostigmin→Neostigmin-Umrechner",scroll:"mg-neo-card"}]},
      {t:"Extubation & postoperativ", items:["Wache Extubation bei adäquater Spontanatmung und Kraft, TOFR > 0,9","Postoperatives respiratorisches Monitoring: Atemfrequenz, Tidalvolumen > 5 ml/kg, SpO₂ > 95 %, Vitalkapazität; verzögerte respiratorische Insuffizienz möglich (auch am 1. postoperativen Tag)","Erhöhtes Risiko myasthener Krise (v. a. nach Thymektomie); myasthene vs. cholinerge Krise differenzieren","Sekretmanagement, Hustenunterstützung, zurückhaltende Opioide/Sedativa; Elektrolyte korrigieren (kein i.v. Magnesium), Infekte behandeln, Normothermie","Perioperativ Myasthenie-verschlechternde Medikamente meiden"], links:[{label:"Zum Wirkstoff-Check",scroll:"mg-check-card"},{label:"Zur Krisen-SOP",scroll:"mg-krise-card"}]}
    ] }
};
