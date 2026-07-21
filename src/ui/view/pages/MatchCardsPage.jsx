// src/ui/view/pages/MatchCardsPage.jsx
import { isBlockingLoadStatus } from "../../loadStatus/loadStatus.js";
import Header from "../components/Header/Header.jsx";
import WorkspaceMessage from "../components/WorkspaceState/WorkspaceMessage.jsx";
import WorkspaceState from "../components/WorkspaceState/WorkspaceState.jsx";
import WorkSpaceScaffold from "../components/Shared/WorkSpaceScaffold/WorkSpaceScaffold.jsx";
import MatchCardsGrid from "../components/MatchCardsPage/MatchCardsGrid.jsx";

export default function MatchCardsPage({ viewModel }) {
	return (
		<MatchCardsShell viewModel={viewModel} progressBarModel={viewModel.headerProgressBarModel}>
			{renderMatchCardsContent(viewModel)}
		</MatchCardsShell>
	);
}

function renderMatchCardsContent(viewModel) {
	if (isBlockingLoadStatus(viewModel.pageStatus)) {
		return (
			<WorkspaceState
				status={viewModel.pageStatus}
				loadingLabel={viewModel.loadingTitle}
				errorTitle={viewModel.errorTitle}
				errorBody={viewModel.pageErrorMessage}
				errorAction={null}
			/>
		);
	}

	if (!viewModel.session) {
		return (
			<WorkspaceMessage
				title={viewModel.emptyTitle}
				body={viewModel.emptyBody}
				action={null}
			/>
		);
	}

	if (viewModel.isRoundComplete) {
		return <MatchCardsRoundComplete viewModel={viewModel} />;
	}

	return (
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
		<WorkSpaceScaffold className="matchcards-workspace" header={header} footer={null} scrollToTopRequestId={0}>
			{children}
		</WorkSpaceScaffold>
	);
}
