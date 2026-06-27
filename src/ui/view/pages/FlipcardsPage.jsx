// src/ui/view/pages/FlipcardsPage.jsx
import FlipcardsStudySurface from "../components/FlipcardsPage/FlipcardsStudySurface.jsx";

export default function FlipcardsPage({ viewModel }) {
    if (viewModel.flashcardsLoading) {
        return (
            <FlipcardsShell>
                <FlipcardsState
                    title={viewModel.labels.loadingTitle}
                />
            </FlipcardsShell>
        );
    }

    if (viewModel.flashcardsLoadError) {
        return (
            <FlipcardsShell>
                <FlipcardsState
                    title={viewModel.labels.errorTitle}
                    body={viewModel.flashcardsLoadError}
                />
            </FlipcardsShell>
        );
    }

    if (viewModel.flashcards.length === 0) {
        return (
            <FlipcardsShell>
                <FlipcardsState
                    title={viewModel.labels.emptyTitle}
                    body={viewModel.labels.emptyBody}
                />
            </FlipcardsShell>
        );
    }

    return (
        <FlipcardsShell>
            <FlipcardsStudySurface
                cards={viewModel.visibleCards}
                visibleDeckKey={viewModel.visibleDeckKey}
                deckToolItems={viewModel.deckToolItems}
                onSelectDeckTool={viewModel.onSelectDeckTool}
                progressModel={viewModel.progressModel}
                labels={viewModel.labels}
                onCardMastered={viewModel.markCardAsMastered}
                onCardForPractice={viewModel.markCardForPractice}
                onResetProgress={viewModel.resetFlipcardsProgress}
            />
        </FlipcardsShell>
    );
}

function FlipcardsShell({ children }) {
    return (
        <main className="flipcards-workspace">
            <div className="flipcards-ambient-light" aria-hidden="true" />
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
