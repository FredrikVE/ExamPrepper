// src/ui/view/pages/FlipcardsPage.jsx
import { useEffect } from "react";
import { PRESENTATION_MODE } from "../../presentation/presentationMode.js";
import Header from "../components/Header/Header.jsx";
import { HEADER_APPEARANCES, HEADER_LAYOUTS } from "../components/Header/headerVariants.js";
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

	const header = (
		<Header
			appearance={HEADER_APPEARANCES.TRANSPARENT}
			layout={HEADER_LAYOUTS.DEFAULT}
			backContract={viewModel.backContract}
			heading={null}
			tools={null}
			trailing={headerToolMenu}
		/>
	);

	return (
		<WorkspaceScaffold
			className="flipcards-workspace"
			header={header}
			footer={null}
			overlay={null}
			scrollToTopRequestId={null}
		>
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
		</WorkspaceScaffold>
	);
}
