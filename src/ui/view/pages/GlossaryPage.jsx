// src/ui/view/pages/GlossaryPage.jsx
import { isBlockingLoadStatus } from "../../loadStatus/loadStatus.js";
import GlossaryPanel from "../components/GlossaryPage/GlossaryPanel/GlossaryPanel.jsx";
import TopicAreaPanel from "../components/GlossaryPage/TopicAreaPanel/TopicAreaPanel.jsx";
import Header from "../components/Header/Header.jsx";
import WorkSpaceScaffold from "../components/Shared/WorkSpaceScaffold/WorkSpaceScaffold.jsx";
import WorkspaceMessage from "../components/WorkspaceState/WorkspaceMessage.jsx";
import WorkspaceState from "../components/WorkspaceState/WorkspaceState.jsx";

export default function GlossaryPage({ viewModel }) {
	if (isBlockingLoadStatus(viewModel.pageStatus)) {
		return (
			<GlossaryPageShell viewModel={viewModel}>
				<WorkspaceState
					status={viewModel.pageStatus}
					loadingLabel={viewModel.labels.loadingTitle}
					errorTitle={viewModel.labels.errorTitle}
					errorBody={viewModel.pageErrorMessage}
					errorAction={null}
				/>
			</GlossaryPageShell>
		);
	}

	if (viewModel.emptyStateKind === "no-topic-areas" || viewModel.emptyStateKind === "no-glossary-entries") {
		return (
			<GlossaryPageShell viewModel={viewModel}>
				<WorkspaceMessage
					title={viewModel.emptyState.title}
					body={viewModel.emptyState.body}
					action={null}
				/>
			</GlossaryPageShell>
		);
	}

	return (
		<GlossaryPageShell viewModel={viewModel}>
			<section className="glossary-page" aria-labelledby="glossary-page-title">
				<header className="glossary-page__heading">
					<h1 id="glossary-page-title">{viewModel.labels.pageTitle}</h1>
					<p>{viewModel.labels.pageDescription}</p>
				</header>

				<div className="glossary-page__content">
					<TopicAreaPanel
						searchTerm={viewModel.glossarySearchTerm}
						searchPlaceholder={viewModel.labels.searchPlaceholder}
						searchClearLabel={viewModel.labels.searchClearLabel}
						searchKeyboardHint={viewModel.labels.searchKeyboardHint}
						searchSummaryLabel={viewModel.searchSummaryLabel}
						navigationLabel={viewModel.labels.pageTitle}
						isSearching={viewModel.isSearching}
						isSearchComboboxActive={viewModel.isSearchComboboxActive}
						searchActiveDescendantId={viewModel.searchActiveDescendantId}
						topicAreaListItems={viewModel.topicAreaListItems}
						onSearchTermChange={viewModel.changeGlossarySearchTerm}
						onClearSearch={viewModel.clearGlossarySearch}
						onMoveSearchSelectionDown={viewModel.moveSearchSelectionDown}
						onMoveSearchSelectionUp={viewModel.moveSearchSelectionUp}
						onOpenSearchKeyboardSelection={viewModel.openSearchKeyboardSelection}
						onSelectTopicArea={viewModel.selectTopicArea}
					/>

					<GlossaryPanel
						heading={viewModel.glossaryPanelHeading}
						tableRows={viewModel.glossaryTableRows}
						termColumnHeader={viewModel.labels.termColumnHeader}
						explanationColumnHeader={viewModel.labels.explanationColumnHeader}
						emptyState={viewModel.emptyStateKind === "no-search-results" ? viewModel.emptyState : null}
					/>
				</div>
			</section>
		</GlossaryPageShell>
	);
}

const GlossaryPageShell = ({ viewModel, children }) => {
	const header = (
		<Header
			showBackButton={viewModel.showBackButton}
			backLabel={viewModel.backLabel}
			navigationLabel={viewModel.navigationLabel}
			onBack={viewModel.onBack}
			progressBarModel={null}
			tools={null}
		/>
	);

	return (
		<WorkSpaceScaffold className="glossary-workspace" header={header} scrollToTopRequestId={0}>
			{children}
		</WorkSpaceScaffold>
	);
};
