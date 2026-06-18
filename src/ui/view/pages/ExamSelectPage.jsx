// src/ui/view/pages/ExamSelectPage.jsx
import ExamSelectTopbar from "../components/ExamSelectPage/ExamSelectTopbar.jsx";
import ExamSelectIntro from "../components/ExamSelectPage/ExamSelectIntro.jsx";
import ExamSelectGrid from "../components/ExamSelectPage/ExamSelectGrid.jsx";
import ExamSelectControls from "../components/ExamSelectPage/ExamSelectControls.jsx";
import SearchSuggestionList from "../components/Shared/SearchSuggestionList.jsx";

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

    const backdropClassName = viewModel.isSearchFocused
        ? "search-backdrop search-backdrop-visible"
        : "search-backdrop";

    const showSuggestions =
        viewModel.isSearchFocused &&
        viewModel.searchSuggestions.length > 0;

    return (
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

            <div className={backdropClassName} aria-hidden="true" />

            <div className="exam-search-footer">
                {showSuggestions && (
                    <SearchSuggestionList
                        suggestions={viewModel.searchSuggestions}
                        onSelect={viewModel.selectExam}
                    />
                )}

                <ExamSelectControls
                    searchTerm={viewModel.searchTerm}
                    onSearchTermChange={viewModel.changeSearchTerm}
                    onSearchFocus={viewModel.focusSearch}
                    onSearchBlur={viewModel.blurSearch}
                    category={viewModel.category}
                    onCategoryChange={viewModel.changeCategory}
                    categories={viewModel.categories}
                    searchPlaceholder="Søk etter eksamen..."
                    allCategoriesLabel="Alle"
                />
            </div>
        </main>
    );
}
