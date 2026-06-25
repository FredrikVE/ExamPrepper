// src/ui/view/pages/FlipcardsPage.jsx
import FlipcardsStudySurface from "../components/FlipcardsPage/FlipcardsStudySurface.jsx";

export default function FlipcardsPage({ viewModel }) {
    if (viewModel.flashcardsLoading) {
        return (
            <FlipcardsShell labels={viewModel.labels}>
                <FlipcardsState
                    title={viewModel.labels.loadingTitle}
                />
            </FlipcardsShell>
        );
    }

    if (viewModel.flashcardsLoadError) {
        return (
            <FlipcardsShell labels={viewModel.labels}>
                <FlipcardsState
                    title={viewModel.labels.errorTitle}
                    body={viewModel.flashcardsLoadError}
                />
            </FlipcardsShell>
        );
    }

    if (viewModel.flashcards.length === 0) {
        return (
            <FlipcardsShell labels={viewModel.labels}>
                <FlipcardsState
                    title={viewModel.labels.emptyTitle}
                    body={viewModel.labels.emptyBody}
                />
            </FlipcardsShell>
        );
    }

    return (
        <FlipcardsShell labels={viewModel.labels}>
            <FlipcardsStudySurface
                cards={viewModel.flashcards}
                deckKey={viewModel.deckKey}
                progressLabel={viewModel.progressLabel}
                masteredCardIds={viewModel.masteredCardIds}
                practiceCardIds={viewModel.practiceCardIds}
                labels={viewModel.labels}
                onCardMastered={viewModel.markCardAsMastered}
                onCardForPractice={viewModel.markCardForPractice}
            />
        </FlipcardsShell>
    );
}

function FlipcardsShell({ labels, children }) {
    return (
        <main className="flipcards-workspace">
            <div className="flipcards-ambient-light" aria-hidden="true" />
            <header className="flipcards-page-header">
                <div>
                    <p>{labels.pageEyebrow}</p>
                    <h2>{labels.pageTitle}</h2>
                </div>
                <p className="flipcards-page-lead">{labels.pageIntro}</p>
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
