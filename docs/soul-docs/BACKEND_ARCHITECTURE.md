# BACKEND_ARCHITECTURE.md — ExamPrepper backendarkitektur

<!-- Sist oppdatert: 2026-06-10 -->

Dette dokumentet viser backend-arkitekturen slik den er etter Clerk-auth, attempt-historikk og konseptbilde-API.

Diagrammene er overordnede. De viser lag, ansvar og dataflyt. De viser ikke alle imports eller interne mapper-klasser.

## Backendflyt

```mermaid
---
config:
  layout: elk
  elk:
    mergeEdges: true
    nodePlacementStrategy: NETWORK_SIMPLEX
  theme: base
  themeVariables:
    background: '#FFFFFF'
    mainBkg: '#FFFFFF'
    primaryColor: '#FFFFFF'
    primaryTextColor: '#111111'
    primaryBorderColor: '#111111'
    lineColor: '#333333'
    edgeLabelBackground: '#FFFFFF'
    clusterBkg: '#FFFFFF'
    clusterBorder: '#CBD5E1'
    fontFamily: ''
---
flowchart TB

    subgraph ExternalServices["Eksterne tjenester"]
        direction LR
        Clerk["Clerk<br/>session JWT"]
    end

    subgraph Frontend["Frontend (React / Vite)"]
        direction TB
        FrontendView["View / ViewModel / Use Case / Repository"]
        FrontendDataSources["API DataSources<br/>Subject / Exam / Question / Attempt / ConceptImage"]
        FrontendView --> FrontendDataSources
    end

    subgraph Backend["Backend (Express / TypeScript)"]
        direction TB

        subgraph CompositionRoot["0. Composition Root"]
            direction LR
            Server["server.ts"]
            App["app.ts"]
            Container["container.ts"]
            Config["config.ts"]
            Server --> App --> Container --> Config
        end

        subgraph MiddlewareLayer["1. Middleware"]
            direction LR
            SecurityMiddleware["security.ts<br/>Helmet / CORS / JSON / rate limit"]
            RequestValidator["requestValidator.ts<br/>Zod"]
            AuthMiddleware["authMiddleware.ts<br/>requireAuth / optionalAuth"]
            ErrorHandler["errorHandler.ts"]
        end

        subgraph HttpLayer["2. HTTP / Routes"]
            direction LR
            HealthRoutes["healthRoutes"]
            SubjectRoutes["subjectRoutes"]
            ExamRoutes["examRoutes"]
            QuestionRoutes["questionRoutes"]
            AttemptRoutes["attemptRoutes"]
            ConceptImageRoutes["conceptImageRoutes"]
        end

        subgraph UseCaseLayer["3. Use Cases"]
            direction LR
            CreateAttemptUC["CreateExamAttemptUseCase"]
        end

        subgraph RepositoryInterfaces["4. Repository Interfaces"]
            direction LR
            ISubjectRepo["SubjectRepository"]
            IExamRepo["ExamRepository"]
            IQuestionRepo["QuestionRepository"]
            IAttemptRepo["ExamAttemptRepository"]
            IConceptImageRepo["ConceptImageRepository"]
        end

        subgraph DomainServices["5. Domain Services"]
            direction LR
            AuthService["AuthService"]
            ScoreService["ScoreService"]
            GradeAnswerService["GradeAnswerService"]
        end

        subgraph Infrastructure["6. Infrastructure"]
            direction LR
            ClerkAuthService["ClerkAuthService"]
            ScoreServiceImpl["ScoreServiceImpl"]
            GradeAnswerServiceImpl["GradeAnswerServiceImpl"]
            PgSubjectRepo["PostgresSubjectRepository"]
            PgExamRepo["PostgresExamRepository"]
            PgQuestionRepo["PostgresQuestionRepository<br/>Question hydrering + mappers"]
            PgAttemptRepo["PostgresExamAttemptRepository<br/>transaction + attempt results"]
            PgConceptImageRepo["PostgresConceptImageRepository"]
        end

        subgraph DatabaseLayer["7. Database"]
            direction TB
            DatabasePool["DatabasePool"]
            PostgreSQL[("PostgreSQL<br/>normalized exams/questions<br/>users + exam_attempts<br/>attempt_question_results JSONB<br/>summary views")]
            DatabasePool --> PostgreSQL
        end
    end

    FrontendDataSources -- "GET /api/subjects<br/>GET /api/subjects/:id" --> SubjectRoutes
    FrontendDataSources -- "GET /api/subjects/:id/exams<br/>GET /api/exams/:id" --> ExamRoutes
    FrontendDataSources -- "GET /api/exams/:id/questions" --> QuestionRoutes
    FrontendDataSources -- "GET /api/subjects/:id/concept-images<br/>GET /images/*" --> ConceptImageRoutes
    FrontendDataSources -- "POST /api/exam-attempts<br/>GET /api/exam-attempts/:id<br/>GET /api/my/attempts" --> AttemptRoutes

    App --> SecurityMiddleware
    App --> HealthRoutes & SubjectRoutes & ExamRoutes & QuestionRoutes & AttemptRoutes & ConceptImageRoutes
    App --> ErrorHandler

    SubjectRoutes --> RequestValidator --> ISubjectRepo
    ExamRoutes --> RequestValidator --> IExamRepo
    QuestionRoutes --> RequestValidator --> IQuestionRepo
    ConceptImageRoutes --> RequestValidator --> IConceptImageRepo

    AttemptRoutes --> AuthMiddleware --> AuthService
    AttemptRoutes --> RequestValidator
    AttemptRoutes --> CreateAttemptUC
    AttemptRoutes --> IAttemptRepo

    CreateAttemptUC --> IExamRepo
    CreateAttemptUC --> IQuestionRepo
    CreateAttemptUC --> ScoreService
    CreateAttemptUC --> IAttemptRepo

    ScoreService --> GradeAnswerService

    AuthService -. implements .-> ClerkAuthService
    ScoreService -. implements .-> ScoreServiceImpl
    GradeAnswerService -. implements .-> GradeAnswerServiceImpl
    ISubjectRepo -. implements .-> PgSubjectRepo
    IExamRepo -. implements .-> PgExamRepo
    IQuestionRepo -. implements .-> PgQuestionRepo
    IAttemptRepo -. implements .-> PgAttemptRepo
    IConceptImageRepo -. implements .-> PgConceptImageRepo

    ClerkAuthService --> Clerk
    ClerkAuthService --> DatabasePool
    PgSubjectRepo --> DatabasePool
    PgExamRepo --> DatabasePool
    PgQuestionRepo --> DatabasePool
    PgAttemptRepo --> DatabasePool
    PgConceptImageRepo --> DatabasePool

    classDef externalNode fill:#E1BEE7,stroke:#4A148C,stroke-width:1.5px,color:#000000
    classDef frontendNode fill:#F3E5F5,stroke:#6A1B9A,stroke-width:1.5px,color:#000000
    classDef routeNode fill:#BBDEFB,stroke:#0D47A1,stroke-width:1.8px,color:#000000
    classDef middlewareNode fill:#B3E5FC,stroke:#01579B,stroke-width:1.8px,color:#000000
    classDef usecaseNode fill:#C5CAE9,stroke:#1A237E,stroke-width:2px,color:#000000
    classDef repositoryNode fill:#DCEDC8,stroke:#33691E,stroke-width:2px,color:#000000
    classDef serviceNode fill:#B2DFDB,stroke:#004D40,stroke-width:2px,color:#000000
    classDef infraNode fill:#FFE0B2,stroke:#E65100,stroke-width:2px,color:#000000
    classDef dataNode fill:#FFE082,stroke:#E65100,stroke-width:2px,color:#000000

    class Clerk externalNode
    class FrontendView,FrontendDataSources frontendNode
    class HealthRoutes,SubjectRoutes,ExamRoutes,QuestionRoutes,AttemptRoutes,ConceptImageRoutes routeNode
    class SecurityMiddleware,RequestValidator,AuthMiddleware,ErrorHandler middlewareNode
    class CreateAttemptUC usecaseNode
    class ISubjectRepo,IExamRepo,IQuestionRepo,IAttemptRepo,IConceptImageRepo repositoryNode
    class AuthService,ScoreService,GradeAnswerService serviceNode
    class ClerkAuthService,ScoreServiceImpl,GradeAnswerServiceImpl,PgSubjectRepo,PgExamRepo,PgQuestionRepo,PgAttemptRepo,PgConceptImageRepo infraNode
    class DatabasePool,PostgreSQL dataNode
```

