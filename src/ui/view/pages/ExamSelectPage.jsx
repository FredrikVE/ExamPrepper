// src/ui/view/pages/ExamSelectPage.jsx
import ExamSelectTopbar from "../components/ExamSelectPage/ExamSelectTopbar.jsx";
import ExamSelectIntro from "../components/ExamSelectPage/ExamSelectIntro.jsx";
import ExamSelectGrid from "../components/ExamSelectPage/ExamSelectGrid.jsx";
import SearchSheetContent from "../components/Search/SearchSheetContent.jsx";
import SearchFilterField from "../components/Search/SearchFilterField.jsx";
import useSearchSheetEscapeKey from "../components/Search/useSearchSheetEscapeKey.js";
import PageToolsMobileFooterSheet from "../components/PageTools/PageToolsMobileFooterSheet.jsx";
import WorkspaceScaffoldHeader from "../components/WorkspaceScaffold/WorkspaceScaffoldHeader.jsx";
import WorkspaceScaffoldSearchFooter from "../components/WorkspaceScaffold/WorkspaceScaffoldSearchFooter.jsx";

export default function ExamSelectPage({ viewModel }) {
    useSearchSheetEscapeKey(viewModel.isSearchSheetOpen, viewModel.closeExamSearchSheet);

    const renderSearchContent = () => {
        if (!viewModel.isSearchSheetOpen) {
            return null;
        }

        return (
            <SearchSheetContent
                isFilterOptionsMode={viewModel.isFilterOptionsMode}
                searchSuggestions={viewModel.searchSuggestions}
                filterOptions={viewModel.categoryFilterOptions}
                selectedFilterValue={viewModel.category}
                onSelectSearchSuggestion={viewModel.selectExam}
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
                        addPlaceholderCode={viewModel.addPlaceholderCode}
                        addPlaceholderTitle={viewModel.addPlaceholderTitle}
                        addPlaceholderDescription={viewModel.addPlaceholderDescription}
                        addPlaceholderNote={viewModel.addPlaceholderNote}
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
                <PageToolsMobileFooterSheet
                    tools={viewModel.pageTools}
                    renderControls={renderSearchControls}
                    renderSearchContent={renderSearchContent}
                    onCloseSheet={viewModel.closeExamSearchSheet}
                />
            </WorkspaceScaffoldSearchFooter>
        </div>
    );
}
