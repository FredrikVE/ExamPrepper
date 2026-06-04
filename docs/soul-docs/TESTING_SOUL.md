# TESTING_SOUL.md

## Formål

Dette dokumentet definerer hvordan ExamPrepper skal testes.

Det tar konkrete standpunkt om testgrenser, testnivåer og ansvarsfordeling per arkitekturlag.

Dokumentet kompletterer `ARCHITECTURE_SOUL.md`, som definerer lag, ansvar og avhengighetsretning.

Prosjektspesifikke detaljer som testverktøy, testkommandoer, testfiler, teststatus og kjente hull dokumenteres i `docs/documentation/TESTING.md`.

---

## Forholdet mellom dokumentene

```txt
ARCHITECTURE_SOUL.md
→ Definerer lag, ansvar og avhengighetsretning.

TESTING_SOUL.md
→ Definerer hvordan hvert lag og hver grense skal testes.

docs/documentation/TESTING.md
→ Dokumenterer faktiske verktøy, kommandoer, testfiler, teststatus og kjente hull.
```

---

## Grunnleggende holdning

Testing reduserer risiko. Testing beviser ikke feilfrihet.

Målet er ikke å maksimere antall tester eller oppnå et bestemt coverage-tall. Målet er å bygge troverdig tillit til at systemet oppfører seg riktig, og å gjøre endringer tryggere.

Teststrategien er risikobasert, analytisk og regresjonsorientert, med utforskende testing ved behov.

---

## Testprinsipper og prosjektbeslutninger

Hvert testprinsipp er oversatt til en konkret beslutning for ExamPrepper.

| Testprinsipp | Beslutning i prosjektet |
| --- | --- |
| Testing viser tilstedeværelsen av feil | En grønn testsuite er ikke bevis på feilfrihet. |
| Uttømmende testing er umulig | Bruk risiko, ekvivalensklasser, grenseverdianalyse og beslutningstabeller til å velge representative caser. |
| Tidlig testing sparer tid og penger | Design tester samtidig med krav, kontrakter og domenelogikk. |
| Feil samler seg i klynger | Test sentral og kompleks logikk grundigere enn enkel presentasjonskode. |
| Pesticid-paradokset | Legg til nye tester når nye defects, spørsmålstyper eller risikoer oppdages. |
| Testing er kontekstavhengig | Bruk forskjellige testnivåer for Use Cases, Repositories, DataSources og UI. |
| Fravær av feil betyr ikke verdi | Bruk også manuell og utforskende testing av brukeropplevelse. |

---

## Begreper

Disse begrepene skal aldri blandes.

**Testnivå** beskriver hvor mye av systemet som testes: unit, integration, system.

**Testtype** beskriver hvilken kvalitet som undersøkes: funksjonell, ikke-funksjonell, endringsrelatert, strukturell.

**Testteknikk** beskriver hvordan testcaser velges: spesifikasjonsbasert, strukturbasert, erfaringsbasert.

---

## Testpyramiden

Bruk laveste testnivå som gir troverdig tillit.

```txt
Flest unit tests
Mange integration tests
Få system tests

Akseptansetesting tas ikke med i dette dokumentet.
```

Systemtester skal ikke duplisere unit-testsuiten. Systemtester skal fokusere på representative brukerflyter gjennom hele applikasjonen.

---

# Testgrenser per arkitekturlag

Dette er kjernen i dokumentet. Tabellen definerer hvor hoveddekningen ligger for hvert lag i `DataSource → Repository → Use Case → ViewModel → View`.

| Lag | Primær testgrense | Sekundær testgrense | Standardregel |
| --- | --- | --- | --- |
| Data (JSON-filer, kataloger) | Integration | System | Valider obligatoriske felt, typer, unike ID-er, referanser, språkversjoner og andre datakontrakter resten av appen er avhengig av. |
| DataSource | Integration test eller contract test | System | Test ekte lesing og responsformat. DataSource-laget testes direkte, ikke via en Fake. |
| Repository | Unit med Fake DataSource | Integration med ekte data | Test mapping, filtrering, manglende data og feilflyt. Fake DataSource erstatter laget under for å isolere Repository-logikken. |
| Use Case | Unit | Integration | Primær testgrense for forretningslogikk. Test med injiserte dependencies. |
| ViewModel | Unit eller integration med injiserte Use Cases | System | Test state, handlers og avledede presentasjonsverdier. ViewModels mottar Use Cases som parametere via `dependencies.js`. |
| View (Page-komponenter) | Integration eller system | Manuell kontroll | Test observerbar UI-oppførsel. Ikke test interne JSX-detaljer eller CSS-klasser. |
| `dependencies.js` | Composition smoke test | System | Bekreft at applikasjonen kan wires sammen uten feil. |