## Databasemodell slik den er implementert nå

```mermaid
---
config:
  layout: elk
  theme: base
  themeVariables:
    background: '#FFFFFF'
    mainBkg: '#FFFFFF'
    primaryColor: '#FFFFFF'
    primaryTextColor: '#000000'
    primaryBorderColor: '#111111'
    lineColor: '#111111'
    edgeLabelBackground: '#FFFFFF'
    fontFamily: ''
---
erDiagram

    SUBJECTS {
        text id PK
        text code UK
        text name
        text description
        text app_name
        text faculty
        text icon_key
        timestamptz created_at
        timestamptz updated_at
    }

    EXAM_BASES {
        text id PK
        text subject_id FK
        text base_key UK
        int sort_order UK
        timestamptz created_at
        timestamptz updated_at
    }

    EXAMS {
        text id PK
        text base_id FK
        text lang UK
        text title
        text description
        text mode_label
        int estimated_minutes
        timestamptz created_at
        timestamptz updated_at
    }

    QUESTIONS {
        text exam_id PK,FK
        text question_key PK
        text type
        text title
        text prompt
        text source
        int position UK
        int points
        text module_id
        text group_id
        timestamptz created_at
        timestamptz updated_at
    }

    QUESTION_OPTIONS {
        text exam_id PK,FK
        text question_key PK,FK
        text option_key PK
        text text
        boolean is_correct
        text feedback
        int position UK
    }

    FILL_ACCEPTED_ANSWERS {
        text exam_id PK,FK
        text question_key PK,FK
        text answer_text PK
        boolean is_primary
        text feedback
    }

    SEQUENCE_ITEMS {
        text exam_id PK,FK
        text question_key PK,FK
        text item_key PK
        text text
        int correct_position UK
    }

    DRAG_CARDS {
        text exam_id PK,FK
        text question_key PK,FK
        text card_key PK
        text text
        int position UK
    }

    DRAG_TARGETS {
        text exam_id PK,FK
        text question_key PK,FK
        text target_key PK
        text label
        int position UK
    }

    DRAG_CORRECT_MATCHES {
        text exam_id PK,FK
        text question_key PK,FK
        text card_key PK,FK
        text target_key FK
    }

    CATEGORIZE_CATEGORIES {
        text exam_id PK,FK
        text question_key PK,FK
        text category_key PK
        text label
        int position UK
    }

    CATEGORIZE_ITEMS {
        text exam_id PK,FK
        text question_key PK,FK
        text item_key PK
        text text
        text correct_category_key FK
        int position UK
    }

    MATRIX_QUADRANTS {
        text exam_id PK,FK
        text question_key PK,FK
        text quadrant_key PK
        text label
        text x_label
        text y_label
        int position UK
    }

    MATRIX_ITEMS {
        text exam_id PK,FK
        text question_key PK,FK
        text item_key PK
        text text
        text correct_quadrant_key FK
        int position UK
    }

    QUESTION_IMAGE_REFS {
        text exam_id PK,FK
        text question_key PK,FK
        text image_ref PK
        int position UK
    }

    QUESTION_EXPLANATIONS {
        text exam_id PK,FK
        text question_key PK,FK
        text why_correct
        text why_wrong
        jsonb why_extended
    }

    QUESTION_OPTION_EXPLANATIONS {
        text exam_id PK,FK
        text question_key PK,FK
        text option_key PK,FK
        jsonb why_extended
        jsonb why_extended_image_refs
    }

    CONCEPT_IMAGES {
        text subject_id PK,FK
        text image_id PK
        text module_id
        text group_id
        text ext
        text title_no
        text title_en
        text alt_no
        text alt_en
        text caption_no
        text caption_en
    }

    USERS {
        uuid id PK
        text provider_id UK
        text display_name
        timestamptz created_at
    }

    EXAM_ATTEMPTS {
        uuid id PK
        text exam_id FK,UK
        uuid user_id FK
        text lang
        timestamptz started_at
        timestamptz submitted_at
    }

    ATTEMPT_QUESTION_RESULTS {
        uuid attempt_id PK,FK
        text exam_id PK,FK
        text question_key PK,FK
        jsonb submitted_answer
        int points_awarded
        int max_points
        boolean is_correct
    }

    EXAM_SUMMARIES_VIEW {
        text id
        text subject_id
        text base_id
        text lang
        text title
        text description
        text mode_label
        int estimated_minutes
        int sort_order
        int question_count
    }

    EXAM_ATTEMPT_SUMMARY_VIEW {
        uuid attempt_id
        text exam_id
        uuid user_id
        int score_points
        int total_points
        numeric percentage
        timestamptz started_at
        timestamptz submitted_at
    }

    SUBJECTS ||--o{ EXAM_BASES : owns
    EXAM_BASES ||--o{ EXAMS : has_language_variants
    EXAMS ||--o{ QUESTIONS : contains
    SUBJECTS ||--o{ CONCEPT_IMAGES : has

    QUESTIONS ||--o{ QUESTION_OPTIONS : has
    QUESTIONS ||--o{ FILL_ACCEPTED_ANSWERS : accepts
    QUESTIONS ||--o{ SEQUENCE_ITEMS : orders
    QUESTIONS ||--o{ DRAG_CARDS : has
    QUESTIONS ||--o{ DRAG_TARGETS : has
    DRAG_CARDS ||--o{ DRAG_CORRECT_MATCHES : card_in
    DRAG_TARGETS ||--o{ DRAG_CORRECT_MATCHES : target_in
    QUESTIONS ||--o{ CATEGORIZE_CATEGORIES : has
    CATEGORIZE_CATEGORIES ||--o{ CATEGORIZE_ITEMS : correct_for
    QUESTIONS ||--o{ MATRIX_QUADRANTS : has
    MATRIX_QUADRANTS ||--o{ MATRIX_ITEMS : correct_for
    QUESTIONS ||--o{ QUESTION_IMAGE_REFS : references
    QUESTIONS ||--o| QUESTION_EXPLANATIONS : explains
    QUESTION_OPTIONS ||--o| QUESTION_OPTION_EXPLANATIONS : explains_option

    USERS ||--o{ EXAM_ATTEMPTS : owns
    EXAMS ||--o{ EXAM_ATTEMPTS : has
    EXAM_ATTEMPTS ||--o{ ATTEMPT_QUESTION_RESULTS : has_results
    QUESTIONS ||--o{ ATTEMPT_QUESTION_RESULTS : graded_as
```

## Notater

- `question_image_refs.image_ref` er en tekstlig bildefreferanse i dagens migrasjon. Den er ikke en FK til `concept_images`.
- `concept_images` er implementert med sammensatt primærnøkkel på `subject_id` og `image_id`.
- `question_explanations` og `question_option_explanations` er en del av dagens database, selv om de ikke var med i eldre ER-diagrammer.
- Attempts lagres som metadata i `exam_attempts` og ett resultat per spørsmål i `attempt_question_results`.
