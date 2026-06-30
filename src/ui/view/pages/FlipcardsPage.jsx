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
                activeCardIndex={viewModel.activeCardIndex}
                activeCard={viewModel.activeCard}
                nextCard={viewModel.nextCard}
                isActiveCardFlipped={viewModel.isActiveCardFlipped}
                isDeckComplete={viewModel.isDeckComplete}
                hasPreviousCard={viewModel.hasPreviousCard}
                hasNextCard={viewModel.hasNextCard}
                activeCardPositionLabel={viewModel.activeCardPositionLabel}
                deckToolItems={viewModel.deckToolItems}
                progressModel={viewModel.progressModel}
                presentationMode={viewModel.presentationMode}
                labels={viewModel.labels}
                onGoToPreviousCard={viewModel.goToPreviousCard}
                onGoToNextCard={viewModel.goToNextCard}
                onGoToCard={viewModel.goToCard}
                onToggleActiveCard={viewModel.toggleActiveCard}
                onCompleteForPractice={viewModel.completeCardForPractice}
                onCompleteAsMastered={viewModel.completeCardAsMastered}
                onRestartSession={viewModel.restartFlipcardSession}
                onSelectDeckTool={viewModel.onSelectDeckTool}
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
