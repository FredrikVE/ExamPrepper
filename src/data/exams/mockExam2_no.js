//src/data/exams/mockExam2_no.js
export const mockExam2_no = {
	id: "mock-exam-2-no",
	baseId: "mock-exam-2",
	lang: "no",
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
				{
					text: "Diversification",
					correct: false,
					why: "Galt: diversification har lav integrasjon OG lav standardisering. Her er integrasjonen høy.",
					whyExtended: [
						"Diversification beskrives i Figure A1.1 som 'Independent business units with different customers and expertise' — altså lav integrasjon og lav standardisering.",
						"Spørsmålet spesifiserer at enhetene trenger å kjenne hverandres transaksjoner, som betyr høy integrasjon — det utelukker diversification.",
						"Diversification passer for konglomerater der forretningsenhetene opererer i helt ulike markeder uten behov for datadeling.",
						"De fire operating models plasseres i en 2×2-matrise: integrasjon (høy/lav) × standardisering (høy/lav)."
					]
				},
				{
					text: "Coordination",
					correct: true,
					why: "Riktig: coordination = høy integrasjon, lav standardisering. Unike enheter som deler data.",
					whyExtended: [
						"Figure A1.1 beskriver Coordination som 'Unique business units with a need to know each other's transactions' — høy integrasjon, lav standardisering.",
						"Forelesning 5 definerer operating model som 'the desired level of business process integration and standardization for delivering goods and services to customers'.",
						"Coordination passer når enheter har ulike prosesser men trenger felles tilgang til data — f.eks. et sykehus der avdelinger har ulike prosedyrer men må dele pasientinformasjon.",
						"CIO toolbox-modellen plasserer operating model som en 'strategic bridge' under IT Architecture-verktøyet."
					]
				},
				{
					text: "Unification",
					correct: false,
					why: "Galt: unification har høy standardisering i tillegg til høy integrasjon.",
					whyExtended: [
						"Unification beskrives som 'Single business with global process standards and global data access' — høy integrasjon OG høy standardisering.",
						"Spørsmålet sier at enhetene IKKE standardiserer prosessene, som utelukker unification.",
						"Unification passer for organisasjoner der alle enheter utfører samme type prosesser og deler data — f.eks. en global bank med standardiserte prosedyrer.",
						"Forskjellen mellom coordination og unification er nettopp standardiseringsdimensjonen: coordination har lav, unification har høy."
					]
				},
				{
					text: "Replication",
					correct: false,
					why: "Galt: replication har høy standardisering men lav integrasjon.",
					whyExtended: [
						"Replication beskrives som 'Independent but similar business units sharing best practices' — lav integrasjon, høy standardisering.",
						"Spørsmålet krever høy integrasjon (enhetene må kjenne hverandres transaksjoner), som utelukker replication.",
						"Replication passer for kjeder der hver enhet opererer uavhengig men med standardiserte prosesser — f.eks. en franchise-kjede.",
						"Replication og coordination er motsetninger: replication har høy standardisering + lav integrasjon, coordination har lav standardisering + høy integrasjon."
					]
				}
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
				{
					text: "Coordination",
					correct: false,
					why: "Galt: coordination krever at enhetene deler data/transaksjoner (høy integrasjon).",
					whyExtended: [
						"Coordination har høy integrasjon — enhetene trenger å kjenne hverandres transaksjoner og dele data.",
						"Spørsmålet beskriver uavhengige enheter, som betyr lav integrasjon — det utelukker coordination.",
						"Coordination passer når enheter er unike men må koordinere seg gjennom delt data, ikke når de opererer uavhengig."
					]
				},
				{
					text: "Unification",
					correct: false,
					why: "Galt: unification krever også høy integrasjon mellom enhetene.",
					whyExtended: [
						"Unification har både høy integrasjon og høy standardisering — det er den mest integrerte modellen.",
						"Spørsmålet beskriver uavhengige enheter, som betyr lav integrasjon — unification krever det motsatte.",
						"Unification passer for organisasjoner som opererer som én samlet virksomhet med globale prosesser og delt data."
					]
				},
				{
					text: "Replication",
					correct: true,
					why: "Riktig: lav integrasjon, høy standardisering — like prosesser, men enhetene opererer uavhengig.",
					whyExtended: [
						"Figure A1.1 beskriver Replication som 'Independent but similar business units sharing best practices' — lav integrasjon, høy standardisering.",
						"Enhetene er uavhengige (lav integrasjon) men standardiserer prosessene sine (høy standardisering) ved å dele beste praksis.",
						"Replication passer for kjeder og franchise-operasjoner der hver enhet kjører like prosesser men ikke trenger å dele data på tvers.",
						"Forelesning 5 viser at operating model er en 'strategic bridge' — den kobler forretningsstrategi til IT-arkitekturbeslutninger."
					]
				},
				{
					text: "Diversification",
					correct: false,
					why: "Galt: diversification har lav standardisering, altså ulike prosesser.",
					whyExtended: [
						"Diversification har lav integrasjon OG lav standardisering — enhetene er uavhengige og har ulike prosesser.",
						"Spørsmålet beskriver like enheter som deler beste praksis, noe som innebærer høy standardisering — det utelukker diversification.",
						"Diversification passer for konglomerater med helt ulike forretningsområder og ingen behov for verken datadeling eller prosessstandardisering."
					]
				}
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
			source: "Fasit: Forelesning 14, slide 'What is a digital transformation'.",
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
				{
					text: "En digital visjon — utfordrende og inspirerende",
					correct: true,
					why: "Riktig: digital vision er første element.",
					whyExtended: [
						"Forelesning 14 beskriver digital transformation som en prosess som inkluderer 'Digital vision & strategy' som et nøkkelelement.",
						"D4D-roadmapen anbefaler å 'communicate the vision and the journey — be transparent' — visjonen gir retning for hele transformasjonen.",
						"En digital visjon skal være utfordrende og inspirerende nok til å motivere organisasjonen til endring."
					]
				},
				{
					text: "En portefølje av digitale initiativer",
					correct: true,
					why: "Riktig: prioritering av digitale prosjekter/initiativer.",
					whyExtended: [
						"Forelesning 14 lister 'Digitalization projects' som en del av digital transformation-prosessen.",
						"En portefølje av initiativer kobler visjonen til konkrete handlinger — det handler om prioritering av hva som skal gjøres.",
						"D4D-oppsummeringen sier 'assess building blocks to adapt to changes' og 'roadmap the journey' — begge forutsetter en portefølje av initiativer."
					]
				},
				{
					text: "Et veikart (roadmap)",
					correct: true,
					why: "Riktig: roadmap er planleggingsverktøy for gjennomføring.",
					whyExtended: [
						"D4D-oppsummeringen sier eksplisitt: 'roadmap the journey — have something to build on'.",
						"Et veikart kobler digital strategi til konkret gjennomføring med tidslinje og milepæler.",
						"Forelesning 2 om strategi understreker at en action plan trenger 'expected ordering and timeframe for executing the activities aka roadmap'."
					]
				},
				{
					text: "En definisjon av ansvar",
					correct: true,
					why: "Riktig: avklaring av hvem som eier og følger opp.",
					whyExtended: [
						"D4D-oppsummeringen sier: 'establish ownership for each building block — leadership and autonomy'.",
						"Forelesning 14 nevner 'Chief digital officer and/or a digital unit' som del av digital transformation-prosessen.",
						"Accountability Framework som D4D-byggekloss handler nettopp om 'distribution of responsibilities for digital offerings and components'."
					]
				},
				{
					text: "En komplett BPMN-modell av alle prosesser",
					correct: false,
					why: "Galt: BPMN er et prosessmodelleringsverktøy, ikke en del av digital strategi-definisjonen.",
					whyExtended: [
						"BPMN (Business Process Model and Notation) er en modelleringsteknikk som hører til IT Architecture-verktøyet i CIO toolbox.",
						"Digital strategi handler om visjon, initiativer, roadmap og ansvar — ikke om detaljert prosessmodellering av alle prosesser.",
						"En komplett BPMN-modell av alle prosesser ville vært en enterprise architecture-øvelse, ikke en digital strategi.",
						"Forelesning 14 definerer digital strategy som 'an organizational strategy formulated and executed by leveraging digital resources to create differential value' — det handler om retning, ikke prosessdiagrammer."
					]
				}
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
				{
					text: "IT governance handler om å ta IT-beslutninger; management handler om å implementere dem.",
					correct: false,
					why: "Galt: governance handler IKKE om å ta beslutninger. Det gjør management.",
					whyExtended: [
						"Forelesning 11 sier eksplisitt: 'IT governance is not about making IT decisions — management does that.'",
						"Governance handler om hvem som systematisk tar og bidrar til beslutninger, ikke om å ta beslutningene selv.",
						"Å forveksle governance med beslutningstaking er en vanlig misforståelse som kurset adresserer direkte.",
						"Weill & Ross (2004) definerer governance som å 'specifying the decision rights and accountability framework to encourage desirable behaviour in using IT'."
					]
				},
				{
					text: "IT governance bestemmer hvem som systematisk tar og bidrar til IT-beslutninger; management tar og gjennomfører beslutningene.",
					correct: true,
					why: "Riktig: 'IT governance is not about making IT decisions — management does that — but rather determines who systematically makes and contributes to those decisions.'",
					whyExtended: [
						"Forelesning 11 siterer Weill & Ross (2004): 'IT governance is not about making IT decisions — management does that — but rather determines who systematically makes and contributes to those decisions.'",
						"Governance definerer strukturen og reglene — hvem bestemmer hva, med hvilken myndighet, og hvem er ansvarlig for resultater.",
						"Management opererer innenfor denne strukturen og tar de faktiske beslutningene og gjennomfører dem.",
						"Denne distinksjonen er sentral fordi den viser at governance er et meta-nivå: det handler om å designe beslutningssystemet, ikke om enkeltbeslutninger."
					]
				},
				{
					text: "Det er ingen forskjell; begrepene brukes om hverandre.",
					correct: false,
					why: "Galt: kurset skiller dem tydelig.",
					whyExtended: [
						"Forelesning 11 bruker eksplisitt tid på å skille governance fra management — de er definitivt ulike begreper.",
						"Governance handler om å sette opp strukturen for beslutninger, management handler om å ta og gjennomføre beslutningene.",
						"CIO toolbox-modellen har IT governance som et eget verktøy (verktøy 7) med egen purpose og egne metoder.",
						"Å bruke begrepene om hverandre ville skape forvirring om hvem som har ansvar for hva."
					]
				},
				{
					text: "Governance er kun for private bedrifter; management er kun for offentlig sektor.",
					correct: false,
					why: "Galt: begge gjelder alle typer organisasjoner.",
					whyExtended: [
						"Forelesning 2 viser at strategi og governance gjelder for alle typer organisasjoner: private kommersielle, private ideelle og offentlige.",
						"IT governance handler om beslutningsrettigheter og accountability uavhengig av organisasjonstype.",
						"Forelesning 6 diskuterer også governance i offentlig sektor, inkludert 'Government as a platform' — governance er relevant overalt.",
						"Weill & Ross' governance-rammeverk er utviklet for bruk i alle organisasjonstyper."
					]
				}
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
				{
					text: "Federal inkluderer C-level og alle operating groups sammen med IT; Duopoly er IT-ledere pluss en gruppe forretningsledere.",
					correct: true,
					why: "Riktig: Federal er bredere (alle representanter + IT), mens Duopoly er en to-parts-tilnærming (IT executives + business leaders).",
					whyExtended: [
						"Forelesning 6 definerer Federal som: 'C-level executives and business representatives of all the operating groups collaborate with the IT department.'",
						"IT Duopoly defineres som: 'a two-party decision-making approach involves IT executives and a group of business leaders representing the operating units.'",
						"Forskjellen er bredden av involvering: Federal inkluderer alle nivåer (C-level + alle operating groups + IT), mens Duopoly er en smalere to-parts-tilnærming.",
						"Federal ligner et føderalt styresett der sentralmakt og delstater samarbeider — Duopoly er mer en bilateral forhandling mellom IT og forretning."
					]
				},
				{
					text: "De er identiske — begge betyr at IT alene bestemmer.",
					correct: false,
					why: "Galt: det ville vært IT Monarchy.",
					whyExtended: [
						"IT Monarchy er arketypen der 'decisions are made by an individual IT executive or a group of IT executives' — altså at IT alene bestemmer.",
						"Både Federal og Duopoly involverer forretningssiden i beslutningsprosessen — de er samarbeidsmodeller, ikke IT-enerett.",
						"De seks arketypene er nettopp ment å vise spekteret av hvem som involveres — det ville vært meningsløst å ha to identiske arketyper."
					]
				},
				{
					text: "Federal betyr at hver enhet bestemmer for seg; Duopoly betyr at brukerne bestemmer.",
					correct: false,
					why: "Galt: dette beskriver henholdsvis Feudal og Anarchy.",
					whyExtended: [
						"Feudal system er arketypen der 'business unit or process leaders make separate decisions on the basis of the unit or process needs'.",
						"Anarchy er arketypen der 'each individual user or small group pursues his, her or their own IT agenda'.",
						"Federal handler om samarbeid mellom nivåer, ikke om at enheter bestemmer isolert.",
						"Duopoly handler om IT + forretningsledere sammen, ikke om at sluttbrukere bestemmer."
					]
				},
				{
					text: "Federal gjelder bare IT-infrastruktur; Duopoly gjelder bare IT-prinsipper.",
					correct: false,
					why: "Galt: arketypene kan anvendes på alle fem beslutningsdomener i styringsmatrisen.",
					whyExtended: [
						"Styringsmatrisen kobler arketyper med fem beslutningsdomener: IT principles, IT architecture, IT infrastructure, business application needs og IT investment.",
						"Enhver arketype kan i prinsippet brukes for ethvert domene — det er hele poenget med matrisen.",
						"En organisasjon kan bruke Federal for IT-prinsipper og IT Monarchy for IT-infrastruktur — det er kontekstavhengig.",
						"Weill & Ross (2005) publiserte nettopp denne matrise-tilnærmingen i MIT Sloan Management Review."
					]
				}
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
				{
					text: "IT principles",
					correct: true,
					why: "Riktig: ett av de fem domenene.",
					whyExtended: [
						"IT principles handler om å oversette forretningsbehov til IT-rolle, ønsket atferd og finansieringsmodell.",
						"Kursoppsummeringen lister: 'how to translate from business; role of IT in business; desirable behaviors; funding'.",
						"IT principles er det mest overordnede domenet — det setter rammene for de andre domenene."
					]
				},
				{
					text: "IT architecture",
					correct: true,
					why: "Riktig: ett av de fem domenene.",
					whyExtended: [
						"IT architecture handler om kjerneprosesser, dataintegrasjon, teknologistandardisering og teknologivalg.",
						"Kursoppsummeringen lister: 'core business process + relates; what data + how integration; tech capability standardization'.",
						"IT architecture-domenet kobler til IT Architecture-verktøyet (verktøy 4) i CIO toolbox."
					]
				},
				{
					text: "IT infrastructure strategies",
					correct: true,
					why: "Riktig: ett av de fem domenene.",
					whyExtended: [
						"IT infrastructure strategies handler om kritiske tjenester, enterprise-wide implementering, service-nivåer, prising og outsourcing.",
						"Kursoppsummeringen lister: 'critical services to achieve strategic goals; what should be implemented enterprisewide; pricing; what services should be outsourced'.",
						"Infrastruktur-domenet er ofte et av de mest sentraliserte — det styres gjerne av IT Monarchy."
					]
				},
				{
					text: "Business application needs",
					correct: true,
					why: "Riktig: ett av de fem domenene.",
					whyExtended: [
						"Business application needs handler om markedsmuligheter, strategiske eksperimenter og arkitekturstandarder.",
						"Kursoppsummeringen lister: 'market and business process opportunities; strategic experiments design; how to address within architectural standards'.",
						"Dette domenet er ofte mer desentralisert fordi forretningsenheter har best kjennskap til sine egne behov."
					]
				},
				{
					text: "IT investment and prioritization",
					correct: true,
					why: "Riktig: ett av de fem domenene.",
					whyExtended: [
						"IT investment handler om prioritering av prosessendringer, porteføljefordeling og business value av IT-prosjekter.",
						"Kursoppsummeringen lister: 'most important process changes; distribution in the current IT portfolio; business value of IT projects'.",
						"Dette domenet kobler direkte til business case-verktøyet (verktøy 1) i CIO toolbox."
					]
				},
				{
					text: "IT marketing and branding",
					correct: false,
					why: "Galt: markedsføring er ikke et IT governance-domene i Weill & Ross-rammeverket.",
					whyExtended: [
						"De fem beslutningsdomenene i Weill & Ross er: IT principles, IT architecture, IT infrastructure strategies, business application needs og IT investment.",
						"Markedsføring og branding er forretningsfunksjoner som ikke inngår i IT governance-rammeverket.",
						"Styringsmatrisen i forelesning 6 viser eksplisitt de fem domenene — IT marketing er ikke blant dem.",
						"IT governance handler om beslutningsrettigheter for IT-relaterte spørsmål, ikke om merkevarebygging."
					]
				}
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
				{
					text: "Business Transformation",
					correct: false,
					why: "Galt: business transformation handler om new value creation through digital value propositions.",
					whyExtended: [
						"Forelesning 13 definerer Business Transformation som 'new value creation through digital value propositions'.",
						"Business transformation handler om å skape ny verdi gjennom digitale verdiforslag — det er resultat-orientert.",
						"SCI og AF er governance-mekanismer, ikke direkte verdiskapning — de tilhører governance transformation."
					]
				},
				{
					text: "Architecture Transformation",
					correct: false,
					why: "Galt: architecture transformation dekker OB, DP og digital offerings.",
					whyExtended: [
						"Forelesning 13 plasserer Operational Backbone, Digital Platform og Digital Offerings under Architecture Transformation.",
						"Architecture transformation handler om de tekniske og arkitektoniske kapabilitetene — systemer, plattformer og komponenter.",
						"SCI og AF er organisatoriske/governance-kapabiliteter, ikke arkitekturkomponenter."
					]
				},
				{
					text: "Governance Transformation",
					correct: true,
					why: "Riktig: governance transformation inkluderer shared customer insight og accountability framework.",
					whyExtended: [
						"Forelesning 13 sin transformasjonsteori plasserer eksplisitt Shared Customer Insight og Accountability Framework under Governance Transformation.",
						"Governance transformation handler om hvordan organisasjonen styrer og koordinerer sine digitale satsinger — hvem bestemmer hva, og hvordan deles innsikt.",
						"SCI handler om felles organisatorisk læring om kundebehov, AF handler om fordeling av ansvar — begge er governance-mekanismer.",
						"D4D sin dual transformation skiller mellom architecture (OB, DP) og governance (SCI, AF) — dette er et sentralt organiseringsprinsipp i boken."
					]
				},
				{
					text: "Cultural Transformation",
					correct: false,
					why: "Galt: cultural transformation er ikke en av de tre navngitte transformasjonene i D4D-modellen.",
					whyExtended: [
						"D4D sin transformasjonsteori navngir tre typer: Business Transformation, Architecture Transformation og Governance Transformation.",
						"Kultur er viktig for digital transformasjon, men D4D-modellen har ikke 'Cultural Transformation' som en separat kategori.",
						"Kulturendring adresseres indirekte gjennom AF (trust, not control; experiments, not major launches) og organisatorisk læring i SCI.",
						"Kursoppsummeringen sier at digital business design er 'NOT an endstate' og handler om 'habit change then culture change' — men dette er ikke en navngitt transformasjonstype."
					]
				}
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
			source: "Fasit: Forelesning 15, slide 'The circular economy'.",
			whyCorrect: "Riktig fordi sirkulasjon/circulation er kjernen i circular economy-definisjonen.",
			whyWrong: "Galt hvis svaret handler om 'produksjon' eller 'forbruk'. Poenget er at ting holdes i omløp."
		},
		{
			id: 111,
			type: "multi",
			title: "Scope 1, 2 og 3",
			points: 1,
			prompt: "Marker riktige tilordninger av Scope-kategorier.",
			source: "Fasit: Forelesning 15, slide 'Scope 1, 2 and 3'.",
			options: [
				{
					text: "Scope 1: direkte utslipp fra kilder eid eller kontrollert av selskapet",
					correct: true,
					why: "Riktig: dette er definisjonen av Scope 1.",
					whyExtended: [
						"Forelesning 15 definerer Scope 1 som 'direct emissions from sources owned or controlled by a company'.",
						"Scope 1 inkluderer utslipp fra selskapets egne fasiliteter, kjøretøy og prosesser.",
						"Dette er de utslippene selskapet har mest direkte kontroll over og kan redusere gjennom egne tiltak."
					]
				},
				{
					text: "Scope 2: indirekte utslipp fra innkjøpt elektrisitet, damp, varme og kjøling",
					correct: true,
					why: "Riktig: dette er definisjonen av Scope 2.",
					whyExtended: [
						"Forelesning 15 definerer Scope 2 som 'indirect emissions from purchased electricity, steam, heat, and cooling'.",
						"Scope 2 er indirekte fordi utslippene skjer hos energileverandøren, men de er forårsaket av selskapets energiforbruk.",
						"Selskapet kan påvirke Scope 2 gjennom valg av energileverandør og energieffektivisering."
					]
				},
				{
					text: "Scope 3: alle andre utslipp knyttet til selskapets aktiviteter",
					correct: true,
					why: "Riktig: Scope 3 dekker hele verdikjeden.",
					whyExtended: [
						"Forelesning 15 definerer Scope 3 som 'all other emissions associated with a company's activities'.",
						"Scope 3 dekker hele verdikjeden — både upstream (leverandører, innkjøp, transport) og downstream (bruk av produkter, avfallshåndtering).",
						"Scope 3 er typisk den største utslippskategorien for de fleste selskaper, men også den vanskeligste å måle og kontrollere."
					]
				},
				{
					text: "Scope 2: direkte utslipp fra selskapets egne fabrikker",
					correct: false,
					why: "Galt: egne fabrikker er Scope 1. Scope 2 handler om innkjøpt energi.",
					whyExtended: [
						"Direkte utslipp fra egne fabrikker er Scope 1 — 'direct emissions from sources owned or controlled by a company'.",
						"Scope 2 handler spesifikt om indirekte utslipp fra innkjøpt energi (elektrisitet, damp, varme, kjøling).",
						"Forskjellen er at Scope 1 = utslipp som skjer fysisk på selskapets egne anlegg, Scope 2 = utslipp som skjer hos energileverandøren på grunn av selskapets energiforbruk.",
						"Å forveksle Scope 1 og 2 er en vanlig feil — husk at '1' = direkte/eget, '2' = indirekte/innkjøpt energi."
					]
				}
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
				{
					text: "Sammenkobling av digital transformasjon og bærekraftstransisjon",
					correct: true,
					why: "Riktig: twin transitions kobler digital transformation og sustainability transition.",
					whyExtended: [
						"Forelesning 15 presenterer twin transitions som sammenkoblingen av Digital Transformation og Sustainability Transition.",
						"'The sweet spot' er der digital teknologi forsterker bærekraft — 'Greening OF and BY IT & Data'.",
						"Forelesningen siterer forskning: 'It is unclear whether the increased electricity and rare material use due to digitalization will be compensated by efficiency gains and sustainable behaviors fostered by digital innovations.'",
						"Twin transitions-perspektivet er sentralt fordi det viser at digital transformasjon og bærekraft ikke kan ses isolert — de påvirker hverandre."
					]
				},
				{
					text: "Overgang fra prosjekt til produktteam, og fra waterfall til agile",
					correct: false,
					why: "Galt: dette er en organisatorisk endring, ikke twin transitions.",
					whyExtended: [
						"Overgangen fra prosjekt til produktteam og fra waterfall til agile er organisatoriske endringer innen IT management, ikke twin transitions.",
						"Disse endringene diskuteres i forelesning 4 under CIO toolbox (verktøy 5 og 6), ikke i bærekraftsforelesningen.",
						"Twin transitions handler om samspillet mellom digitalisering og bærekraft på et overordnet samfunnsnivå."
					]
				},
				{
					text: "Overgang fra Scope 1 til Scope 3 rapportering",
					correct: false,
					why: "Galt: dette handler om rapporteringsomfang, ikke begrepet twin transitions.",
					whyExtended: [
						"Scope 1, 2 og 3 er kategorier innen bærekraftsrapportering — de beskriver ulike utslippstyper, ikke en transformasjon.",
						"Twin transitions handler om to samtidige transformasjonsprosesser (digital + bærekraft), ikke om endring i rapporteringsomfang.",
						"Scope-kategoriene er verktøy for å måle utslipp, mens twin transitions er et konseptuelt rammeverk for to parallelle samfunnsendringer."
					]
				},
				{
					text: "Overgang fra business monarchy til anarchy",
					correct: false,
					why: "Galt: dette er governance-arketyper, ikke twin transitions.",
					whyExtended: [
						"Business monarchy og anarchy er to av seks governance-arketyper i Weill & Ross' rammeverk fra forelesning 6.",
						"En overgang mellom governance-arketyper handler om endring i beslutningsmyndighet, ikke om twin transitions.",
						"Twin transitions handler om digital transformasjon + bærekraftstransisjon — to makrotrender som påvirker samfunnet."
					]
				}
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
				{
					text: "Plan → Build → Test → Deploy",
					correct: false,
					why: "Galt: dette ligner mer på en tradisjonell systemutviklingslivssyklus.",
					whyExtended: [
						"Plan-Build-Test-Deploy er en lineær utviklingsmodell som minner om waterfall-tilnærmingen.",
						"Double Diamond er eksplorativt og iterativt — det handler om å først utforske problemet, deretter utforske løsningen.",
						"CIO toolbox-modellen plasserer design thinking under 'when the problem is unclear' — den forutsetter nettopp at man ikke kan planlegge lineært."
					]
				},
				{
					text: "Discover → Define → Develop → Deliver",
					correct: true,
					why: "Riktig: dette er de fire fasene i Double Diamond.",
					whyExtended: [
						"CIO toolbox-modellen lister Double Diamond under design thinking med fasene: 'Discover → Define → Develop → Deliver'.",
						"Den første diamanten (Discover → Define) handler om å forstå og definere problemet gjennom brukerinnsikt og utforskning.",
						"Den andre diamanten (Develop → Deliver) handler om å utvikle og levere løsningen gjennom prototyping og testing.",
						"Nøkkelpraksis inkluderer problem-reframing, user insight, co-design, prototyping og small-scale testing."
					]
				},
				{
					text: "Analyze → Design → Implement → Evaluate",
					correct: false,
					why: "Galt: dette er en generisk prosessbeskrivelse, ikke Double Diamond.",
					whyExtended: [
						"Analyze-Design-Implement-Evaluate er en generisk problemløsningsprosess som ikke fanger opp Double Diamonds unike struktur.",
						"Double Diamond sin styrke er den doble utvidelse-innsnevring-strukturen: først utforske bredt, så fokusere — to ganger.",
						"Den generiske alternative analysis-prosessen i CIO toolbox (verktøy 2) har tre steg: Understand → Synthesize → Evaluate — men det er heller ikke Double Diamond."
					]
				},
				{
					text: "Sprint Planning → Daily Standup → Review → Retrospective",
					correct: false,
					why: "Galt: dette er Scrum-seremonier, ikke Double Diamond.",
					whyExtended: [
						"Sprint Planning, Daily Standup, Review og Retrospective er seremonier i Scrum-rammeverket.",
						"Scrum er et agilt rammeverk som hører til verktøy 6 (Product teams and agile methods) i CIO toolbox.",
						"Double Diamond tilhører design thinking (verktøy 3 i CIO toolbox) og handler om utforskning av problemrom, ikke om sprint-basert utvikling.",
						"Design thinking og Scrum/agile utfyller hverandre: design thinking utforsker problemet, agile bygger løsningen iterativt."
					]
				}
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
			source: "Fasit: Forelesning 4, slide 'The triple constraint'.",
			whyCorrect: "Riktig fordi triple constraint består av scope, time og cost.",
			whyWrong: "Galt hvis svaret peker på kvalitet, risiko eller ressurser."
		},
		{
			id: 115,
			type: "single",
			title: "TOGAF architecture taxonomy",
			points: 1,
			prompt: "Hvilket TOGAF-arkitekturlag beskriver strukturen av en organisasjons logiske og fysiske data assets og data management resources?",
			source: "Fasit: Forelesning 5, slide 'Architecture taxonomy (according to TOGAF)'.",
			options: [
				{
					text: "Business Architecture",
					correct: false,
					why: "Galt: business architecture definerer forretningsstrategi, governance, organisasjon og nøkkelprosesser.",
					whyExtended: [
						"Forelesning 5 definerer Business Architecture som: 'defines the business strategy, governance, organization, and key business processes'.",
						"Business Architecture er det mest overordnede laget — det handler om forretningens struktur, ikke om data.",
						"I TOGAF sin ADM (Architecture Development Method) er Business Architecture steg B, mens Data/Application Architecture er steg C.",
						"Business Architecture setter konteksten som de andre arkitekturlagene må støtte."
					]
				},
				{
					text: "Data Architecture",
					correct: true,
					why: "Riktig: data architecture beskriver strukturen av logiske og fysiske data assets og data management resources.",
					whyExtended: [
						"Forelesning 5 definerer Data Architecture som: 'describes the structure of an organization's logical and physical data assets and data management resources'.",
						"Data Architecture handler om hvordan data er organisert, lagret, integrert og forvaltet i organisasjonen.",
						"I D4D-konteksten er data en sentral del av Operational Backbone — 'provide reliable and accessible master data' er en OB-funksjon.",
						"Data Architecture er også relevant for Digital Platform, der 'data components' gir API-tilgang til data fra ulike kilder."
					]
				},
				{
					text: "Application Architecture",
					correct: false,
					why: "Galt: application architecture gir en blueprint for applikasjoner og deres relasjoner til forretningsprosesser.",
					whyExtended: [
						"Forelesning 5 definerer Application Architecture som: 'provides a blueprint for the individual applications to be deployed, their interactions, and their relationships to the core business processes'.",
						"Application Architecture handler om applikasjonenes struktur og sammenheng, ikke om datastrukturer.",
						"I TOGAF sin ADM håndteres Application Architecture sammen med Data Architecture i steg C (Information Systems Architecture).",
						"Forskjellen: Data Architecture = datastrukturer og -forvaltning; Application Architecture = applikasjonslandskap og -relasjoner."
					]
				},
				{
					text: "Technology Architecture",
					correct: false,
					why: "Galt: technology architecture beskriver logisk software og hardware capabilities.",
					whyExtended: [
						"Forelesning 5 definerer Technology Architecture som: 'describes the logical software and hardware capabilities that are required to support the deployment of business, data, and application services'.",
						"Technology Architecture handler om infrastruktur, middleware, nettverk, kommunikasjon og standarder.",
						"Technology Architecture er det mest tekniske laget — det støtter de andre arkitekturlagene.",
						"I TOGAF sin ADM er Technology Architecture steg D — det bygger på de øvrige lagene."
					]
				}
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
				{
					text: "Component owners, ikke prosjektledere — ansvarlige problemløsere",
					correct: true,
					why: "Riktig: AF erstatter prosjektleder-logikken med komponenteierskap.",
					whyExtended: [
						"Forelesning 11 sier eksplisitt: 'Component owners not project managers — responsible problem solvers'.",
						"Dette skiftet er sentralt i AF: fra midlertidig prosjekteierskap til varig komponenteierskap.",
						"Komponenteiere har langvarig ansvar for sine komponenter — de kjenner dem best og er best posisjonert til å ta beslutninger.",
						"Kursoppsummeringen beskriver dette som 'tighter relation between decision making and decision impact'."
					]
				},
				{
					text: "Metrics, ikke directives — datadrevet",
					correct: true,
					why: "Riktig: målstyring fremfor detaljstyring.",
					whyExtended: [
						"Forelesning 11 sier: 'Metrics, not directives — data driven'.",
						"AF erstatter detaljstyring ovenfra med målbare resultater som teamene selv jobber mot.",
						"Forelesning 11 sin oppsummering av nøkkelmekanismer inkluderer 'missions — metrics that support enterprise goals'.",
						"Datadrevet styring gir teamene autonomi i hvordan de oppnår målene, mens alignment sikres gjennom felles målsetninger."
					]
				},
				{
					text: "Tillit, ikke kontroll",
					correct: true,
					why: "Riktig: trust, not control er eksplisitt fra forelesningen.",
					whyExtended: [
						"Forelesning 11 sier eksplisitt: 'Trust, not control'.",
						"Tillit er en forutsetning for autonomi — uten tillit kan man ikke gi team frihet til å ta egne beslutninger.",
						"AF-oppsummeringen sier: 'More coaching and less hierarchy' — dette forutsetter tillit.",
						"Kursoppsummeringen beskriver AF som 'enabling creativity while avoiding chaos' — tillit balanseres med alignment-mekanismer."
					]
				},
				{
					text: "Alle beslutninger bør sentraliseres hos én person for effektivitet",
					correct: false,
					why: "Galt: AF handler om å distribuere ansvar og gi autonomi innenfor alignment.",
					whyExtended: [
						"AF defineres som 'distribution of responsibilities for digital offerings and components that balances autonomy and alignment' — distribusjon, ikke sentralisering.",
						"Forelesning 11 sier at 'traditional hierarchical organization can generate business efficiencies, but does not foster innovativeness' — sentralisering hemmer innovasjon.",
						"AF promoterer 'fully resourced teams, not matrixed functions — autonomy' — autonomi for teamene er kjernen.",
						"Sentralisering hos én person ville undergrave AF-prinsippene om empowered teams, modular architecture og knowledge sharing."
					]
				}
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
				{
					text: "At organisasjonen sprer ressurser over for mange byggeklosser uten reell fremdrift på noen av dem",
					correct: true,
					why: "Riktig: dette er risiko (1) i D4D-oppsummeringen.",
					whyExtended: [
						"Kursoppsummeringen lister to risikoer ved digital transformasjon: '1. dividing resources across so many building blocks → may not make real progress'.",
						"Denne risikoen handler om at organisasjonen forsøker å gjøre alt samtidig og ender opp med å ikke gjøre noe ordentlig.",
						"D4D-roadmapen adresserer dette ved å anbefale en prioritert rekkefølge: fix backbone først, deretter DP, så AF, og ikke forhaste ExDP.",
						"Den andre risikoen er: '2. becoming too focused on the particular for too long → failing to develop the other' — altså den motsatte fellen."
					]
				},
				{
					text: "At organisasjonen har for god Operational Backbone",
					correct: false,
					why: "Galt: en sterk OB er en fordel, ikke en risiko.",
					whyExtended: [
						"En sterk OB er en forutsetning for digital suksess — forelesning 10 sier at 'An Operational Backbone is Not Enough for Digital Success', men det betyr ikke at den er en risiko.",
						"MIT CISR-forskningen viser at selskaper med effektiv OB er 2.5 ganger mer smidige — det er en fordel.",
						"D4D-roadmapen starter med 'fix the backbone' — en god OB er steg 1, ikke en risiko.",
						"44% av ledere identifiserer OB som den største hindringen — det er mangel på OB som er problemet, ikke overskudd."
					]
				},
				{
					text: "At organisasjonen bruker for mange agile team",
					correct: false,
					why: "Galt: dette er ikke en av de to navngitte risikoene i D4D.",
					whyExtended: [
						"D4D-oppsummeringen navngir to spesifikke risikoer: (1) spreding av ressurser over for mange byggeklosser, og (2) for mye fokus på én ting for lenge.",
						"Agile team er en del av verktøy 6 i CIO toolbox (Product teams and agile methods) og er en anbefalt tilnærming.",
						"AF promoterer nettopp autonome, fullt ressursbelagte team — det ville vært inkonsistent å kalle dette en risiko.",
						"Utfordringen er ikke antall agile team, men organisasjonens evne til å balansere autonomi og alignment."
					]
				},
				{
					text: "At organisasjonen har for tydelig digital visjon",
					correct: false,
					why: "Galt: tydelig visjon anbefales som positivt i D4D.",
					whyExtended: [
						"D4D-oppsummeringens to-do-liste sier: 'communicate the vision and the journey — be transparent' — visjon er et gode.",
						"Forelesning 14 beskriver digital transformation-prosessen som inkluderer 'Digital vision & strategy' som nøkkelelement.",
						"En tydelig visjon gir retning og motivasjon — det er fravær av visjon som er problematisk.",
						"D4D-oppsummeringen sier også 'choose metrics that inspire people' — inspirasjon og tydelighet er positivt."
					]
				}
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
			source: "Fasit: Forelesning 2, slide 16.",
			whyCorrect: "Riktig fordi Porter-forelesningen sier at OE er nødvendig men ikke tilstrekkelig.",
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
				{
					text: "Infrastructure components",
					correct: false,
					why: "Galt: infrastructure components er core services som autentisering og tilgangskontroll.",
					whyExtended: [
						"Infrastructure components handler om kjerne-tjenester som autentisering, tilgangskontroll og andre plattformtjenester.",
						"Forelesning 10 viser at Digital Platform har fire typer komponenter, og infrastructure components er bare én av dem.",
						"Infrastructure components gir den tekniske grunnmuren som de andre komponentene bygger på — men de gir ikke direkte datatilgang."
					]
				},
				{
					text: "Data components",
					correct: true,
					why: "Riktig: data components gir data fra ulike kilder og tilgang til dem gjennom API-er.",
					whyExtended: [
						"Forelesning 10 beskriver data components som komponenter som gir tilgang til data fra ulike kilder gjennom API-er.",
						"Data components er sentralt i DP fordi de muliggjør gjenbruk av data på tvers av digitale tilbud.",
						"I D4D-konteksten kobler data components til OB sin funksjon om å 'provide reliable and accessible master data' — DP eksponerer denne dataen.",
						"API-tilgang til data er en forutsetning for rask konfigurering av nye digitale tilbud."
					]
				},
				{
					text: "Business components",
					correct: false,
					why: "Galt: business components er dashboards, kundevarsler og lignende.",
					whyExtended: [
						"Business components er høyere-nivå komponenter som dashboards, kundevarsler og andre forretningsfunksjoner.",
						"Business components bruker data fra data components og infrastruktur fra infrastructure components — de er mer brukervendte.",
						"Forskjellen: data components = rå datatilgang via API; business components = ferdigpakkede forretningsfunksjoner."
					]
				},
				{
					text: "Cloud services",
					correct: false,
					why: "Galt: cloud services handler om hosting og performance management.",
					whyExtended: [
						"Cloud services handler om hosting, performance management og annen skyinfrastruktur.",
						"Cloud services gir den underliggende plattformen som de andre komponentene kjører på.",
						"Datatilgang gjennom API-er er spesifikt data components sin rolle, ikke cloud services."
					]
				}
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
				{
					text: "Fix backbone først",
					correct: true,
					why: "Riktig: OB er fundamentet som må være på plass.",
					whyExtended: [
						"D4D-roadmapen sier eksplisitt: 'fix backbone — you need to have a proper structure on the data, processes and applications'.",
						"OB er fundamentet — uten stabil OB mangler man grunnlaget for Digital Platform og deretter for nye digitale tilbud.",
						"44% av ledere identifiserer OB som den største hindringen for digital transformasjon — det understreker viktigheten av å fikse den først.",
						"Forelesning 9 sier at 'Building an OB is a long-term Commitment' — det er noe man må starte med tidlig."
					]
				},
				{
					text: "Ikke utsett Digital Platform for lenge — koble modulene",
					correct: true,
					why: "Riktig: DP bør komme tidlig etter OB.",
					whyExtended: [
						"D4D-roadmapen sier: 'don't put off DP for long — connect the modules'.",
						"DP bør starte parallelt med eller like etter OB-arbeidet fordi den muliggjør eksperimentering og innovasjon.",
						"Forelesning 10 understreker at 'An Operational Backbone is Not Enough for Digital Success' — DP er nødvendig i tillegg.",
						"Roadmapen anbefaler også å 'synchronize customer insights and DP development' — SCI og DP bør utvikles i takt."
					]
				},
				{
					text: "Ikke skynd deg med External Developer Platform",
					correct: true,
					why: "Riktig: ExDP krever modne interne kapabiliteter først.",
					whyExtended: [
						"D4D-roadmapen sier eksplisitt: 'don't rush into an ExDP'.",
						"Forelesning 12 presiserer at ExDP krever 'a very well designed and managed internal platform' — det forutsetter moden OB og DP.",
						"ExDP åpner digitale komponenter for eksterne parter, noe som krever at de interne komponentene er robuste og godt forvaltet.",
						"Å åpne en umoden plattform for eksterne utviklere ville skape problemer med kvalitet, sikkerhet og pålitelighet."
					]
				},
				{
					text: "Start med ExDP før du har en operasjonell ryggrad",
					correct: false,
					why: "Galt: roadmapen sier eksplisitt 'don't rush into an ExDP'.",
					whyExtended: [
						"D4D-roadmapen sier det motsatte: 'fix backbone' først, deretter DP, og til slutt 'don't rush into an ExDP'.",
						"ExDP uten OB og DP ville bety å åpne umodne komponenter for eksterne parter — det ville undergrave tilliten til plattformen.",
						"Forelesning 12 viser at ExDP 'creates pressure on OB and DP' — det forsterker behovet for at de interne byggeklossene er på plass.",
						"D4D-roadmapen anbefaler å 'keep learning and building' — digital transformasjon er en gradvis prosess, ikke en rush."
					]
				}
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
				{
					text: "Interne HR-dokumenter som deles med partnere",
					correct: false,
					why: "Galt: boundary resources er tekniske grensesnitt, ikke HR-dokumenter.",
					whyExtended: [
						"Boundary resources er tekniske mekanismer som muliggjør interaksjon mellom plattformeier og eksterne utviklere.",
						"HR-dokumenter er interne administrative dokumenter som ikke har noe med plattformstrategi å gjøre.",
						"Kursoppsummeringen sier at ExDP krever 'some sort of API or similar that provides a structured access to core components (boundary resources)'."
					]
				},
				{
					text: "API-er, dokumentasjon og verktøy som lar eksterne bygge på plattformen",
					correct: true,
					why: "Riktig: boundary resources gir strukturert tilgang til kjernekomponenter for eksterne parter.",
					whyExtended: [
						"Kursoppsummeringen definerer boundary resources som 'some sort of API or similar that provides a structured access to core components'.",
						"Boundary resources inkluderer API-er (for datatilgang), dokumentasjon (for å forstå plattformen) og utviklerverktøy (for å bygge på plattformen).",
						"Forelesning 12 viser to typer ExDP: én der partnere bruker interne komponenter (som Google Maps API), og én som skaper en markedsplass (som Apple App Store) — begge krever boundary resources.",
						"Uten boundary resources har ikke eksterne parter noen strukturert måte å interagere med plattformen på."
					]
				},
				{
					text: "Fysiske kontorer der partnere kan jobbe",
					correct: false,
					why: "Galt: boundary resources er digitale, ikke fysiske.",
					whyExtended: [
						"Boundary resources er digitale grensesnitt — API-er, SDK-er, dokumentasjon — ikke fysiske fasiliteter.",
						"ExDP handler om å åpne digitale komponenter for eksterne parter gjennom tekniske mekanismer.",
						"Fysiske kontorer kan være del av et partnerskap, men det er ikke boundary resources i plattform-konteksten."
					]
				},
				{
					text: "Prosjektplaner som deles med underleverandører",
					correct: false,
					why: "Galt: dette er prosjektdokumentasjon, ikke plattform-boundary resources.",
					whyExtended: [
						"Prosjektplaner tilhører prosjektstyring (verktøy 5 i CIO toolbox), ikke plattformstrategi.",
						"Boundary resources er tekniske grensesnitt for plattforminteraksjon, ikke prosjektdokumentasjon.",
						"ExDP handler om varig plattformtilgang for eksterne utviklere, ikke om midlertidig prosjektsamarbeid med underleverandører."
					]
				}
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
				{
					text: "At organisasjonen må rapportere både inntekter og utgifter",
					correct: false,
					why: "Galt: det er vanlig finansiell rapportering, ikke double materiality.",
					whyExtended: [
						"Inntekts- og utgiftsrapportering er standard regnskapsføring som gjelder alle selskaper uavhengig av bærekraft.",
						"Double materiality handler om bærekraftspåvirkning i to retninger, ikke om finansielle transaksjoner.",
						"Forelesning 15 presenterer double materiality under Corporate Sustainability Reporting Directive (CSRD) — det er et bærekraftskonsept."
					]
				},
				{
					text: "At rapporteringen må se både hvordan virksomheten påvirker omverdenen, og hvordan bærekraft påvirker virksomheten",
					correct: true,
					why: "Riktig: dette er kjernen i double materiality — påvirkning begge veier.",
					whyExtended: [
						"Forelesning 15 presenterer double materiality som to dimensjoner: 'Finansiell vesentlighet' (påvirkning PÅ selskapet) og 'Påvirkningsvesentlighet' (påvirkning FRA selskapet).",
						"Finansiell vesentlighet spør: hvordan påvirker klima, miljø og mennesker selskapets verdi? — primært relevant for investorer (TCFD, TNFD, ISSB).",
						"Påvirkningsvesentlighet spør: hvordan påvirker selskapet klima, miljø og mennesker? — relevant for forbrukere, sivilt samfunn, ansatte og investorer (GRI).",
						"Corporate Sustainability Reporting Directive (CSRD) krever rapportering på begge dimensjoner — derav 'double'."
					]
				},
				{
					text: "At man må bruke to ulike regnskapsstandarder",
					correct: false,
					why: "Galt: double materiality handler om perspektiv, ikke regnskapsstandarder.",
					whyExtended: [
						"Double materiality handler om å se påvirkning i to retninger (til og fra selskapet), ikke om å bruke to standarder.",
						"Det finnes ulike rapporteringsrammeverk (TCFD, GRI, ISSB), men double materiality er et konsept om perspektiv, ikke om standardvalg.",
						"CSRD integrerer begge perspektivene i ett rapporteringskrav — det krever ikke to separate standarder."
					]
				},
				{
					text: "At bærekraft kun gjelder fysiske materialer",
					correct: false,
					why: "Galt: materiality i denne konteksten betyr vesentlighet, ikke fysiske materialer.",
					whyExtended: [
						"'Materiality' i rapporteringssammenheng betyr 'vesentlighet' — hva som er viktig nok til å rapportere om.",
						"Det har ingenting med fysiske materialer å gjøre — det er et regnskapsfaglig begrep om relevans og vesentlighet.",
						"Bærekraft dekker tre dimensjoner: economic, social og environmental — det er langt bredere enn fysiske materialer.",
						"Forelesning 15 bruker det norske begrepet 'dobbel vesentlighet' som oversettelse — vesentlighet, ikke materialitet."
					]
				}
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
				{
					text: "Support seamless end-to-end transaction processing",
					correct: true,
					why: "Riktig: dette er en kjernefunksjon i OB.",
					whyExtended: [
						"Forelesning 9 lister 'Supports seamless end-to-end transaction processing' som første funksjon i OB.",
						"End-to-end transaction processing betyr at transaksjoner flyter sømløst gjennom hele verdikjeden uten manuelle steg.",
						"Dette krever integrerte systemer og standardiserte prosesser — kjernen i OB-definisjonen."
					]
				},
				{
					text: "Provide reliable and accessible master data",
					correct: true,
					why: "Riktig: pålitelige kjernedata er sentralt.",
					whyExtended: [
						"Forelesning 9 lister 'Provides reliable, and accessible master data' som en sentral OB-funksjon.",
						"Master data er kjernedata om kunder, produkter, leverandører osv. som brukes på tvers av systemer.",
						"Pålitelige kjernedata er en forutsetning for Digital Platform — data components i DP bygger på data fra OB."
					]
				},
				{
					text: "Automate repetitive processes",
					correct: true,
					why: "Riktig: automatisering av repetitivt arbeid er en OB-funksjon.",
					whyExtended: [
						"Forelesning 9 lister 'Automate repetitive processes' som en OB-funksjon.",
						"Kursoppsummeringen beskriver OB som å 'eliminate or reduce non-value-adding variability in a company's systems, processes and data'.",
						"Automatisering erstatter manuelt, repetitivt arbeid med digitaliserte prosesser — det er 'the essence of digitization: produce an OB that replaces individual heroes with digitized processes'."
					]
				},
				{
					text: "Erstatte all manuell beslutningstaking med AI",
					correct: false,
					why: "Galt: OB handler om standardisering og integrasjon, ikke om å fjerne all menneskelig vurdering.",
					whyExtended: [
						"OB handler om å standardisere og integrere systemer, prosesser og data — ikke om å eliminere menneskelig vurdering.",
						"Forelesning 9 viser at OB handler om å 'eliminate or reduce non-value-adding variability' — det er variabilitet som reduseres, ikke beslutningstaking generelt.",
						"AI er ikke nevnt som en del av OB-definisjonen eller OB-funksjonene i kurset.",
						"OB handler om å gi 'visibility into transactions and other core processes' — synlighet som støtter menneskelige beslutninger, ikke erstatter dem."
					]
				}
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
				{
					text: "Et rammeverk som har nådd en kritisk masse og blitt et intersubjektivt fenomen",
					correct: true,
					why: "Riktig: management fashion betyr at et rammeverk har blitt populært nok til å bli en 'mote' i organisasjoner.",
					whyExtended: [
						"Management fashion beskriver fenomenet der et rammeverk eller en ledelsesidé spres bredt i organisasjoner og blir en slags 'mote'.",
						"Når nok organisasjoner bruker et rammeverk, får det en selvforsterkende dynamikk — det blir et intersubjektivt fenomen.",
						"CIO toolbox-modellen advarer om at popularitet ikke er det samme som universell gyldighet — 'their usefulness and value is highly context-sensitive — and sometimes disputed'.",
						"Poenget er at ledere bør evaluere rammeverk kritisk i sin kontekst, ikke bare adoptere dem fordi de er populære."
					]
				},
				{
					text: "Et rammeverk som er vitenskapelig bevist som det beste for alle kontekster",
					correct: false,
					why: "Galt: forelesningen understreker at rammeverk er kontekstavhengige og noen ganger omdiskuterte.",
					whyExtended: [
						"Forelesning 6 sier eksplisitt: 'their usefulness and value is highly context-sensitive — and sometimes disputed'.",
						"CIO toolbox-modellen starter med 'Read the room' — det finnes ikke ett rammeverk som er best for alle kontekster.",
						"Management fashion-konseptet understreker nettopp at popularitet ≠ universell gyldighet — rammeverk kan være 'mote' uten å være vitenskapelig bevist.",
						"Forelesning 3 oppsummerer: 'No standard way of making choices' — kontekst avgjør alltid."
					]
				},
				{
					text: "En metode for å designe klær i IT-bransjen",
					correct: false,
					why: "Galt: fashion brukes her om popularitet/spredning av ledelsesideer, ikke klesmote.",
					whyExtended: [
						"'Fashion' i management fashion er en metafor for trender og popularitet innen ledelsesfaget.",
						"Det handler om hvordan ledelsesideer, rammeverk og metoder spres og blir populære — lik motetrender i klesverden.",
						"Eksempler på management fashions kan inkludere agile, design thinking, lean — ideer som har blitt bredt adoptert.",
						"Poenget i kurset er å være bevisst på at popularitet ikke er det samme som kontekstuell egnethet."
					]
				},
				{
					text: "Et synonym for IT governance",
					correct: false,
					why: "Galt: management fashion og IT governance er helt ulike begreper.",
					whyExtended: [
						"IT governance er verktøy 7 i CIO toolbox — det handler om beslutningsrettigheter og accountability.",
						"Management fashion er et meta-konsept om spredning og popularitet av ledelsesideer — det er ikke et styringsverktøy.",
						"Man kan si at visse IT governance-rammeverk (som ITIL eller TOGAF) kan bli management fashions, men begrepene er ikke synonymer.",
						"CIO toolbox-modellen bruker management fashion-konseptet som en advarsel om å ikke adoptere rammeverk ukritisk."
					]
				}
			]
		}
	]
};