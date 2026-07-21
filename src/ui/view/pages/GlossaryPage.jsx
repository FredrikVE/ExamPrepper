// src/ui/view/pages/GlossaryPage.jsx
import { isBlockingLoadStatus } from "../../loadStatus/loadStatus.js";
import GlossaryPanel from "../components/GlossaryPage/GlossaryPanel/GlossaryPanel.jsx";
import TopicAreaPanel from "../components/GlossaryPage/TopicAreaPanel/TopicAreaPanel.jsx";
import Header from "../components/Header/Header.jsx";
import WorkSpaceScaffold from "../components/Shared/WorkSpaceScaffold/WorkSpaceScaffold.jsx";
import WorkspaceMessage from "../components/WorkspaceState/WorkspaceMessage.jsx";
import WorkspaceState from "../components/WorkspaceState/WorkspaceState.jsx";

export default function GlossaryPage({ viewModel }) {
	return (
		<GlossaryPageShell
			showBackButton={viewModel.showBackButton}
			backLabel={viewModel.backLabel}
			navigationLabel={viewModel.navigationLabel}
			onBack={viewModel.onBack}
		>
			{renderPageContent(viewModel)}
		</GlossaryPageShell>
	);
}

const renderPageContent = (viewModel) => {
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

	if (viewModel.pageEmptyState !== null) {
		return (
			<WorkspaceMessage
				title={viewModel.pageEmptyState.title}
				body={viewModel.pageEmptyState.body}
				action={null}
			/>
		);
	}

	return (
		<section className="glossary-page" aria-labelledby="glossary-page-title">
			<header className="glossary-page__heading">
				<h1 id="glossary-page-title">{viewModel.pageTitle}</h1>
				<p>{viewModel.pageDescription}</p>
			</header>

			<div className="glossary-page__content">
				<TopicAreaPanel
					searchTerm={viewModel.glossarySearchTerm}
					searchPlaceholder={viewModel.searchPlaceholder}
					searchClearLabel={viewModel.searchClearLabel}
					searchKeyboardHint={viewModel.searchKeyboardHint}
					searchSummaryLabel={viewModel.searchSummaryLabel}
					isSearching={viewModel.isSearching}
					isSearchComboboxActive={viewModel.isSearchComboboxActive}
					searchActiveDescendantId={viewModel.searchActiveDescendantId}
					topicAreaListId={viewModel.topicAreaListId}
					topicAreaListItems={viewModel.topicAreaListItems}
					activeTopicAreaKey={viewModel.resolvedActiveTopicAreaKey}
					topicAreaListAriaLabel={viewModel.pageTitle}
					onSearchTermChange={viewModel.changeGlossarySearchTerm}
					onClearSearch={viewModel.clearGlossarySearch}
					onMoveSearchSelectionDown={viewModel.moveSearchSelectionDown}
					onMoveSearchSelectionUp={viewModel.moveSearchSelectionUp}
					onOpenSearchKeyboardSelection={viewModel.openSearchKeyboardSelection}
					onSelectTopicArea={viewModel.selectTopicArea}
				/>
				<GlossaryPanel
					heading={viewModel.glossaryPanelHeading}
					rows={viewModel.glossaryTableRows}
					termColumnHeader={viewModel.termColumnHeader}
					explanationColumnHeader={viewModel.explanationColumnHeader}
					emptyState={viewModel.glossaryPanelEmptyState}
				/>
			</div>
		</section>
	);
};

const GlossaryPageShell = ({ showBackButton, backLabel, navigationLabel, onBack, children }) => {
	const header = (
		<Header
			showBackButton={showBackButton}
			backLabel={backLabel}
			navigationLabel={navigationLabel}
			onBack={onBack}
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
