# Testing

Testene ligger i en egen `test/`-mappe og er organisert etter samme lagdeling som resten av prosjektet.

```bash
test/
├── integration/
│   └── examFlow.integration.test.js
├── model/
│   ├── domain/
│   │   ├── CalculateExamScoreUseCase.test.js
│   │   ├── GetAvailableExamsUseCase.test.js
│   │   ├── GetAvailableSubjectsUseCase.test.js
│   │   ├── GetExamByBaseIdAndLangUseCase.test.js
│   │   ├── GetExamQuestionsUseCase.test.js
│   │   ├── GetSubjectByIdUseCase.test.js
│   │   └── GradeAnswerUseCase.test.js
│   └── repositories/
│       ├── ExamRepository.test.js
│       └── SubjectRepository.test.js
├── ui/
│   └── QuestionCard/
│       └── matrixPlacementAnswerLogic.test.js
└── utils/
    ├── answerUtils.test.js
    ├── questionUtils.test.js
    └── viewModelUtils.test.js
```

Testmappene har følgende ansvar:

| Mappe | Ansvar |
|------|--------|
| `test/integration/` | Tester samlet eksamensflyt med ekte data fra prosjektet |
| `test/model/domain/` | Tester use cases og domenelogikk isolert |
| `test/model/repositories/` | Tester repository-laget og henting av fag/eksamensdata |
| `test/ui/` | Klargjort for komponentnære UI-tester |
| `test/utils/` | Tester felles og feature-nære hjelpefunksjoner for svar, spørsmål og viewmodel-visning |

---

## Teststrategi

Teststrategien følger arkitekturen i prosjektet:

```text
Data
  ↓
Repository
  ↓
UseCases
  ↓
ViewModel / Utils
```

Målet er å teste mest mulig av forretningslogikken uten å måtte starte Vite eller åpne appen i nettleseren.

Testene dekker blant annet:

- retting av single choice-svar
- retting av multiple choice-svar
- retting av fill-in-svar
- retting av drag-and-drop-oppgaver
- retting av category sort-oppgaver
- retting av table match-oppgaver
- retting av matrix placement-oppgaver
- beregning av score og prosent
- henting av fag
- henting av eksamener
- henting av spørsmål
- henting av riktig språkversjon av samme eksamen
- repository-logikk
- hjelpefunksjoner for svar, spørsmål og visning
- feature-nære hjelpefunksjoner etter refaktorering av `QuestionCard`, `FeedbackPanel`, `ExamProgress` og `Footer`
- integrert eksamensflyt med ekte data

---

### Enhetstester

