// src/ui/view/pages/GlossaryPage.jsx
import { PRESENTATION_MODE } from "../../presentation/presentationMode.js";
import usePresentationMode from "../../presentation/usePresentationMode.js";
import { isBlockingLoadStatus } from "../../loadStatus/loadStatus.js";
import GlossaryFooter from "../components/GlossaryPage/GlossaryFooter/GlossaryFooter.jsx";
import GlossaryPanel from "../components/GlossaryPage/GlossaryPanel/GlossaryPanel.jsx";
import TopicAreaPanel from "../components/GlossaryPage/TopicAreaPanel/TopicAreaPanel.jsx";
import Header from "../components/Header/Header.jsx";
import WorkSpaceScaffold from "../components/Shared/WorkSpaceScaffold/WorkSpaceScaffold.jsx";
import ToggleButtonRow from "../components/ToggleButtonRow/ToggleButtonRow.jsx";
import WorkspaceMessage from "../components/WorkspaceState/WorkspaceMessage.jsx";
import WorkspaceState from "../components/WorkspaceState/WorkspaceState.jsx";
import useSearchSheetEscapeKey from "../components/Search/useSearchSheetEscapeKey.js";

export default function GlossaryPage({ viewModel }) {
	useSearchSheetEscapeKey(viewModel.isSearchFilterOptionsOpen, viewModel.closeGlossarySearchFilterOptions);

	const presentationMode = usePresentationMode();
	const isMobile = presentationMode === PRESENTATION_MODE.MOBILE;
	const footer = viewModel.pageEmptyState === null ? (
		<GlossaryFooter
			isMobile={isMobile}
			searchTerm={viewModel.glossarySearchTerm}
			searchPlaceholder={viewModel.searchPlaceholder}
			searchLabel={viewModel.searchLabel}
			searchClearLabel={viewModel.searchClearLabel}
			searchKeyboardHint={viewModel.searchKeyboardHint}
			searchSummaryLabel={viewModel.searchSummaryLabel}
			searchScope={viewModel.glossarySearchScope}
			searchScopeLabel={viewModel.searchScopeLabel}
			searchScopeAriaLabel={viewModel.searchScopeAriaLabel}
			searchScopeOptions={viewModel.searchScopeOptions}
			isSearchFilterOptionsOpen={viewModel.isSearchFilterOptionsOpen}
			isSearching={viewModel.isSearching}
			isSearchComboboxActive={viewModel.isSearchComboboxActive}
			searchActiveDescendantId={viewModel.searchActiveDescendantId}
			topicAreaListId={viewModel.topicAreaListId}
			allTopicAreaListItem={viewModel.allTopicAreaListItem}
			topicAreaListItems={viewModel.topicAreaListItems}
			topicAreaListAriaLabel={viewModel.pageTitle}
			sheetTitle={viewModel.mobileChapterSheetTitle}
			sheetSubtitle={viewModel.mobileChapterSheetSubtitle}
			sheetOpenLabel={viewModel.mobileChapterSheetOpenLabel}
			sheetCloseLabel={viewModel.mobileChapterSheetCloseLabel}
			onSearchTermChange={viewModel.changeGlossarySearchTerm}
			onFocusSearch={viewModel.closeGlossarySearchFilterOptions}
			onClearSearch={viewModel.clearGlossarySearch}
			onOpenFilterOptions={viewModel.openGlossarySearchFilterOptions}
			onCloseFilterOptions={viewModel.closeGlossarySearchFilterOptions}
			onSelectFilterOption={viewModel.selectGlossarySearchScope}
			onMoveSearchSelectionDown={viewModel.moveSearchSelectionDown}
			onMoveSearchSelectionUp={viewModel.moveSearchSelectionUp}
			onOpenSearchKeyboardSelection={viewModel.openSearchKeyboardSelection}
			onSelectTopicArea={viewModel.selectTopicArea}
		/>
	) : null;

	return (
		<GlossaryPageShell
			showBackButton={viewModel.showBackButton}
			backLabel={viewModel.backLabel}
			navigationLabel={viewModel.navigationLabel}
			onBack={viewModel.onBack}
			footer={footer}
		>
			<section className="glossary-page" aria-labelledby="glossary-page-title">
				<header className="glossary-page__heading">
					<h1 id="glossary-page-title">{viewModel.pageTitle}</h1>
				</header>

				<ToggleButtonRow
					entries={viewModel.contentToggleEntries}
					activeEntryId={viewModel.activeContentType}
					onSelectEntry={viewModel.selectContentType}
					ariaLabel={viewModel.contentToggleAriaLabel}
				/>

				<div className="glossary-page__content">
					{renderGlossaryWorkspaceContent(viewModel, isMobile)}
				</div>
			</section>
		</GlossaryPageShell>
	);
}

const renderGlossaryWorkspaceContent = (viewModel, isMobile) => {
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
		<>
			{!isMobile ? (
				<TopicAreaPanel
					isSearching={viewModel.isSearching}
					topicAreaListId={viewModel.topicAreaListId}
					allTopicAreaListItem={viewModel.allTopicAreaListItem}
					topicAreaListItems={viewModel.topicAreaListItems}
					topicAreaListAriaLabel={viewModel.pageTitle}
					onSelectTopicArea={viewModel.selectTopicArea}
				/>
			) : null}
			<GlossaryPanel
				heading={viewModel.glossaryPanelHeading}
				rows={viewModel.glossaryTableRows}
				termColumnHeader={viewModel.termColumnHeader}
				explanationColumnHeader={viewModel.explanationColumnHeader}
				emptyState={viewModel.glossaryPanelEmptyState}
				isMobile={isMobile}
			/>
		</>
	);
};

const GlossaryPageShell = ({ showBackButton, backLabel, navigationLabel, onBack, footer, children }) => {
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
		<WorkSpaceScaffold className="glossary-workspace" header={header} footer={footer} scrollToTopRequestId={0}>
			{children}
		</WorkSpaceScaffold>
	);
};
