<!-- docs/architecture/SCOPED_TEST_SET_TRANSPORT_CONTRACT.md -->
# Scoped TestSet transport contract

This document locks the final frontend wire contract for the type-scoped Exam and ChapterTest resources after the backend cutover.

The two resource families have the **same TestSet DTO shape** and different resource invariants. The shape is documented once; the ports remain explicit.

## Scoped resource ports

| Port | Response | Required `testType` |
|---|---|---|
| `GET /api/subjects/:subjectId/exams` | array of TestSet DTOs | `exam` |
| `GET /api/exams/:examId` | one TestSet DTO or HTTP 404 | `exam` |
| `GET /api/subjects/:subjectId/chapter-tests` | array of TestSet DTOs | `chapter-test` |
| `GET /api/chapter-tests/:chapterTestId` | one TestSet DTO or HTTP 404 | `chapter-test` |

An empty list is a valid response. A scoped port never returns the other test type. Frontend code must not repair a contract breach by filtering on `testType` after fetch.

## Shared TestSet DTO

Every successful list item and detail response has exactly these camelCase fields:

| Field | Required | Nullable | Transport type |
|---|---|---|---|
| `id` | yes | no | string |
| `baseId` | yes | no | string |
| `subjectId` | yes | no | string |
| `testType` | yes | no | registered TestType |
| `lang` | yes | no | registered language |
| `title` | yes | no | string |
| `description` | yes | yes | string or `null` |
| `modeLabel` | yes | yes | string or `null` |
| `estimatedMinutes` | yes | yes | integer or `null` |
| `questionCount` | yes | no | integer |
| `sortOrder` | yes | no | integer |
| `topicAreaKeys` | yes | no | array of strings |

The contract does not include legacy aliases such as `duration`, `durationMinutes`, `questions`, or snake_case transport names such as `base_id`, `subject_id`, `test_type`, `estimated_minutes`, `question_count`, `sort_order`, or `topic_area_keys`.

`id` is the localized TestSet resource identity used by list/detail/navigation. `baseId` groups localized variants of the same logical TestSet. Question identity and question hydration are separate contracts and are not part of this DTO.

## Ownership

The backend owns resource classification: `/exams` is Exam-only and `/chapter-tests` is ChapterTest-only. `ExamDataSource` and `ChapterTestDataSource` own the corresponding frontend HTTP boundaries. Repositories and use cases may share implementation where their responsibility is genuinely identical.

`TEST_TYPES` and `LANGUAGES` remain their existing frontend SSOTs; this contract does not define parallel enums. `ExamDataSource` and `ChapterTestDataSource` validate this exact shape and their own required `testType` at both list and detail boundaries. Invalid transport data raises a technical DataSource error and follows the existing `useLoadModel` → i18n product message → `WorkspaceState` error flow; it is never silently normalized or filtered.
