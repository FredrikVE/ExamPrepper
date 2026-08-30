<a href="../../README.md">← Tilbake til README</a>

---

# Vurderingsalgoritmen

ExamPrepper bruker én vurderingsstatus per glossary-begrep. Frontend registrerer brukeraktivitet for samme `glossaryEntryKey`. Backend eier selve `ConceptMastery`-beregningen og returnerer statusen som GlossaryPage viser.

Frontend beregner ikke grensene for `Øve mer`, `Underveis` eller `Forstått`.

## Flyt

```mermaid
flowchart TD

	A[Bruker jobber med et begrep<br/>samme glossaryEntryKey]

	A --> B[FlipCards]
	A --> C[MatchCards]
	A --> D[LearningSession]
	A --> E[Exam]
	A --> F[ChapterTest]

	B --> B1{Hva velger brukeren?}
	B1 -->|Forstått| B2[Registrer<br/>Forstått]
	B1 -->|Øve mer| B3[Registrer<br/>Øve mer]

	C --> C1[Registrer prestasjon<br/>riktig / feilforsøk]

	D --> G[Registrer spørsmålsresultat]
	E --> G
	F --> G

	B2 --> H
	B3 --> H
	C1 --> H
	G --> H

	H[Backend samler evidens<br/>for samme glossaryEntryKey]

	H --> I[ConceptMastery beregner<br/>samlet vurdering]

	I --> J{Vurderingsstatus}

	J -->|Lav| K[Øve mer]
	J -->|Middels| L[Underveis]
	J -->|Høy| M[Forstått]

	K --> N[GlossaryPage]
	L --> N
	M --> N

	N --> O[Vurdering-kolonnen<br/>viser status]

	classDef user fill:#e2e8f0,stroke:#64748b,color:#0f172a,stroke-width:2px;
	classDef flipcards fill:#ddd6fe,stroke:#7c3aed,color:#3b0764,stroke-width:2px;
	classDef matchcards fill:#bfdbfe,stroke:#2563eb,color:#172554,stroke-width:2px;
	classDef assessment fill:#bae6fd,stroke:#0284c7,color:#082f49,stroke-width:2px;
	classDef backend fill:#e9d5ff,stroke:#9333ea,color:#3b0764,stroke-width:2px;
	classDef decision fill:#f3e8ff,stroke:#7e22ce,color:#3b0764,stroke-width:2px;
	classDef practice fill:#fecaca,stroke:#dc2626,color:#450a0a,stroke-width:3px;
	classDef progress fill:#fde68a,stroke:#ca8a04,color:#422006,stroke-width:3px;
	classDef understood fill:#bbf7d0,stroke:#16a34a,color:#052e16,stroke-width:3px;
	classDef glossary fill:#ccfbf1,stroke:#0f766e,color:#042f2e,stroke-width:2px;

	class A user;
	class B,B1,B2,B3 flipcards;
	class C,C1 matchcards;
	class D,E,F,G assessment;
	class H,I backend;
	class J decision;
	class K practice;
	class L progress;
	class M understood;
	class N,O glossary;
```

## Felles identitet

`glossaryEntryKey` er identiteten som kobler Glossary, FlipCards, MatchCards og backendens mastery-beregning sammen.

FlipCards bygger hvert kort fra ett glossary-entry. Kortets `id` er samme `glossaryEntryKey`. MatchCards bygger hvert par fra samme nøkkel og fører nøkkelen videre til begge slottene i paret.

Frontend trenger derfor ikke et eget mapping-register for vurdering.

## FlipCards

FlipCards er en eksplisitt vurderingshandling.

Når en innlogget bruker velger `Forstått`, sender `FlipcardsPageViewModel` assessment `understood` for kortets `glossaryEntryKey`. Når brukeren velger `Øve mer`, sendes `practice`.

Hver semantiske vurdering får en ny UUID fra `createConceptPracticeEventId()`. ID-en sendes sammen med assessmentet slik at backend kan behandle samme event idempotent.

Flyten er:

```text
FlipcardsPageViewModel
  ↓
RecordFlipcardAssessmentUseCase
  ↓
ConceptPracticeRepository
  ↓
ConceptPracticeDataSource
  ↓
POST /subjects/:subjectId/concept-practice/flipcards
```

Den lokale kortflyten beholdes. En signed-out bruker kan fortsatt bruke FlipCards, men det sendes ingen Concept Practice-write til backend.

## MatchCards

MatchCards registrerer observert prestasjon. Brukeren velger ikke mastery-status direkte.

Ved en feil match øker `wrongAttemptCount` for begge glossary-begrepene som inngikk i feilparet. Når et par senere matches riktig, lager `createSuccessfulMatchResult()` et resultat med:

```text
{
	glossaryEntryKey,
	wrongAttemptCount
}
```

`MatchCardsPageViewModel` sender ett resultat per `glossaryEntryKey` i den aktive sesjonen. En ny sesjon nullstiller dette lokale write-vernet. Hvert resultat får en ny event-ID før det sendes til backend.

Flyten er:

```text
MatchCardsPageViewModel
  ↓
RecordMatchCardResultUseCase
  ↓
ConceptPracticeRepository
  ↓
ConceptPracticeDataSource
  ↓
POST /subjects/:subjectId/concept-practice/match-cards
```

Signed-out brukere beholder den lokale MatchCards-opplevelsen uten Concept Practice-persistens.

## Hva frontend ikke eier

Frontend skal ikke kopiere mastery-policyen. Den skal ikke beregne scoregrenser, MatchCards-vekter, checkpoint-regler eller understood-gates.

GlossaryPage mottar backendens `mastery.status` gjennom den eksisterende glossary-flyten og lager bare presentasjon for statusen.

Den autoritative vurderingsalgoritmen ligger i backend. Backend-dokumentasjonen beskriver dagens terskler, checkpoint-regler og evidenskilder.

## Relevante filer

```text
src/model/datasource/ConceptPracticeDataSource.js
src/model/repositories/ConceptPracticeRepository.js
src/model/domain/mastery/RecordFlipcardAssessmentUseCase.js
src/model/domain/mastery/RecordMatchCardResultUseCase.js
src/ui/viewmodel/Shared/createConceptPracticeEventId.js
src/ui/viewmodel/FlipcardsPageViewModel.js
src/ui/viewmodel/MatchCardsPageViewModel.js
src/ui/viewmodel/MatchCardsPage/matchCardsSelectionTransitions.js
src/ui/viewmodel/MatchCardsPage/matchCardsResultModel.js
src/ui/viewmodel/GlossaryPage/glossaryMasteryModel.js
```
