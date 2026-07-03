// src/ui/view/pages/FlipcardsPage.jsx
import { useEffect } from "react";
import { PRESENTATION_MODE } from "../../presentation/presentationMode.js";
import Header from "../components/Header/Header.jsx";
import FlipcardsStudySurface from "../components/FlipcardsPage/FlipcardsStudySurface.jsx";
import FlipcardToolMenu from "../components/FlipcardsPage/FlipcardToolMenu/FlipcardToolMenu.jsx";
import useFlipcardToolMenu from "../components/FlipcardsPage/FlipcardToolMenu/useFlipcardToolMenu.js";

export default function FlipcardsPage({ viewModel }) {
	const { isDesktopMenuOpen, closeDesktopMenu, setDesktopMenuOpen } = useFlipcardToolMenu();

	useEffect(() => {
		if (viewModel.presentationMode !== PRESENTATION_MODE.DESKTOP) {
			closeDesktopMenu();
		}
	}, [closeDesktopMenu, viewModel.presentationMode]);

	/* Verktøymenyen monteres i Headerens trailing-slot slik at triggeren bor i
	   headerens stacking-kontekst (z 30) — ikke som fixed-imposter inne i
	   .flipcards-scroll (z 1), der headerens glassflate maler over den. */
	const headerToolMenu = (
		<FlipcardToolMenu
			presentationMode={viewModel.presentationMode}
			isDesktopMenuOpen={isDesktopMenuOpen}
			onDesktopMenuOpenChange={setDesktopMenuOpen}
			labels={viewModel.labels}
			deckToolItems={viewModel.deckToolItems}
			onDeckToolSelect={viewModel.onSelectDeckTool}
		/>
	);

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
		<FlipcardsShell viewModel={viewModel} headerTrailing={headerToolMenu}>
			<FlipcardsStudySurface
				isDesktopMenuOpen={isDesktopMenuOpen}
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
				trailing={props.headerTrailing}
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
