// src/ui/view/pages/GlossaryPage.jsx
import { PRESENTATION_MODE } from "../../presentation/presentationMode.js";
import usePresentationMode from "../../presentation/usePresentationMode.js";
import GlossaryFooter from "../components/GlossaryPage/GlossaryFooter/GlossaryFooter.jsx";
import GlossaryPanel from "../components/GlossaryPage/GlossaryPanel/GlossaryPanel.jsx";
import TopicAreaPanel from "../components/GlossaryPage/TopicAreaPanel/TopicAreaPanel.jsx";
import Header from "../components/Header/Header.jsx";
import { HEADER_APPEARANCES, HEADER_LAYOUTS } from "../components/Header/headerVariants.js";
import WorkspaceScaffold from "../components/WorkspaceScaffold/WorkspaceScaffold.jsx";
import LearningContentHeader from "../components/LearningContentHeader/LearningContentHeader.jsx";
import WorkspaceState from "../components/WorkspaceState/WorkspaceState.jsx";
import SearchBackdrop from "../components/Search/SearchBackdrop.jsx";
import useSearchSheetEscapeKey from "../components/Search/useSearchSheetEscapeKey.js";

export default function GlossaryPage({ viewModel }) {
	useSearchSheetEscapeKey(viewModel.isSearchPopupOpen, viewModel.closeGlossarySearchPopup);

	const presentationMode = usePresentationMode();
	const isMobile = presentationMode === PRESENTATION_MODE.MOBILE;

	const header = (
		<Header
			appearance={HEADER_APPEARANCES.TRANSPARENT}
			layout={HEADER_LAYOUTS.DEFAULT}
			backContract={viewModel.backContract}
			heading={null}
			tools={null}
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
			searchSuggestionListAriaLabel={viewModel.searchSuggestionListAriaLabel}
			chapterFilterValue={viewModel.chapterFilterValue}
			chapterFilterLabel={viewModel.chapterFilterLabel}
			searchFilterAriaLabel={viewModel.searchFilterAriaLabel}
			chapterFilterOptions={viewModel.chapterFilterOptions}
			isSearchPopupOpen={viewModel.isSearchPopupOpen}
			isSearchFilterOptionsOpen={viewModel.isSearchFilterOptionsOpen}
			isSearchAutocompleteActive={viewModel.isSearchAutocompleteActive}
			isSearching={viewModel.isSearching}
			autocompleteSuggestions={viewModel.autocompleteSuggestions}
			autocompleteListId={viewModel.autocompleteListId}
			searchActiveDescendantId={viewModel.searchActiveDescendantId}
			allTopicAreaListItem={viewModel.allTopicAreaListItem}
			topicAreaListItems={viewModel.topicAreaListItems}
			topicAreaListAriaLabel={viewModel.pageTitle}
			sheetTitle={viewModel.mobileChapterSheetTitle}
			sheetSubtitle={viewModel.mobileChapterSheetSubtitle}
			sheetOpenLabel={viewModel.mobileChapterSheetOpenLabel}
			sheetCloseLabel={viewModel.mobileChapterSheetCloseLabel}
			onSearchTermChange={viewModel.changeGlossarySearchTerm}
			onFocusSearch={viewModel.focusGlossarySearch}
			onClearSearch={viewModel.clearGlossarySearch}
			onRequestClose={viewModel.closeGlossarySearchPopup}
			onOpenFilterOptions={viewModel.openGlossarySearchFilterOptions}
			onSelectFilterOption={viewModel.selectGlossaryChapterFilter}
			onSelectSearchSuggestion={viewModel.selectAutocompleteSuggestion}
			onMoveSearchSelectionDown={viewModel.moveSearchSelectionDown}
			onMoveSearchSelectionUp={viewModel.moveSearchSelectionUp}
			onOpenSearchKeyboardSelection={viewModel.openSearchKeyboardSelection}
			onSelectTopicArea={viewModel.selectTopicArea}
		/>
	) : null;

	const overlay = (
		<SearchBackdrop
			isOpen={viewModel.isSearchPopupOpen}
			closeLabel={viewModel.searchCloseLabel}
			onClose={viewModel.closeGlossarySearchPopup}
		/>
	);

	return (
		<WorkspaceScaffold
			className="learning-content-workspace glossary-workspace"
			header={header}
			footer={footer}
			overlay={overlay}
			scrollToTopRequestId={null}
		>
			<section className="glossary-page" aria-labelledby="glossary-page-title">
				<LearningContentHeader
					title={viewModel.pageTitle}
					subtitle={viewModel.pageSubtitle}
					titleId="glossary-page-title"
					entries={viewModel.contentToggleEntries}
					activeEntryId={viewModel.activeContentType}
					mobileActiveEntryId={viewModel.mobileActiveEntryId}
					onSelectEntry={viewModel.selectContentType}
					ariaLabel={viewModel.contentToggleAriaLabel}
					mobileToggleButtonItems={viewModel.mobileToggleButtonItems}
					expandedMobileToggleButtonGroupId={viewModel.expandedMobileToggleButtonGroupId}
					onOpenMobileToggleButtonGroup={viewModel.openMobileToggleButtonGroup}
					onCloseMobileToggleButtonGroup={viewModel.closeMobileToggleButtonGroup}
					contentToggleBackLabel={viewModel.contentToggleBackLabel}
				/>

				<div className="glossary-page__content">
					<WorkspaceState state={viewModel.workspaceState}>
						<>
							{!isMobile && (
								<TopicAreaPanel
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
								connectionsColumnHeader={viewModel.connectionsColumnHeader}
								masteryColumnHeader={viewModel.masteryColumnHeader}
								openNetworkLabel={viewModel.openNetworkLabel}
								emptyState={viewModel.glossaryPanelEmptyState}
								isMobile={isMobile}
								network={viewModel.glossaryNetwork}
								isNetworkLoading={viewModel.isGlossaryNetworkLoading}
								networkError={viewModel.glossaryNetworkError}
								networkTitle={viewModel.networkTitle}
								networkInstructions={viewModel.networkInstructions}
								networkCloseLabel={viewModel.networkCloseLabel}
								onOpenNetwork={viewModel.selectGlossaryNetworkConcept}
								onCloseNetwork={viewModel.closeGlossaryNetwork}
							/>
						</>
					</WorkspaceState>
				</div>
			</section>
		</WorkspaceScaffold>
	);
}