<table>
    <thead>
        <tr>
            <th>Test-case</th>
            <th>Testbetingelse</th>
            <th>Testfil</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td>Rette single choice-svar</td>
            <td>Systemet skal avgjøre om valgt alternativ er korrekt.</td>
            <td><code>GradeAnswerUseCase.test.js</code></td>
        </tr>
        <tr>
            <td>Rette multiple choice-svar</td>
            <td>Systemet skal håndtere flere riktige alternativer.</td>
            <td><code>GradeAnswerUseCase.test.js</code></td>
        </tr>
        <tr>
            <td>Rette fill-in-svar</td>
            <td>Systemet skal godta riktige tekstsvar og alternative svar.</td>
            <td><code>GradeAnswerUseCase.test.js</code> / <code>answerUtils.test.js</code></td>
        </tr>
        <tr>
            <td>Rette matrix placement-svar</td>
            <td>Systemet skal avgjøre om kort er plassert i riktig kvadrant i en 2x2-matrise.</td>
            <td><code>GradeAnswerUseCase.test.js</code></td>
        </tr>
        <tr>
            <td>Beregne eksamensscore</td>
            <td>Systemet skal beregne poengsum og prosent etter levering.</td>
            <td><code>CalculateExamScoreUseCase.test.js</code></td>
        </tr>
        <tr>
            <td>Hente tilgjengelige fag</td>
            <td>Systemet skal vise fag som kan velges i appen.</td>
            <td><code>GetAvailableSubjectsUseCase.test.js</code></td>
        </tr>
        <tr>
            <td>Hente fag basert på ID</td>
            <td>Systemet skal finne riktig fag når <code>subjectId</code> er valgt.</td>
            <td><code>GetSubjectByIdUseCase.test.js</code></td>
        </tr>
        <tr>
            <td>Hente tilgjengelige eksamener for fag og språk</td>
            <td>Systemet skal vise riktige eksamener for valgt fag og språk.</td>
            <td><code>GetAvailableExamsUseCase.test.js</code></td>
        </tr>
        <tr>
            <td>Hente spørsmål for valgt eksamen</td>
            <td>Systemet skal laste spørsmålene til valgt eksamen.</td>
            <td><code>GetExamQuestionsUseCase.test.js</code></td>
        </tr>
        <tr>
            <td>Hente språkversjon av samme eksamen</td>
            <td>Systemet skal finne eksamen basert på <code>baseId</code> og <code>lang</code>.</td>
            <td><code>GetExamByBaseIdAndLangUseCase.test.js</code></td>
        </tr>
        <tr>
            <td>Teste repository for eksamensdata</td>
            <td>Repository-laget skal hente eksamener og spørsmål fra datagrunnlaget.</td>
            <td><code>ExamRepository.test.js</code></td>
        </tr>
        <tr>
            <td>Teste repository for fagdata</td>
            <td>Repository-laget skal hente fag og fagmetadata fra datagrunnlaget.</td>
            <td><code>SubjectRepository.test.js</code></td>
        </tr>
        <tr>
            <td>Teste hjelpefunksjoner for svarlogikk</td>
            <td>Utils skal tolke og normalisere svar likt på tvers av appen.</td>
            <td><code>answerUtils.test.js</code></td>
        </tr>
        <tr>
            <td>Teste hjelpefunksjoner for spørsmål</td>
            <td>Utils skal gi riktig presentasjonsdata for spørsmål.</td>
            <td><code>questionUtils.test.js</code></td>
        </tr>
        <tr>
            <td>Teste hjelpefunksjoner for ViewModel-visning</td>
            <td>Utils skal gi riktig UI-status basert på state.</td>
            <td><code>viewModelUtils.test.js</code></td>
        </tr>
    </tbody>
</table>

### Integrasjonstester

<table>
    <thead>
        <tr>
            <th>Test-case</th>
            <th>Testbetingelse</th>
            <th>Testfil</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td>Laste synlige fag med eksamensteller</td>
            <td>Appen skal kunne hente fag fra ekte datagrunnlag.</td>
            <td><code>examFlow.integration.test.js</code></td>
        </tr>
        <tr>
            <td>Laste norske eksamener for IN5431</td>
            <td>Appen skal hente riktige eksamener for valgt fag og språk.</td>
            <td><code>examFlow.integration.test.js</code></td>
        </tr>
        <tr>
            <td>Laste spørsmål og beregne full score</td>
            <td>Appen skal kunne hente spørsmål og beregne resultat når alle svar er riktige.</td>
            <td><code>examFlow.integration.test.js</code></td>
        </tr>
        <tr>
            <td>Rette faktiske spørsmål fra eksamensdata</td>
            <td>Retting skal fungere med ekte <code>single</code>, <code>multi</code>, <code>fill</code>, category sort, table match og matrix placement-spørsmål.</td>
            <td><code>examFlow.integration.test.js</code></td>
        </tr>
        <tr>
            <td>Finne oversatt eksamen basert på <code>baseId</code> og <code>lang</code></td>
            <td>Språkbytte skal finne riktig språkversjon av samme eksamen.</td>
            <td><code>examFlow.integration.test.js</code></td>
        </tr>
        <tr>
            <td>Finne fag med eksamensteller</td>
            <td>Appen skal hente valgt fag og beregne antall tilgjengelige eksamener.</td>
            <td><code>examFlow.integration.test.js</code></td>
        </tr>
    </tbody>
</table>
