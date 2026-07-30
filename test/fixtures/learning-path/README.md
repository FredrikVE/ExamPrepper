<!--test/fixtures/learning-path/README.md-->
# LearningPath transport test fixtures

P04 locks these endpoints:

```text
GET  /api/subjects/:subjectId/learning-path?lang=:language
POST /api/learning-sessions
GET  /api/learning-sessions/:sessionId
POST /api/learning-sessions/:sessionId/submit
```

`sessionQuestionId` is the frontend identity for answers, results and answer-option order. The backend retains `(examId, questionKey)` as source identity and resolves it from `sessionQuestionId` during persistence.

The four JSON files in this directory are representative test fixtures consumed by the contract and repository tests. They are not a production contract package. Frontend and backend copies must remain byte-identical until the repositories share one physical package.
