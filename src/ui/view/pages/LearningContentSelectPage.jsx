// src/ui/view/pages/LearningContentSelectPage.jsx
import { isBlockingLoadStatus } from "../../loadStatus/loadStatus.js";
import WorkspaceState from "../components/WorkspaceState/WorkspaceState.jsx";
import LearningContentTopbar from "../components/LearningContentSelectPage/LearningContentTopbar.jsx";
import LearningContentIntro from "../components/LearningContentSelectPage/LearningContentIntro.jsx";
import ExamGrid from "../components/LearningContentSelectPage/ExamGrid.jsx";
import FlashcardDeckGrid from "../components/LearningContentSelectPage/FlashcardDeckGrid.jsx";
import SearchSheetBody from "../components/Search/SearchSheetBody.jsx";
import SearchFilterField from "../components/Search/SearchFilterField.jsx";
import useSearchSheetEscapeKey from "../components/Search/useSearchSheetEscapeKey.js";
import PageToolsMobileFooterSheet from "../components/PageTools/PageToolsMobileFooterSheet.jsx";
import SelectPageScaffold from "../components/SelectPageScaffold/SelectPageScaffold.jsx";
import ToggleButtonRow from "../components/ToggleButtonRow/ToggleButtonRow.jsx";

export default function LearningContentSelectPage({ viewModel }) {
    useSearchSheetEscapeKey(viewModel.isSearchSheetOpen, viewModel.closeExamSearchSheet);

    const renderSearchContent = () => {
        if (!viewModel.isSearchSheetOpen) {
            return null;
        }

        return (
            <SearchSheetBody
                isFilterOptionsMode={viewModel.isFilterOptionsMode}
                searchSuggestions={viewModel.searchSuggestions}
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
            />
        </div>
    );


	const renderPageContent = () => {
		if (isBlockingLoadStatus(viewModel.pageStatus)) {
			return (
				<WorkspaceState
					status={viewModel.pageStatus}
					loadingLabel={viewModel.loadingMessage}
					errorTitle={viewModel.errorTitle}
					errorBody={viewModel.pageErrorMessage}
					errorAction={null}
				/>
			);
		}

		return (
			<>
				<LearningContentTopbar title={viewModel.title} />

				<LearningContentIntro
					selectedSubject={viewModel.selectedSubject}
					subtitle={viewModel.subtitle}
				/>

				<ToggleButtonRow
					entries={viewModel.contentToggleEntries}
					activeEntryId={viewModel.activeContentType}
					onSelectEntry={viewModel.selectContentType}
					ariaLabel={viewModel.contentToggleAriaLabel}
				/>

				{viewModel.isExamsContentActive && (
					<ExamGrid
						exams={viewModel.visibleExams}
						emptyTitle={viewModel.emptyTitle}
						emptyMessage={viewModel.emptyMessage}
						practiceExamLabel={viewModel.practiceExamLabel}
						questionLabel={viewModel.questionLabel}
						minuteLabel={viewModel.minuteLabel}
						addPlaceholderCode={viewModel.addPlaceholderCode}
						addPlaceholderTitle={viewModel.addPlaceholderTitle}
						addPlaceholderDescription={viewModel.addPlaceholderDescription}
						addPlaceholderNote={viewModel.addPlaceholderNote}
						onSelectExam={viewModel.selectExam}
					/>
				)}

				{viewModel.isFlipcardsContentActive && (
					<FlashcardDeckGrid
						decks={viewModel.visibleFlipcardDecks}
						eyebrowLabel={viewModel.flipcardsDeckEyebrow}
						cardCountLabel={viewModel.deckCardCountLabel}
						cardUnitLabel={viewModel.deckCardUnitLabel}
						minuteLabel={viewModel.minuteLabel}
						emptyTitle={viewModel.deckEmptyTitle}
						emptyMessage={viewModel.deckEmptyMessage}
						onSelectDeck={viewModel.selectFlashcardDeck}
					/>
				)}

				{viewModel.isMatchCardsContentActive && (
					<FlashcardDeckGrid
						decks={viewModel.visibleFlipcardDecks}
						eyebrowLabel={viewModel.matchCardsDeckEyebrow}
						cardCountLabel={viewModel.deckCardCountLabel}
						cardUnitLabel={viewModel.deckCardUnitLabel}
						minuteLabel={viewModel.minuteLabel}
						emptyTitle={viewModel.deckEmptyTitle}
						emptyMessage={viewModel.deckEmptyMessage}
						onSelectDeck={viewModel.selectMatchCardsDeck}
					/>
				)}

			</>
		);
	};

    return (
        <SelectPageScaffold
            layoutClassName="exam-select-layout"
            workspaceClassName="exam-select-workspace"
            ambientLightClassName="exam-select-ambient-light"
            scrollClassName="exam-select-scroll"
            showBackButton={viewModel.showBackButton}
            backLabel={viewModel.backLabel}
            navigationLabel={viewModel.navigationLabel}
            onBack={viewModel.onBack}
            pageTools={viewModel.pageTools}
            isSearchSheetOpen={viewModel.isSearchSheetOpen}
            onCloseSearchSheet={viewModel.closeExamSearchSheet}
            searchCloseLabel={viewModel.searchCloseLabel}
            isFooterOpen={viewModel.isFooterOpen}
            footerClassName="exam-search-footer"
            footerOpenClassName="exam-search-footer-open"
            footer={(
                <PageToolsMobileFooterSheet
                    tools={viewModel.pageTools}
                    renderControls={renderSearchControls}
                    renderSearchContent={renderSearchContent}
                    isSheetOpen={viewModel.isFooterSheetOpen}
                    onOpenSheet={viewModel.openExamFooterSheet}
                    onSheetOpenChange={viewModel.changeExamFooterSheetOpen}
                />
            )}
        >
			{renderPageContent()}
        </SelectPageScaffold>
    );
}
