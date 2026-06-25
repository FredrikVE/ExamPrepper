// src/ui/view/pages/FlipcardsPage.jsx
export default function FlipcardsPage({ viewModel }) {
    if (viewModel.flashcardsLoading) {
        return (
            <FlipcardsShell viewModel={viewModel}>
                <FlipcardsState
                    title={viewModel.t.flipcardsLoadingTitle}
                />
            </FlipcardsShell>
        );
    }

    if (viewModel.flashcardsLoadError) {
        return (
            <FlipcardsShell viewModel={viewModel}>
                <FlipcardsState
                    title={viewModel.t.flipcardsErrorTitle}
                    body={viewModel.flashcardsLoadError}
                />
            </FlipcardsShell>
        );
    }

    if (viewModel.flashcards.length === 0) {
        return (
            <FlipcardsShell viewModel={viewModel}>
                <FlipcardsState
                    title={viewModel.t.flipcardsEmptyTitle}
                    body={viewModel.t.flipcardsEmptyBody}
                />
            </FlipcardsShell>
        );
    }

    return (
        <FlipcardsShell viewModel={viewModel}>
            <section className="flipcards-page-placeholder" aria-labelledby="flipcards-page-title">
                <p className="flipcards-page-eyebrow">{viewModel.t.flipcardsEyebrow}</p>
                <h1 id="flipcards-page-title">{viewModel.t.flipcardsTitle}</h1>
                <p>{viewModel.t.flipcardsIntro}</p>

                <div className="flipcards-page-summary" aria-label={viewModel.t.flipcardsSummaryLabel}>
                    <strong>{viewModel.flashcards.length}</strong>
                    <span>{viewModel.t.flipcardsCardCountLabel}</span>
                </div>

                <p className="flipcards-page-progress">{viewModel.progressLabel}</p>
                <p className="flipcards-page-next-step">{viewModel.t.flipcardsUiPendingMessage}</p>
            </section>
        </FlipcardsShell>
    );
}

function FlipcardsShell({ viewModel, children }) {
    return (
        <main className="flipcards-workspace">
            <div className="flipcards-ambient-light" aria-hidden="true" />
            <header className="flipcards-page-header">
                <div>
                    <p>{viewModel.t.flipcardsEyebrow}</p>
                    <h2>{viewModel.t.flipcardsTitle}</h2>
                </div>
            </header>
            {children}
        </main>
    );
}

function FlipcardsState({ title, body }) {
    return (
        <section className="flipcards-state">
            <h1>{title}</h1>
            {body && <p>{body}</p>}
        </section>
    );
}
