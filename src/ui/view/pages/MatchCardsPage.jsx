import { isBlockingLoadStatus } from "../../loadStatus/loadStatus.js";
import Header from "../components/Header/Header.jsx";
import WorkspaceMessage from "../components/WorkspaceState/WorkspaceMessage.jsx";
import WorkspaceState from "../components/WorkspaceState/WorkspaceState.jsx";
import WorkSpaceScaffold from "../components/Shared/WorkSpaceScaffold/WorkSpaceScaffold.jsx";
import MatchCardsGrid from "../components/MatchCardsPage/MatchCardsGrid.jsx";

export default function MatchCardsPage({ viewModel }) {
	if (isBlockingLoadStatus(viewModel.pageStatus)) {
		return (
			<MatchCardsShell viewModel={viewModel} progressBarModel={null}>
				<WorkspaceState
					status={viewModel.pageStatus}
					loadingLabel={viewModel.labels.loadingTitle}
					errorTitle={viewModel.labels.errorTitle}
					errorBody={viewModel.pageErrorMessage}
					errorAction={null}
				/>
			</MatchCardsShell>
		);
	}

	if (!viewModel.session) {
		return (
			<MatchCardsShell viewModel={viewModel} progressBarModel={null}>
				<WorkspaceMessage
					title={viewModel.labels.emptyTitle}
					body={viewModel.labels.emptyBody}
					action={null}
				/>
			</MatchCardsShell>
		);
	}

	if (viewModel.isRoundComplete) {
		return (
			<MatchCardsShell viewModel={viewModel} progressBarModel={viewModel.progressBarModel}>
				<MatchCardsRoundComplete viewModel={viewModel} />
			</MatchCardsShell>
		);
	}

	return (
		<MatchCardsShell viewModel={viewModel} progressBarModel={viewModel.progressBarModel}>
			<MatchCardsGrid
				termSlots={viewModel.termSlots}
				explanationSlots={viewModel.explanationSlots}
				labels={viewModel.labels}
				boardStyle={viewModel.boardStyle}
				isInteractionLocked={viewModel.isInteractionLocked}
				onSelectSlot={viewModel.handleSelectSlot}
			/>
		</MatchCardsShell>
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

function MatchCardsShell({ viewModel, progressBarModel, children }) {
	const header = (
		<>
			<div className="matchcards-ambient-light" aria-hidden="true" />

			<Header
				showBackButton={viewModel.showBackButton}
				backLabel={viewModel.backLabel}
				navigationLabel={viewModel.navigationLabel}
				onBack={viewModel.onBack}
				progressBarModel={progressBarModel}
				tools={null}
			/>
		</>
	);

	return (
		<WorkSpaceScaffold className="matchcards-workspace" header={header} scrollToTopRequestId={0}>
			{children}
		</WorkSpaceScaffold>
	);
}