### Viktige presiseringer

En Fake DataSource er en teststrategi for laget *over* (Repository). Den er ikke en test av den ekte DataSource-implementasjonen. DataSources testes separat med integrasjons- eller kontrakttester mot faktiske datakilder.

View-laget importerer ikke modellaget direkte. ViewModels instansieres i `App.jsx`-wrappers og injiseres som props til Page-komponenter. Tester av View-laget skal reflektere denne grensen.

---

# Standpunkt

Disse reglene avgjør uenigheter.

```txt
Use Cases er den primære testgrensen for forretningslogikk.

Repositories testes isolert med Fake DataSources og integrert med ekte data.

DataSources testes med integrasjons- eller kontrakttester mot faktiske datakilder.

ViewModels testes med injiserte Use Cases.

View-komponenter testes ikke isolert som standard.

Playwright brukes til få, viktige brukerflyter gjennom hele systemet.

Ikke dupliser alle unit-tester i Playwright.

En defect-fiks er ikke ferdig før en test gjenskaper feilen.

Coverage brukes til å finne hull, ikke som bevis på kvalitet.

Automatiserte tester skal kjøres i CI ved pull requests og pushes til hovedbranch.
```

---

# Testteknikker

Hver teknikk er koblet til når den brukes og hvilket nivå den passer i denne arkitekturen.

| Teknikk | Bruk når | Typisk nivå |
| --- | --- | --- |
| Ekvivalensklasseinndeling | Flere input forventes å behandles likt. | Primært unit. |
| Grenseverdianalyse | Logikk har minimum, maksimum, terskler eller intervaller. | Primært unit. |
| Beslutningstabell | Utfallet avhenger av kombinasjoner av regler. | Primært unit, sekundært system. |
| Tilstandsovergangstesting | Resultatet avhenger av tidligere state eller hendelser. | ViewModel, integration og system. |
| Feilgjetting | Tidligere defects eller erfaring peker mot sannsynlige feil. | Alle nivåer. |
| Use case testing | En flyt går gjennom flere steg eller lag. | Integration og system. |
| Utforskende testing | Automatiserte tester ikke fanger friksjon, forvirring eller mangler. | Manuell systemtesting. |

---

# Risikovurdering

Skill mellom sannsynlighet, konsekvens og risiko. Ikke kall alvorlighetsgrad for risiko.

Prioriter tester ut fra `sannsynlighet × konsekvens`.

---

# Testbetingelser og testcaser

## Når tabellene skal brukes

Bruk testbetingelse- og testcase-tabellene for høyrisikofunksjonalitet, komplekse forretningsregler, nye hovedflyter, integrasjonstester, Playwright-flyter, tilstandsbasert oppførsel og defects med stor konsekvens.

For en liten og tydelig unit test kan testnavn, testdata og assertions være nok.

## Testbetingelse

| Felt | Beskrivelse |
| --- | --- |
| ID | Stabil identifikator. |
| Testbasis | Krav, kontrakt eller defect. |
| Testbetingelse | Hva som testes. |
| Risikohendelse | Hva kan gå galt. |
| Sannsynlighet | Lav, middels, høy. |
| Konsekvens | Lav, middels, høy. |
| Risiko / prioritet | Samlet vurdering basert på sannsynlighet og konsekvens. |
| Testtype | Type. |
| Primært testnivå | Hoveddekning. |
| Sekundært testnivå | Supplerende tillit. |
| Testteknikk | Hvordan testcase velges. |
| Begrunnelse | Hvorfor. |

## Testcase

| Felt | Beskrivelse |
| --- | --- |
| ID | Stabil identifikator. |
| Testbetingelse | Sporbarhet. |
| Testnivå | Ett nivå. |
| Testtype | Kvalitet. |
| Testteknikk | Metode. |
| Prebetingelser | Starttilstand. |
| Testdata | Input. |
| Handlinger | Steg. |
| Forventet resultat | Oracle. |
| Postbetingelser | Sluttilstand. |
| Dekningsmål | Hva som dekkes. |
| Implementasjon | Testfil. |

---

# Fra testbasis til testimplementasjon

```txt
Testbasis (krav, kontrakt, defect, kvalitetsmål)
↓
Testbetingelse (hva skal testes)
↓
Risikovurdering (sannsynlighet × konsekvens)
↓
Testcase (konkret test)
↓
Testimplementasjon (kode)
↓
Testresultat
```

---

# Scenarioer og flyter

Viktige flyter skal beskrive:

**Scenario.** Kort målbeskrivelse.

**Hovedflyt.** Normal vellykket vei.

