// src/ui/view/pages/ExamSelectPage.jsx
import ExamSelectTopbar from "../components/ExamSelectPage/ExamSelectTopbar.jsx";
import ExamSelectIntro from "../components/ExamSelectPage/ExamSelectIntro.jsx";
import ExamSelectGrid from "../components/ExamSelectPage/ExamSelectGrid.jsx";
import ExamSelectControls from "../components/ExamSelectPage/ExamSelectControls.jsx";
import SearchSheetContent from "../components/Shared/SearchSheetContent.jsx";
import useSearchSheetEscapeKey from "../components/Shared/useSearchSheetEscapeKey.js";
import PageToolsMobileFooterSheet from "../components/PageTools/PageToolsMobileFooterSheet.jsx";
import WorkspaceScaffoldHeader from "../components/WorkspaceScaffold/WorkspaceScaffoldHeader.jsx";
import WorkspaceScaffoldSearchFooter from "../components/WorkspaceScaffold/WorkspaceScaffoldSearchFooter.jsx";

export default function ExamSelectPage({ viewModel }) {
    useSearchSheetEscapeKey(viewModel.isSearchSheetOpen, viewModel.closeExamSearchSheet);

    if (viewModel.examsLoading) {
        return (
            <div className="exam-select-layout">
                <main className="exam-select-workspace">
                    <div className="exam-select-ambient-light" aria-hidden="true" />

                    <section className="exam-select-state">
                        <p>{viewModel.loadingMessage}</p>
                    </section>
                </main>
            </div>
        );
    }

    if (viewModel.examsLoadError) {
        return (
            <div className="exam-select-layout">
                <main className="exam-select-workspace">
                    <div className="exam-select-ambient-light" aria-hidden="true" />

                    <section className="exam-select-state">
                        <p>{viewModel.examsLoadError}</p>
                    </section>
                </main>
            </div>
        );
    }

    return (
        <div className="exam-select-layout">
            <main className="exam-select-workspace">
                <div className="exam-select-ambient-light" aria-hidden="true" />

                <WorkspaceScaffoldHeader
                    showBackButton={viewModel.showBackButton}
                    backLabel={viewModel.backLabel}
                    navigationLabel={viewModel.navigationLabel}
                    onBack={viewModel.onBack}
                    tools={viewModel.pageTools}
                />

                <div className="exam-select-scroll">
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
                </div>
            </main>

            {viewModel.isSearchSheetOpen && (
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
            )}

            <WorkspaceScaffoldSearchFooter
                isOpen={viewModel.isSearchSheetOpen}
                className="exam-search-footer"
                openClassName="exam-search-footer-open"
                onBlur={(event) => {
                    if (!event.currentTarget.contains(event.relatedTarget)) {
                        viewModel.closeExamSearchSheet();
                    }
                }}
            >
                {viewModel.isSearchSheetOpen && (
                    <SearchSheetContent
                        isFilterOptionsMode={viewModel.isFilterOptionsMode}
                        searchSuggestions={viewModel.searchSuggestions}
                        filterOptions={viewModel.categoryFilterOptions}
                        selectedFilterValue={viewModel.category}
                        onSelectSearchSuggestion={viewModel.selectExam}
                        onSelectFilterOption={viewModel.selectCategoryFilterOption}
                    />
                )}

                <PageToolsMobileFooterSheet tools={viewModel.pageTools}>
                    <ExamSelectControls
                        searchTerm={viewModel.searchTerm}
                        onExamSearchTermChange={viewModel.changeExamSearchTerm}
                        onOpenExamSearchSuggestions={viewModel.openExamSearchSuggestions}
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
                </PageToolsMobileFooterSheet>
            </WorkspaceScaffoldSearchFooter>
        </div>
    );
}
