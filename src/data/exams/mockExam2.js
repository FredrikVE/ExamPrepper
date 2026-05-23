//src/data/questions2.js
export const mockExam2 = {
	id: "mock-exam-2",
	title: "Øveeksamen 2: Fordypning",
	description: "Operating models, governance-arketyper, D4D roadmap, bærekraft og Cynefin.",
	questions: [
			{
			id: 101,
			type: "fill",
			title: "Digitization vs digitalization",
			points: 1,
			prompt: "________ er en sosioteknisk prosess der digital teknologi brukes til å endre en eller flere sosiotekniske strukturer.",
			answers: ["digitalization", "digitalisering"],
			answerKey: "Digitalization / digitalisering",
			source: "Fasit: Forelesning 7, D4D building blocks, slide 'What is the difference between digitization, digitalization and digital transformation?'.",
			whyCorrect: "Digitalization er definert som sosioteknisk endring, i motsetning til digitization som er ren teknisk konvertering fra analogt til digitalt.",
			whyWrong: "Digitization er feil fordi det bare handler om teknisk konvertering (f.eks. papir til PDF). Digital transformation er for bredt — det beskriver en hel organisasjonsendring over tid."
		},
		{
			id: 102,
			type: "single",
			title: "Operating model: Coordination",
			points: 1,
			prompt: "Hvilket operating model passer best for organisasjoner med unike forretningsenheter som trenger å kjenne hverandres transaksjoner, men som IKKE standardiserer prosessene?",
			source: "Fasit: Forelesning 5, slide 'Four operating models' (Figure A1.1 fra D4D).",
			options: [
				{ text: "Diversification", correct: false, why: "Galt: diversification har lav integrasjon OG lav standardisering. Her er integrasjonen høy." },
				{ text: "Coordination", correct: true, why: "Riktig: coordination = høy integrasjon, lav standardisering. Unike enheter som deler data." },
				{ text: "Unification", correct: false, why: "Galt: unification har høy standardisering i tillegg til høy integrasjon." },
				{ text: "Replication", correct: false, why: "Galt: replication har høy standardisering men lav integrasjon." }
			]
		},
		{
			id: 103,
			type: "single",
			title: "Operating model: Replication",
			points: 1,
			prompt: "Hvilken operating model beskriver uavhengige, men like forretningsenheter som deler beste praksis?",
			source: "Fasit: Forelesning 5, slide 'Four operating models'.",
			options: [
				{ text: "Coordination", correct: false, why: "Galt: coordination krever at enhetene deler data/transaksjoner (høy integrasjon)." },
				{ text: "Unification", correct: false, why: "Galt: unification krever også høy integrasjon mellom enhetene." },
				{ text: "Replication", correct: true, why: "Riktig: lav integrasjon, høy standardisering — like prosesser, men enhetene opererer uavhengig." },
				{ text: "Diversification", correct: false, why: "Galt: diversification har lav standardisering, altså ulike prosesser." }
			]
		},
		{
			id: 104,
			type: "fill",
			title: "Digital transformation",
			points: 1,
			prompt: "Digital transformation er en betydelig organisasjonsendring, drevet eller muliggjort av omfattende bruk av ________ teknologier.",
			answers: ["digital", "digitale", "digital teknologi", "digitale teknologier"],
			answerKey: "digital(e) / digital technologies",
			source: "Fasit: Forelesning 14, slide 'What is a digital transformation': 'A significant organizational change, driven or enabled by the extensive use of digital technologies.'",
			whyCorrect: "Riktig fordi definisjonen eksplisitt knytter digital transformation til extensive use of digital technologies.",
			whyWrong: "Galt hvis svaret peker på bare 'nye prosesser' eller 'ledelse'. Teknologi er en sentral driver/enabler i definisjonen."
		},
		{
			id: 105,
			type: "multi",
			title: "Innholdet i en digital strategi",
			points: 1,
			prompt: "Marker elementene som ifølge forelesningen inngår i en digital strategi.",
			source: "Fasit: Forelesning 14, slide 'What is a digital strategy?' og påfølgende slides.",
			options: [
				{ text: "En digital visjon — utfordrende og inspirerende", correct: true, why: "Riktig: digital vision er første element." },
				{ text: "En portefølje av digitale initiativer", correct: true, why: "Riktig: prioritering av digitale prosjekter/initiativer." },
				{ text: "Et veikart (roadmap)", correct: true, why: "Riktig: roadmap er planleggingsverktøy for gjennomføring." },
				{ text: "En definisjon av ansvar", correct: true, why: "Riktig: avklaring av hvem som eier og følger opp." },
				{ text: "En komplett BPMN-modell av alle prosesser", correct: false, why: "Galt: BPMN er et prosessmodelleringsverktøy, ikke en del av digital strategi-definisjonen." }
			]
		},
		{
			id: 106,
			type: "single",
			title: "Governance vs management",
			points: 1,
			prompt: "Hva er forskjellen mellom IT governance og IT management ifølge Weill & Ross (2004)?",
			source: "Fasit: Forelesning 11, slide om IT governance (Weill and Ross 2004).",
			options: [
				{ text: "IT governance handler om å ta IT-beslutninger; management handler om å implementere dem.", correct: false, why: "Galt: governance handler IKKE om å ta beslutninger. Det gjør management." },
				{ text: "IT governance bestemmer hvem som systematisk tar og bidrar til IT-beslutninger; management tar og gjennomfører beslutningene.", correct: true, why: "Riktig: 'IT governance is not about making IT decisions — management does that — but rather determines who systematically makes and contributes to those decisions.'" },
				{ text: "Det er ingen forskjell; begrepene brukes om hverandre.", correct: false, why: "Galt: kurset skiller dem tydelig." },
				{ text: "Governance er kun for private bedrifter; management er kun for offentlig sektor.", correct: false, why: "Galt: begge gjelder alle typer organisasjoner." }
			]
		},
		{
			id: 107,
			type: "single",
			title: "Federal vs IT Duopoly",
			points: 1,
			prompt: "Hva skiller Federal fra IT Duopoly som governance-arketype?",
			source: "Fasit: Forelesning 6, slide 'Summary: Six archetypal approaches to IT decision making'.",
			options: [
				{ text: "Federal inkluderer C-level og alle operating groups sammen med IT; Duopoly er IT-ledere pluss en gruppe forretningsledere.", correct: true, why: "Riktig: Federal er bredere (alle representanter + IT), mens Duopoly er en to-parts-tilnærming (IT executives + business leaders)." },
				{ text: "De er identiske — begge betyr at IT alene bestemmer.", correct: false, why: "Galt: det ville vært IT Monarchy." },
				{ text: "Federal betyr at hver enhet bestemmer for seg; Duopoly betyr at brukerne bestemmer.", correct: false, why: "Galt: dette beskriver henholdsvis Feudal og Anarchy." },
				{ text: "Federal gjelder bare IT-infrastruktur; Duopoly gjelder bare IT-prinsipper.", correct: false, why: "Galt: arketypene kan anvendes på alle fem beslutningsdomener i styringsmatrisen." }
			]
		},
		{
			id: 108,
			type: "multi",
			title: "Fem beslutningsdomener i IT governance",
			points: 1,
			prompt: "Marker de riktige beslutningsdomenene i IT governance.",
			source: "Fasit: Forelesning 6, slide 'Styringsmatrisen' og oppsummering av IT governance.",
			options: [
				{ text: "IT principles", correct: true, why: "Riktig: ett av de fem domenene." },
				{ text: "IT architecture", correct: true, why: "Riktig: ett av de fem domenene." },
				{ text: "IT infrastructure strategies", correct: true, why: "Riktig: ett av de fem domenene." },
				{ text: "Business application needs", correct: true, why: "Riktig: ett av de fem domenene." },
				{ text: "IT investment and prioritization", correct: true, why: "Riktig: ett av de fem domenene." },
				{ text: "IT marketing and branding", correct: false, why: "Galt: markedsføring er ikke et IT governance-domene i Weill & Ross-rammeverket." }
			]
		},
		{
			id: 109,
			type: "single",
			title: "Transformation theory",
			points: 1,
			prompt: "Ifølge D4D krever dual transformation tre typer transformasjon. Hvilken inkluderer Shared Customer Insights og Accountability Framework?",
			source: "Fasit: Forelesning 13, D4D summary, slide 'Transformation theory'.",
			options: [
				{ text: "Business Transformation", correct: false, why: "Galt: business transformation handler om new value creation through digital value propositions." },
				{ text: "Architecture Transformation", correct: false, why: "Galt: architecture transformation dekker OB, DP og digital offerings." },
				{ text: "Governance Transformation", correct: true, why: "Riktig: governance transformation inkluderer shared customer insight og accountability framework." },
				{ text: "Cultural Transformation", correct: false, why: "Galt: cultural transformation er ikke en av de tre navngitte transformasjonene i D4D-modellen." }
			]
		},
		{
			id: 110,
			type: "fill",
			title: "Circular economy",
			points: 1,
			prompt: "Den sirkulære økonomien handler om å beskytte natur og miljø gjennom å holde produkter, ressurser og materialer i ________ så lenge som mulig.",
			answers: ["sirkulasjon", "circulation", "omløp", "kretsløp"],
			answerKey: "sirkulasjon / circulation",
			source: "Fasit: Forelesning 15, slide 'The circular economy': 'Through keeping products, resources and materials in circulation as long as possible.'",
			whyCorrect: "Riktig fordi sirkulasjon/circulation er kjernen i circular economy-definisjonen — motsetningen til lineær 'bruk og kast'.",
			whyWrong: "Galt hvis svaret handler om 'produksjon' eller 'forbruk'. Poenget er at ting holdes i omløp, ikke at man produserer mer."
		},
		{
			id: 111,
			type: "multi",
			title: "Scope 1, 2 og 3",
			points: 1,
			prompt: "Marker riktige tilordninger av Scope-kategorier.",
			source: "Fasit: Forelesning 15, slide 'Scope 1, 2 and 3'.",
			options: [
				{ text: "Scope 1: direkte utslipp fra kilder eid eller kontrollert av selskapet", correct: true, why: "Riktig: dette er definisjonen av Scope 1." },
				{ text: "Scope 2: indirekte utslipp fra innkjøpt elektrisitet, damp, varme og kjøling", correct: true, why: "Riktig: dette er definisjonen av Scope 2." },
				{ text: "Scope 3: alle andre utslipp knyttet til selskapets aktiviteter", correct: true, why: "Riktig: Scope 3 dekker hele verdikjeden." },
				{ text: "Scope 2: direkte utslipp fra selskapets egne fabrikker", correct: false, why: "Galt: egne fabrikker er Scope 1. Scope 2 handler om innkjøpt energi." }
			]
		},
		{
			id: 112,
			type: "single",
			title: "Twin transitions",
			points: 1,
			prompt: "Hva menes med 'twin transitions'?",
			source: "Fasit: Forelesning 15, slide 'Twin transitions / tvilling-transformasjon'.",
			options: [
				{ text: "Sammenkobling av digital transformasjon og bærekraftstransisjon", correct: true, why: "Riktig: twin transitions kobler digital transformation og sustainability transition." },
				{ text: "Overgang fra prosjekt til produktteam, og fra waterfall til agile", correct: false, why: "Galt: dette er en organisatorisk endring, ikke twin transitions." },
				{ text: "Overgang fra Scope 1 til Scope 3 rapportering", correct: false, why: "Galt: dette handler om rapporteringsomfang, ikke begrepet twin transitions." },
				{ text: "Overgang fra business monarchy til anarchy", correct: false, why: "Galt: dette er governance-arketyper, ikke twin transitions." }
			]
		},
		{
			id: 113,
			type: "single",
			title: "Double Diamond",
			points: 1,
			prompt: "Hva er de fire fasene i Double Diamond-modellen?",
			source: "Fasit: Forelesning 3–4, Design thinking, CIO toolbox model.",
			options: [
				{ text: "Plan → Build → Test → Deploy", correct: false, why: "Galt: dette ligner mer på en tradisjonell systemutviklingslivssyklus." },
				{ text: "Discover → Define → Develop → Deliver", correct: true, why: "Riktig: dette er de fire fasene i Double Diamond." },
				{ text: "Analyze → Design → Implement → Evaluate", correct: false, why: "Galt: dette er en generisk prosessbeskrivelse, ikke Double Diamond." },
				{ text: "Sprint Planning → Daily Standup → Review → Retrospective", correct: false, why: "Galt: dette er Scrum-seremonier, ikke Double Diamond." }
			]
		},
		{
			id: 114,
			type: "fill",
			title: "Triple constraint",
			points: 1,
			prompt: "Prosjekter der scope, tid og ________ alle er fastlåst, er særlig sårbare for skuffelse.",
			answers: ["kostnad", "cost", "kost", "budsjett"],
			answerKey: "kostnad / cost",
			source: "Fasit: Forelesning 4, slide 'The triple constraint': 'Projects with fixed cost, scope and time are particularly vulnerable to disappointment.'",
			whyCorrect: "Riktig fordi triple constraint består av scope, time og cost. Alle tre fastlåst = høy risiko.",
			whyWrong: "Galt hvis svaret peker på kvalitet, risiko eller ressurser. Modellen i forelesningen bruker eksplisitt scope, time og cost."
		},
		{
			id: 115,
			type: "single",
			title: "TOGAF architecture taxonomy",
			points: 1,
			prompt: "Hvilket TOGAF-arkitekturlag beskriver strukturen av en organisasjons logiske og fysiske data assets og data management resources?",
			source: "Fasit: Forelesning 5, slide 'Architecture taxonomy (according to TOGAF)'.",
			options: [
				{ text: "Business Architecture", correct: false, why: "Galt: business architecture definerer forretningsstrategi, governance, organisasjon og nøkkelprosesser." },
				{ text: "Data Architecture", correct: true, why: "Riktig: data architecture beskriver strukturen av logiske og fysiske data assets og data management resources." },
				{ text: "Application Architecture", correct: false, why: "Galt: application architecture gir en blueprint for applikasjoner og deres relasjoner til forretningsprosesser." },
				{ text: "Technology Architecture", correct: false, why: "Galt: technology architecture beskriver logisk software og hardware capabilities." }
			]
		},
		{
			id: 116,
			type: "multi",
			title: "Autonomy & Alignment i AF",
			points: 1,
			prompt: "Marker utsagn som passer med Accountability Framework-tankegangen.",
			source: "Fasit: Forelesning 11, slides 'AF promotes Autonomy AND alignment'.",
			options: [
				{ text: "Component owners, ikke prosjektledere — ansvarlige problemløsere", correct: true, why: "Riktig: AF erstatter prosjektleder-logikken med komponenteierskap." },
				{ text: "Metrics, ikke directives — datadrevet", correct: true, why: "Riktig: målstyring fremfor detaljstyring." },
				{ text: "Tillit, ikke kontroll", correct: true, why: "Riktig: trust, not control er eksplisitt fra forelesningen." },
				{ text: "Alle beslutninger bør sentraliseres hos én person for effektivitet", correct: false, why: "Galt: AF handler om å distribuere ansvar og gi autonomi innenfor alignment." }
			]
		},
		{
			id: 117,
			type: "single",
			title: "Risiko ved digital transformasjon",
			points: 1,
			prompt: "Ifølge D4D, hva er én av hovedrisikoene ved digital transformasjon?",
			source: "Fasit: Forelesning 13, slide 'Risks of digital transformation'.",
			options: [
				{ text: "At organisasjonen sprer ressurser over for mange byggeklosser uten reell fremdrift på noen av dem", correct: true, why: "Riktig: dette er risiko (1) i D4D-oppsummeringen." },
				{ text: "At organisasjonen har for god Operational Backbone", correct: false, why: "Galt: en sterk OB er en fordel, ikke en risiko." },
				{ text: "At organisasjonen bruker for mange agile team", correct: false, why: "Galt: dette er ikke en av de to navngitte risikoene i D4D." },
				{ text: "At organisasjonen har for tydelig digital visjon", correct: false, why: "Galt: tydelig visjon anbefales som positivt i D4D." }
			]
		},
		{
			id: 118,
			type: "fill",
			title: "Operational effectiveness",
			points: 1,
			prompt: "Operational effectiveness er nødvendig, men ikke ________ for å oppnå varig konkurransefortrinn.",
			answers: ["tilstrekkelig", "sufficient", "nok"],
			answerKey: "tilstrekkelig / sufficient",
			source: "Fasit: Forelesning 2, slide 16: 'Operational effectiveness is necessary, but not sufficient to achieve sustainable competitive advantage.'",
			whyCorrect: "Riktig fordi Porter-forelesningen sier at OE er nødvendig men ikke tilstrekkelig — strategi krever trade-offs og unik posisjonering.",
			whyWrong: "Galt hvis svaret antyder at OE er helt unødvendig eller at OE alene er strategi."
		},
		{
			id: 119,
			type: "single",
			title: "Digital platform components",
			points: 1,
			prompt: "Hvilken type komponent i Digital Platform gir tilgang til data fra ulike kilder gjennom API-er?",
			source: "Fasit: Forelesning 10, slide 'Digital platform'.",
			options: [
				{ text: "Infrastructure components", correct: false, why: "Galt: infrastructure components er core services som autentisering og tilgangskontroll." },
				{ text: "Data components", correct: true, why: "Riktig: data components gir data fra ulike kilder og tilgang til dem gjennom API-er." },
				{ text: "Business components", correct: false, why: "Galt: business components er dashboards, kundevarsler og lignende." },
				{ text: "Cloud services", correct: false, why: "Galt: cloud services handler om hosting og performance management." }
			]
		},
		{
			id: 120,
			type: "multi",
			title: "Digital roadmap-rekkefølge",
			points: 1,
			prompt: "Marker utsagn som stemmer med D4D sin anbefalte rekkefølge for digital transformasjon.",
			source: "Fasit: Forelesning 13, D4D summary, slides om digital roadmap.",
			options: [
				{ text: "Fix backbone først", correct: true, why: "Riktig: OB er fundamentet som må være på plass." },
				{ text: "Ikke utsett Digital Platform for lenge — koble modulene", correct: true, why: "Riktig: DP bør komme tidlig etter OB." },
				{ text: "Ikke skynd deg med External Developer Platform", correct: true, why: "Riktig: ExDP krever modne interne kapabiliteter først." },
				{ text: "Start med ExDP før du har en operasjonell ryggrad", correct: false, why: "Galt: roadmapen sier eksplisitt 'don't rush into an ExDP' — OB og DP må komme først." }
			]
		},
		{
			id: 121,
			type: "single",
			title: "Boundary resources",
			points: 1,
			prompt: "Hva er boundary resources i konteksten av External Developer Platform?",
			source: "Fasit: Forelesning 12, External Development Platform.",
			options: [
				{ text: "Interne HR-dokumenter som deles med partnere", correct: false, why: "Galt: boundary resources er tekniske grensesnitt, ikke HR-dokumenter." },
				{ text: "API-er, dokumentasjon og verktøy som lar eksterne bygge på plattformen", correct: true, why: "Riktig: boundary resources gir strukturert tilgang til kjernekomponenter for eksterne parter." },
				{ text: "Fysiske kontorer der partnere kan jobbe", correct: false, why: "Galt: boundary resources er digitale, ikke fysiske." },
				{ text: "Prosjektplaner som deles med underleverandører", correct: false, why: "Galt: dette er prosjektdokumentasjon, ikke plattform-boundary resources." }
			]
		},
		{
			id: 122,
			type: "single",
			title: "Double materiality",
			points: 1,
			prompt: "Hva betyr 'double materiality' i bærekraftsrapportering?",
			source: "Fasit: Forelesning 15, slide 'Double materiality (dobbel vesentlighet)'.",
			options: [
				{ text: "At organisasjonen må rapportere både inntekter og utgifter", correct: false, why: "Galt: det er vanlig finansiell rapportering, ikke double materiality." },
				{ text: "At rapporteringen må se både hvordan virksomheten påvirker omverdenen, og hvordan bærekraft påvirker virksomheten", correct: true, why: "Riktig: dette er kjernen i double materiality — påvirkning begge veier." },
				{ text: "At man må bruke to ulike regnskapsstandarder", correct: false, why: "Galt: double materiality handler om perspektiv, ikke regnskapsstandarder." },
				{ text: "At bærekraft kun gjelder fysiske materialer", correct: false, why: "Galt: materiality i denne konteksten betyr vesentlighet, ikke fysiske materialer." }
			]
		},
		{
			id: 123,
			type: "fill",
			title: "Cynefin chaotic",
			points: 1,
			prompt: "I Cynefin-rammeverket krever en kaotisk situasjon typisk ________ handling for å komme til en mer stabil tilstand.",
			answers: ["umiddelbar", "immediate", "rask", "øyeblikkelig"],
			answerKey: "umiddelbar / immediate",
			source: "Fasit: Forelesning 4, slide om Cynefin: 'In a chaotic situation, there is typically an emergency which requires immediate action to move into a more stable state.'",
			whyCorrect: "Riktig fordi chaotic-domenet kjennetegnes av nødsituasjoner der man må handle umiddelbart.",
			whyWrong: "Galt hvis svaret handler om 'analyse' eller 'eksperimentering'. I kaos er det for sent for grundig analyse — man må stabilisere først."
		},
		{
			id: 124,
			type: "multi",
			title: "Hva OB gjør",
			points: 1,
			prompt: "Marker funksjoner som tilhører Operational Backbone.",
			source: "Fasit: Forelesning 9, Operational Backbone, og IN5431-oppsummeringen.",
			options: [
				{ text: "Support seamless end-to-end transaction processing", correct: true, why: "Riktig: dette er en kjernefunksjon i OB." },
				{ text: "Provide reliable and accessible master data", correct: true, why: "Riktig: pålitelige kjernedata er sentralt." },
				{ text: "Automate repetitive processes", correct: true, why: "Riktig: automatisering av repetitivt arbeid er en OB-funksjon." },
				{ text: "Erstatte all manuell beslutningstaking med AI", correct: false, why: "Galt: OB handler om standardisering og integrasjon, ikke om å fjerne all menneskelig vurdering." }
			]
		},
		{
			id: 125,
			type: "single",
			title: "Management fashion",
			points: 1,
			prompt: "Hva menes med 'management fashion' i forelesningen?",
			source: "Fasit: Forelesning 4 / CIO toolbox model / IN5431-oppsummeringen.",
			options: [
				{ text: "Et rammeverk som har nådd en kritisk masse og blitt et intersubjektivt fenomen", correct: true, why: "Riktig: management fashion betyr at et rammeverk har blitt populært nok til å bli en 'mote' i organisasjoner." },
				{ text: "Et rammeverk som er vitenskapelig bevist som det beste for alle kontekster", correct: false, why: "Galt: forelesningen understreker at rammeverk er kontekstavhengige og noen ganger omdiskuterte." },
				{ text: "En metode for å designe klær i IT-bransjen", correct: false, why: "Galt: fashion brukes her om popularitet/spredning av ledelsesideer, ikke klesmote." },
				{ text: "Et synonym for IT governance", correct: false, why: "Galt: management fashion og IT governance er helt ulike begreper." }
			]
		}
	]};