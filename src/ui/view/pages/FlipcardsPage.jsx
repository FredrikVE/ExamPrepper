// src/ui/view/pages/FlipcardsPage.jsx
import Header from "../components/Header/Header.jsx";
import FlipcardsStudySurface from "../components/FlipcardsPage/FlipcardsStudySurface.jsx";

export default function FlipcardsPage({ viewModel }) {
	if (viewModel.flashcardsLoading) {
		return (
			<FlipcardsShell viewModel={viewModel}>
				<FlipcardsState
					title={viewModel.labels.loadingTitle}
				/>
			</FlipcardsShell>
		);
	}

	if (viewModel.flashcardsLoadError) {
		return (
			<FlipcardsShell viewModel={viewModel}>
				<FlipcardsState
					title={viewModel.labels.errorTitle}
					body={viewModel.flashcardsLoadError}
				/>
			</FlipcardsShell>
		);
	}

	if (viewModel.flashcards.length === 0) {
		return (
			<FlipcardsShell viewModel={viewModel}>
				<FlipcardsState
					title={viewModel.labels.emptyTitle}
					body={viewModel.labels.emptyBody}
				/>
			</FlipcardsShell>
		);
	}

	return (
		<FlipcardsShell viewModel={viewModel}>
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

function FlipcardsShell(props) {
	return (
		<main className="flipcards-workspace">
			<div className="flipcards-ambient-light" aria-hidden="true" />

			<Header
				showBackButton={props.viewModel.showBackButton}
				backLabel={props.viewModel.backLabel}
				navigationLabel={props.viewModel.navigationLabel}
				onBack={props.viewModel.onBack}
				tools={null}
			/>

			<div className="flipcards-scroll">
				{props.children}
			</div>
		</main>
	);
}

function FlipcardsState(props) {
	return (
		<section className="flipcards-state">
			<h1>{props.title}</h1>
			{props.body && <p>{props.body}</p>}
		</section>
	);
}
