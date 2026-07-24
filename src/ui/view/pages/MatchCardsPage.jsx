// src/ui/view/pages/MatchCardsPage.jsx
import Header from "../components/Header/Header.jsx";
import { HEADER_APPEARANCES, HEADER_LAYOUTS } from "../components/Header/headerVariants.js";
import ProgressBar from "../components/Shared/ProgressBar/ProgressBar.jsx";
import { PROGRESS_BAR_VARIANTS } from "../components/Shared/ProgressBar/progressBarVariants.js";
import WorkspaceState from "../components/WorkspaceState/WorkspaceState.jsx";
import WorkspaceScaffold from "../components/WorkspaceScaffold/WorkspaceScaffold.jsx";
import MatchCardsGrid from "../components/MatchCardsPage/MatchCardsGrid.jsx";

export default function MatchCardsPage({ viewModel }) {
	let headerHeading = null;

	if (viewModel.headerProgressBarModel !== null) {
		headerHeading = (
			<ProgressBar
				variant={PROGRESS_BAR_VARIANTS.HEADER}
				model={viewModel.headerProgressBarModel}
			/>
		);
	}

	let workspaceContent;

	if (viewModel.isRoundComplete) {
		workspaceContent = <MatchCardsRoundComplete viewModel={viewModel} />;
	} else {
		workspaceContent = (
			<MatchCardsGrid
				termSlots={viewModel.termSlots}
				explanationSlots={viewModel.explanationSlots}
				labels={viewModel.labels}
				boardStyle={viewModel.boardStyle}
				isInteractionLocked={viewModel.isInteractionLocked}
				onSelectSlot={viewModel.handleSelectSlot}
			/>
		);
	}

	const header = (
		<>
			<div className="matchcards-ambient-light" aria-hidden="true" />

			<Header
				appearance={HEADER_APPEARANCES.TRANSPARENT}
				layout={HEADER_LAYOUTS.MATCHCARDS_PROGRESS}
				backContract={viewModel.backContract}
				heading={headerHeading}
				tools={null}
				trailing={null}
			/>
		</>
	);

	return (
		<WorkspaceScaffold
			className="matchcards-workspace"
			header={header}
			footer={null}
			overlay={null}
			scrollToTopRequestId={null}
		>
			<WorkspaceState state={viewModel.workspaceState}>
				{workspaceContent}
			</WorkspaceState>
		</WorkspaceScaffold>
	);
}

function MatchCardsRoundComplete({ viewModel }) {
	return (
		<section className="matchcards-round-complete" role="status">
			<div className="matchcards-round-complete-copy">
				<h2>{viewModel.labels.roundCompleteTitle}</h2>
				<p>{viewModel.labels.roundCompleteBody}</p>
			</div>

			<button type="button" className="matchcards-restart-button" onClick={viewModel.restartSession}>
				{viewModel.labels.restartLabel}
			</button>
		</section>
	);
}