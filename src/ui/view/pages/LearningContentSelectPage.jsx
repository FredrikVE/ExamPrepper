// src/ui/view/pages/LearningContentSelectPage.jsx
import Header from "../components/Header/Header.jsx";
import { HEADER_APPEARANCES, HEADER_LAYOUTS } from "../components/Header/headerVariants.js";
import PageToolsDesktopPanel from "../components/PageTools/PageToolsDesktopPanel.jsx";
import Footer from "../components/Footer/Footer.jsx";
import WorkspaceState from "../components/WorkspaceState/WorkspaceState.jsx";
import TestSetGrid from "../components/LearningContentSelectPage/TestSetGrid.jsx";
import FlashcardDeckGrid from "../components/LearningContentSelectPage/FlashcardDeckGrid.jsx";
import SearchSheetBody from "../components/Search/SearchSheetBody.jsx";
import SearchBackdrop from "../components/Search/SearchBackdrop.jsx";
import SearchFilterField from "../components/Search/SearchFilterField.jsx";
import useSearchSheetEscapeKey from "../components/Search/useSearchSheetEscapeKey.js";
import PageToolsMobileFooterSheet from "../components/PageTools/PageToolsMobileFooterSheet.jsx";
import WorkspaceScaffold from "../components/WorkspaceScaffold/WorkspaceScaffold.jsx";
import LearningContentHeader from "../components/LearningContentHeader/LearningContentHeader.jsx";

export default function LearningContentSelectPage({ viewModel }) {
	useSearchSheetEscapeKey(viewModel.isSearchSheetOpen, viewModel.closeExamSearchSheet);

	const renderSearchContent = () => {
		const hasSearchContent = viewModel.isFilterOptionsMode
			? viewModel.categoryFilterOptions.length > 0
			: viewModel.searchSuggestions.length > 0;

		if (!viewModel.isSearchSheetOpen || !hasSearchContent) {
			return null;
		}

		return (
			<SearchSheetBody
				isFilterOptionsMode={viewModel.isFilterOptionsMode}
				searchSuggestions={viewModel.searchSuggestions}
				suggestionListId={null}
				suggestionListAriaLabel={null}
				activeSuggestionId={null}
				filterOptions={viewModel.categoryFilterOptions}
				selectedFilterValue={viewModel.category}
				onSelectSearchSuggestion={viewModel.selectSearchSuggestion}
				onSelectFilterOption={viewModel.selectCategoryFilterOption}
			/>
		);
	};

	const renderSearchControls = () => (
		<div className="exam-select-controls">
			<SearchFilterField
				className={null}
				searchTerm={viewModel.searchTerm}
				searchPlaceholder={viewModel.searchPlaceholder}
				searchLabel={viewModel.searchLabel}
				onSearchTermChange={viewModel.changeExamSearchTerm}
				onFocusSearch={viewModel.openExamSearchSuggestions}
				onRequestClose={viewModel.closeExamSearchSheet}
				filterButtonLabel={viewModel.categoryLabel}
				filterButtonAriaLabel={viewModel.categoryAriaLabel}
				isFilterOptionsOpen={viewModel.isSearchSheetOpen && viewModel.isFilterOptionsMode}
				onOpenFilterOptions={viewModel.openExamCategoryOptions}
				clearAction={null}
				autocomplete={null}
			/>
		</div>
	);

	const renderPageContent = () => (
		<div className="learning-content-select-page-content">
			{viewModel.actionErrorMessage === null ? null : (
				<p className="learning-content-action-error" role="alert">{viewModel.actionErrorMessage}</p>
			)}

			<LearningContentHeader
				title={viewModel.title}
				subtitle={viewModel.subtitle}
				titleId="learning-content-page-title"
				entries={viewModel.contentToggleEntries}
				activeEntryId={viewModel.desktopActiveEntryId}
				mobileActiveEntryId={viewModel.mobileActiveEntryId}
				onSelectEntry={viewModel.selectContentType}
				ariaLabel={viewModel.contentToggleAriaLabel}
				mobileToggleButtonItems={viewModel.mobileToggleButtonItems}
				expandedMobileToggleButtonGroupId={viewModel.expandedMobileToggleButtonGroupId}
				onOpenMobileToggleButtonGroup={viewModel.openMobileToggleButtonGroup}
				onCloseMobileToggleButtonGroup={viewModel.closeMobileToggleButtonGroup}
				contentToggleBackLabel={viewModel.contentToggleBackLabel}
			/>

			<WorkspaceState state={viewModel.workspaceState}>
				<>
					{viewModel.isTestSetContentActive && (
						<TestSetGrid
							testSets={viewModel.visibleTestSets}
							practiceExamLabel={viewModel.practiceExamLabel}
							questionLabel={viewModel.questionLabel}
							minuteLabel={viewModel.minuteLabel}
							addPlaceholderCode={viewModel.addPlaceholderCode}
							addPlaceholderTitle={viewModel.addPlaceholderTitle}
							addPlaceholderDescription={viewModel.addPlaceholderDescription}
							addPlaceholderNote={viewModel.addPlaceholderNote}
							onSelectTestSet={viewModel.selectTestSet}
						/>
					)}

					{viewModel.isFlipcardsContentActive && (
						<FlashcardDeckGrid
							decks={viewModel.visibleFlipcardDecks}
							eyebrowLabel={viewModel.flipcardsDeckEyebrow}
							cardCountLabel={viewModel.deckCardCountLabel}
							cardUnitLabel={viewModel.deckCardUnitLabel}
							minuteLabel={viewModel.minuteLabel}
							onSelectDeck={viewModel.selectFlipcardDeck}
						/>
					)}

					{viewModel.isMatchCardsContentActive && (
						<FlashcardDeckGrid
							decks={viewModel.visibleFlipcardDecks}
							eyebrowLabel={viewModel.matchCardsDeckEyebrow}
							cardCountLabel={viewModel.deckCardCountLabel}
							cardUnitLabel={viewModel.deckCardUnitLabel}
							minuteLabel={viewModel.minuteLabel}
							onSelectDeck={viewModel.selectMatchCardsDeck}
						/>
					)}
				</>
			</WorkspaceState>
		</div>
	);

	const header = (
		<Header
			appearance={HEADER_APPEARANCES.DEFAULT}
			layout={HEADER_LAYOUTS.DEFAULT}
			backContract={viewModel.backContract}
			heading={null}
			tools={<PageToolsDesktopPanel tools={viewModel.pageTools} />}
			trailing={null}
		/>
	);

	const footer = (
		<Footer
			isOpen={viewModel.isFooterOpen}
			className="exam-search-footer"
			openClassName="exam-search-footer-open"
		>
			<PageToolsMobileFooterSheet
				tools={viewModel.pageTools}
				renderControls={renderSearchControls}
				renderSearchContent={renderSearchContent}
				isSheetOpen={viewModel.isFooterSheetOpen}
				onSheetOpenChange={viewModel.changeExamFooterSheetOpen}
			/>
		</Footer>
	);

	const overlay = (
		<SearchBackdrop
			isOpen={viewModel.isSearchSheetOpen}
			closeLabel={viewModel.searchCloseLabel}
			onClose={viewModel.closeExamSearchSheet}
		/>
	);

	return (
		<WorkspaceScaffold
			className="learning-content-workspace exam-select-layout exam-select-workspace"
			header={header}
			footer={footer}
			overlay={overlay}
			scrollToTopRequestId={null}
		>
			{renderPageContent()}
		</WorkspaceScaffold>
	);
}
