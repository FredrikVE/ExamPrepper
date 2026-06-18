// src/ui/view/pages/ExamSelectPage.jsx
import ExamSelectTopbar from "../components/ExamSelectPage/ExamSelectTopbar.jsx";
import ExamSelectIntro from "../components/ExamSelectPage/ExamSelectIntro.jsx";
import ExamSelectGrid from "../components/ExamSelectPage/ExamSelectGrid.jsx";
import ExamSelectControls from "../components/ExamSelectPage/ExamSelectControls.jsx";
import ExamSearchSheetContent from "../components/ExamSelectPage/ExamSearchSheetContent.jsx";

export default function ExamSelectPage({ viewModel }) {
    if (viewModel.examsLoading) {
        return (
            <main className="exam-select-workspace">
                <div className="exam-select-ambient-light" aria-hidden="true" />

                <section className="exam-select-state">
                    <p>{viewModel.loadingMessage}</p>
                </section>
            </main>
        );
    }

    if (viewModel.examsLoadError) {
        return (
            <main className="exam-select-workspace">
                <div className="exam-select-ambient-light" aria-hidden="true" />

                <section className="exam-select-state">
                    <p>{viewModel.examsLoadError}</p>
                </section>
            </main>
        );
    }

    const backdropClassName = viewModel.isSearchSheetOpen
        ? "search-backdrop search-backdrop-visible"
        : "search-backdrop";

    return (
        <div className="exam-select-layout">
            <main className="exam-select-workspace">
                <div className="exam-select-ambient-light" aria-hidden="true" />

                <ExamSelectTopbar title={viewModel.title} />

                <ExamSelectIntro
                    selectedSubject={viewModel.selectedSubject}
                    subtitle={viewModel.subtitle}
                />

                <ExamSelectGrid
                    exams={viewModel.exams}
                    emptyTitle={viewModel.emptyTitle}
                    emptyMessage={viewModel.emptyMessage}
                    practiceExamLabel={viewModel.practiceExamLabel}
                    questionLabel={viewModel.questionLabel}
                    minuteLabel={viewModel.minuteLabel}
                    onSelectExam={viewModel.selectExam}
                />
            </main>

            <button
                type="button"
                className={backdropClassName}
                onClick={viewModel.closeExamSearchSheet}
                aria-label={viewModel.searchCloseLabel}
                aria-hidden={!viewModel.isSearchSheetOpen}
                tabIndex={viewModel.isSearchSheetOpen ? 0 : -1}
            />

            <div
                className="exam-search-footer"
                onBlur={(event) => {
                    if (!event.currentTarget.contains(event.relatedTarget)) {
                        viewModel.closeExamSearchSheet();
                    }
                }}
            >
                {viewModel.isSearchSheetOpen && (
                    <ExamSearchSheetContent
                        isFilterOptionsMode={viewModel.isFilterOptionsMode}
                        searchSuggestions={viewModel.searchSuggestions}
                        filterOptions={viewModel.categoryFilterOptions}
                        selectedFilterValue={viewModel.category}
                        onSelectSearchSuggestion={viewModel.selectExam}
                        onSelectFilterOption={viewModel.selectCategoryFilterOption}
                    />
                )}

                <ExamSelectControls
                    searchTerm={viewModel.searchTerm}
                    onSearchTermChange={viewModel.changeSearchTerm}
                    onExamSearchTermChange={viewModel.changeExamSearchTerm}
                    onSearchFocus={viewModel.focusSearch}
                    onOpenExamSearchSuggestions={viewModel.openExamSearchSuggestions}
                    onCloseSearch={viewModel.closeSearch}
                    onCloseExamSearchSheet={viewModel.closeExamSearchSheet}
                    onOpenExamCategoryOptions={viewModel.openExamCategoryOptions}
                    isFilterOptionsVisible={viewModel.isSearchSheetOpen && viewModel.isFilterOptionsMode}
                    category={viewModel.category}
                    categoryLabel={viewModel.categoryLabel}
                    onCategoryChange={viewModel.changeCategory}
                    categories={viewModel.categories}
                    searchPlaceholder={viewModel.searchPlaceholder}
                    searchLabel={viewModel.searchLabel}
                    categoryAriaLabel={viewModel.categoryAriaLabel}
                    allCategoriesLabel={viewModel.allCategoriesLabel}
                />
            </div>
        </div>
    );
}