**Alternativ flyt.** Gyldig alternativ vei.

**Feilflyt.** Kontrollert feil.

---

# Regler for unit tests

Test Use Cases, Repository-logikk, ViewModels, utils og domeneregler.

Ikke test private metoder eller interne implementasjonsdetaljer.

Én test har ett tydelig formål. Test oppførsel, ikke implementasjon. Hold testene raske og deterministiske.

---

# Regler for integration tests

Test samarbeid mellom lag langs kjeden `DataSource → Repository → Use Case → Resultat`.

Integrasjonstester skal teste kontrakter mellom lag, bruke realistiske data og teste feilflyt.

---

# Test doubles

Bruk Fake, Stub eller Mock avhengig av behov. Mock-data skal være små, tydelige og representative.

Test ekte DataSources separat med integrasjonstester. Repositories testes med kontrollerte Fake DataSource-avhengigheter for å isolere Repository-logikken.

---

# Interfaces og testbarhet

Bruk interfaces der språket støtter det, for Repository, DataSource, eksterne API-er, database, klokke og filsystem.

Ikke opprett interfaces uten grunn.

I JavaScript og React: bruk dependency injection via konstruktørparametere og `dependencies.js`. Duck typing og konsistente kontrakter erstatter formelle interfaces.

---

# Systemtesting

Bruk Playwright for viktige brukerflyter, feilflyter og integrerte scenarier.

Ikke test hver grenseverdi i browser. Systemtester skal være få og fokusere på representative flyter gjennom hele applikasjonen.

Ikke bruk CSS-klasser som hovedgrunnlag for Playwright-locators. Foretrekk role, label, text og test id.

---

# Ikke-funksjonell testing

Vurder ytelse, sikkerhet, tilgjengelighet, robusthet og vedlikeholdbarhet etter behov.

---

# Endringsrelatert testing

Ved defect: skriv test, bekreft feil, rett feil, kjør regresjon.

Bekreftelsestesting (bekrefter at den konkrete feilen er fikset) er ikke det samme som regresjonstesting (bekrefter at resten av systemet fortsatt fungerer).

---

# Strukturell testing og coverage

Coverage er analyse. Coverage er ikke kvalitet.

Oppgi alltid hva som dekkes, nevner og dekningsgrad. Eksempel: `5 av 6 branches`. Ikke bare `83 %`.

---

# Teststruktur

Teststruktur speiler arkitektur.

```txt
tests/
├── unit/
├── integration/
├── system/
├── doubles/
└── fixtures/
```

---

# Testkode

Bruk prosjektets testrammeverk. Bruk assertions, fixtures, setup og teardown. Unngå egne test-runnere.

All testkode skal bruke tabs for innrykk. Prosjektets `.editorconfig`, formatter og linter skal konfigureres slik at tabs ikke konverteres til spaces.

---

# Anti-patterns

Ikke test mocks i stedet for oppførsel. Ikke test private metoder. Ikke bruk `as any`. Ikke dupliser tester på flere nivåer. Ikke skriv tester uten oracle. Ikke stol på coverage alene. Ikke skriv Playwright for alt. Ikke bruk ekte nettverk i unit tests.

---

# Sjekkliste før endring er ferdig

```txt
Testbetingelser er vurdert.
Risiko er vurdert.
Relevante tester finnes.
Regresjon er kjørt.
Kontrakter er verifisert.
Build fungerer.
Manuelle kontroller er gjort ved behov.
```

---

# Testautomatisering og CI

Automatiserte tester skal kjøres i CI. GitHub Actions er standard når prosjektet ligger på GitHub.

CI erstatter ikke lokal testing. Utvikleren skal kjøre relevante tester før kode pushes.

Ved pull requests og pushes til hovedbranch skal CI som minimum kjøre unit tests, integration tests, build og relevante statiske kontroller. Viktige Playwright-tester skal kjøres i en separat CI-jobb.

En pull request skal ikke merges når obligatoriske kontroller feiler.

Flaky tests skal behandles som defects. Ikke ignorer en ustabil test eller kjør den gjentatte ganger til den blir grønn.

Workflow-filer, eksakte kommandoer og nåværende CI-status dokumenteres i `docs/documentation/TESTING.md`.

---

# Kort oppsummert

Velg tester ut fra risiko. Bruk laveste nivå som gir troverdig tillit. Testgrensene følger arkitekturen: Use Cases er primærgrensen for forretningslogikk, Repositories testes med Fakes, DataSources testes med integrasjonstester, ViewModels testes med injiserte Use Cases, og Playwright brukes til få viktige flyter. CI kjører automatiserte kontroller ved endringer. La teststrukturen følge arkitekturen. Test observerbar oppførsel.
