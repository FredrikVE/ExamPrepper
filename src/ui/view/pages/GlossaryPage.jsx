// src/ui/view/pages/GlossaryPage.jsx
import { PRESENTATION_MODE } from "../../presentation/presentationMode.js";
import usePresentationMode from "../../presentation/usePresentationMode.js";
import GlossaryFooter from "../components/GlossaryPage/GlossaryFooter/GlossaryFooter.jsx";
import GlossaryPanel from "../components/GlossaryPage/GlossaryPanel/GlossaryPanel.jsx";
import TopicAreaPanel from "../components/GlossaryPage/TopicAreaPanel/TopicAreaPanel.jsx";
import Header from "../components/Header/Header.jsx";
import WorkspaceScaffold from "../components/WorkspaceScaffold/WorkspaceScaffold.jsx";
import LearningContentHeader from "../components/LearningContentHeader/LearningContentHeader.jsx";
import WorkspaceState from "../components/WorkspaceState/WorkspaceState.jsx";
import useSearchSheetEscapeKey from "../components/Search/useSearchSheetEscapeKey.js";

export default function GlossaryPage({ viewModel }) {
	useSearchSheetEscapeKey(viewModel.isSearchFilterOptionsOpen, viewModel.closeGlossarySearchFilterOptions);

	const presentationMode = usePresentationMode();
	const isMobile = presentationMode === PRESENTATION_MODE.MOBILE;

	const header = (
		<Header
			showBackButton={viewModel.showBackButton}
			backLabel={viewModel.backLabel}
			navigationLabel={viewModel.navigationLabel}
			onBack={viewModel.onBack}
			progressBarModel={null}
			tools={viewModel.pageTools}
			trailing={null}
		/>
	);

	const footer = viewModel.shouldShowWorkspaceFooter ? (
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
		<WorkspaceScaffold
			className="learning-content-workspace glossary-workspace"
			contentClassName=""
			header={header}
			footer={footer}
			overlay={null}
			scrollToTopRequestId={null}
		>
			<section className="glossary-page" aria-labelledby="glossary-page-title">
				<LearningContentHeader
					title={viewModel.pageTitle}
					subtitle={viewModel.pageSubtitle}
					titleId="glossary-page-title"
					entries={viewModel.contentToggleEntries}
					activeEntryId={viewModel.activeContentType}
					onSelectEntry={viewModel.selectContentType}
					ariaLabel={viewModel.contentToggleAriaLabel}
				/>

				<div className="glossary-page__content">
					<WorkspaceState state={viewModel.workspaceState}>
						<>
							{!isMobile && (
								<TopicAreaPanel
									isSearching={viewModel.isSearching}
									topicAreaListId={viewModel.topicAreaListId}
									allTopicAreaListItem={viewModel.allTopicAreaListItem}
									topicAreaListItems={viewModel.topicAreaListItems}
									topicAreaListAriaLabel={viewModel.pageTitle}
									onSelectTopicArea={viewModel.selectTopicArea}
								/>
							)}

							<GlossaryPanel
								heading={viewModel.glossaryPanelHeading}
								rows={viewModel.glossaryTableRows}
								termColumnHeader={viewModel.termColumnHeader}
								explanationColumnHeader={viewModel.explanationColumnHeader}
								emptyState={viewModel.glossaryPanelEmptyState}
								isMobile={isMobile}
							/>
						</>
					</WorkspaceState>
				</div>
			</section>
		</WorkspaceScaffold>
	);
}
