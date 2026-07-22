// src/ui/view/pages/FlipcardsPage.jsx
import { useEffect } from "react";
import { PRESENTATION_MODE } from "../../presentation/presentationMode.js";
import Header from "../components/Header/Header.jsx";
import FlipcardsStudySurface from "../components/FlipcardsPage/FlipcardsStudySurface.jsx";
import FlipcardToolMenu from "../components/FlipcardsPage/FlipcardToolMenu/FlipcardToolMenu.jsx";
import useFlipcardToolMenu from "../components/FlipcardsPage/FlipcardToolMenu/useFlipcardToolMenu.js";
import WorkspaceState from "../components/WorkspaceState/WorkspaceState.jsx";
import WorkspaceScaffold from "../components/WorkspaceScaffold/WorkspaceScaffold.jsx";

export default function FlipcardsPage({ viewModel }) {
	const { isDesktopMenuOpen, closeDesktopMenu, setDesktopMenuOpen } = useFlipcardToolMenu();

	useEffect(() => {
		if (viewModel.presentationMode !== PRESENTATION_MODE.DESKTOP) {
			closeDesktopMenu();
		}
	}, [closeDesktopMenu, viewModel.presentationMode]);

	const headerToolMenu = viewModel.shouldShowHeaderTools ? (
		<FlipcardToolMenu
			presentationMode={viewModel.presentationMode}
			isDesktopMenuOpen={isDesktopMenuOpen}
			onDesktopMenuOpenChange={setDesktopMenuOpen}
			labels={viewModel.labels}
			deckToolItems={viewModel.deckToolItems}
			onDeckToolSelect={viewModel.onSelectDeckTool}
		/>
	) : null;

	return (
		<FlipcardsShell viewModel={viewModel} headerTrailing={headerToolMenu}>
			<WorkspaceState state={viewModel.workspaceState}>
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
			</WorkspaceState>
		</FlipcardsShell>
	);
}

function FlipcardsShell(props) {
	const header = (
		<Header
			showBackButton={props.viewModel.showBackButton}
			backLabel={props.viewModel.backLabel}
			navigationLabel={props.viewModel.navigationLabel}
			onBack={props.viewModel.onBack}
			progressBarModel={null}
			tools={null}
			trailing={props.headerTrailing}
		/>
	);

	return (
		<WorkspaceScaffold
			className="flipcards-workspace"
			contentClassName=""
			header={header}
			footer={null}
			overlay={null}
			scrollToTopRequestId={null}
		>
			{props.children}
		</WorkspaceScaffold>
	);
}
