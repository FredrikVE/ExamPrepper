<!--test/fixtures/grading/README.md-->
# Shared grading test fixtures

`question-grading-fixtures.json` is a platform-neutral grading corpus used by the contract tests under `test/contracts/`. Every case has exactly one `question`, one `answer`, and one `expected` result.

Frontend and backend tests adapt the neutral shape to their local runtime models before invoking production grading code. The fixture must not contain parallel `frontendQuestion` and `backendQuestion` representations.

Until the repositories share one physical fixture package, cross-repository CI must verify both copies against the same published source or checksum.
