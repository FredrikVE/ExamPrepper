<!--test/fixtures/learning-path/README.md-->
# LearningPath transport test fixtures

Learning Path V2 locks these endpoints:

```text
GET  /api/subjects/:subjectId/learning-path?lang=:language
POST /api/learning-sessions
GET  /api/learning-sessions/:sessionId
POST /api/learning-sessions/:sessionId/submit
```

The Learning Path response is backend-owned `Module → Section → Session → ChapterTest`. Frontend renders that roadmap and does not calculate rounds, Session packing or the next authored Session locally.

Starting a Learning Session sends only subject, module and language. Backend re-resolves the next activity and persists the selected authored Session. `sessionQuestionId` remains the frontend identity for answers, results and answer-option order.

The four JSON files in this directory are representative test fixtures consumed by the contract and repository tests. They are not a production contract package. Frontend and backend copies should remain byte-identical while both repositories keep local fixtures.
