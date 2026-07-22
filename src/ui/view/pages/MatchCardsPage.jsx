// src/ui/view/pages/MatchCardsPage.jsx
import Header from "../components/Header/Header.jsx";
import WorkspaceState from "../components/WorkspaceState/WorkspaceState.jsx";
import WorkspaceScaffold from "../components/WorkspaceScaffold/WorkspaceScaffold.jsx";
import MatchCardsGrid from "../components/MatchCardsPage/MatchCardsGrid.jsx";

export default function MatchCardsPage({ viewModel }) {
	const header = (
		<>
			<div className="matchcards-ambient-light" aria-hidden="true" />

			<Header
				showBackButton={viewModel.showBackButton}
				backLabel={viewModel.backLabel}
				navigationLabel={viewModel.navigationLabel}
				onBack={viewModel.onBack}
				progressBarModel={viewModel.headerProgressBarModel}
				tools={null}
				trailing={null}
			/>
		</>
	);

	return (
		<WorkspaceScaffold
			className="matchcards-workspace"
			contentClassName=""
			header={header}
			footer={null}
			overlay={null}
			scrollToTopRequestId={null}
		>
			<WorkspaceState state={viewModel.workspaceState}>
				{viewModel.isRoundComplete ? (
					<MatchCardsRoundComplete viewModel={viewModel} />
				) : (
					<MatchCardsGrid
						termSlots={viewModel.termSlots}
						explanationSlots={viewModel.explanationSlots}
						labels={viewModel.labels}
						boardStyle={viewModel.boardStyle}
						isInteractionLocked={viewModel.isInteractionLocked}
						onSelectSlot={viewModel.handleSelectSlot}
					/>
				)}
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
