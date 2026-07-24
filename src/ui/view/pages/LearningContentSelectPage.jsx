// src/ui/view/pages/LearningContentSelectPage.jsx
import Header from "../components/Header/Header.jsx";
import { HEADER_APPEARANCES, HEADER_LAYOUTS } from "../components/Header/headerVariants.js";
import PageToolsDesktopPanel from "../components/PageTools/PageToolsDesktopPanel.jsx";
import Footer from "../components/Footer/Footer.jsx";
import WorkspaceState from "../components/WorkspaceState/WorkspaceState.jsx";
import ExamGrid from "../components/LearningContentSelectPage/ExamGrid.jsx";
import FlashcardDeckGrid from "../components/LearningContentSelectPage/FlashcardDeckGrid.jsx";
import SearchSheetBody from "../components/Search/SearchSheetBody.jsx";
import SearchFilterField from "../components/Search/SearchFilterField.jsx";
import useSearchSheetEscapeKey from "../components/Search/useSearchSheetEscapeKey.js";
import PageToolsMobileFooterSheet from "../components/PageTools/PageToolsMobileFooterSheet.jsx";
import WorkspaceScaffold from "../components/WorkspaceScaffold/WorkspaceScaffold.jsx";
import LearningContentHeader from "../components/LearningContentHeader/LearningContentHeader.jsx";

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
				activeEntryId={viewModel.activeContentType}
				onSelectEntry={viewModel.selectContentType}
				ariaLabel={viewModel.contentToggleAriaLabel}
			/>

			<WorkspaceState state={viewModel.workspaceState}>
				<>
					{viewModel.isExamsContentActive && (
						<ExamGrid
							exams={viewModel.visibleExams}
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
				onOpenSheet={viewModel.openExamFooterSheet}
				onSheetOpenChange={viewModel.changeExamFooterSheetOpen}
			/>
		</Footer>
	);

	const overlay = viewModel.isSearchSheetOpen ? (
		<button
			type="button"
			className="search-backdrop search-backdrop-visible"
			onMouseDown={(event) => {
				event.preventDefault();
			}}
			onClick={viewModel.closeExamSearchSheet}
			aria-label={viewModel.searchCloseLabel}
			tabIndex={-1}
		/>
	) : null;

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
