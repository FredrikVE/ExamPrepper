import { isBlockingLoadStatus } from "../../loadStatus/loadStatus.js";
import Header from "../components/Header/Header.jsx";
import WorkspaceMessage from "../components/WorkspaceState/WorkspaceMessage.jsx";
import WorkspaceState from "../components/WorkspaceState/WorkspaceState.jsx";
import MatchCardsGrid from "../components/MatchCardsPage/MatchCardsGrid.jsx";

export default function MatchCardsPage({ viewModel }) {
	if (isBlockingLoadStatus(viewModel.pageStatus)) {
		return (
			<MatchCardsShell viewModel={viewModel}>
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
			<MatchCardsShell viewModel={viewModel}>
				<WorkspaceMessage
					title={viewModel.labels.emptyTitle}
					body={viewModel.labels.emptyBody}
					action={null}
				/>
			</MatchCardsShell>
		);
	}

	return (
		<MatchCardsShell viewModel={viewModel}>
			<MatchCardsGrid
				termSlots={viewModel.termSlots}
				explanationSlots={viewModel.explanationSlots}
				labels={viewModel.labels}
				isInteractionLocked={viewModel.isInteractionLocked}
				onSelectSlot={viewModel.handleSelectSlot}
			/>

			{viewModel.isRoundComplete && (
				<section className="matchcards-round-complete" role="status">
					<div>
						<h2>{viewModel.labels.roundCompleteTitle}</h2>
						<p>{viewModel.labels.roundCompleteBody}</p>
					</div>
					<button type="button" className="matchcards-restart-button" onClick={viewModel.restartSession}>
						{viewModel.labels.restartLabel}
					</button>
				</section>
			)}
		</MatchCardsShell>
	);
}

function MatchCardsShell({ viewModel, children }) {
	return (
		<main className="matchcards-workspace">
			<div className="matchcards-ambient-light" aria-hidden="true" />

			<Header
				showBackButton={viewModel.showBackButton}
				backLabel={viewModel.backLabel}
				navigationLabel={viewModel.navigationLabel}
				onBack={viewModel.onBack}
				tools={null}
			/>

			<div className="matchcards-scroll">
				{children}
			</div>
		</main>
	);
}
