// src/ui/view/pages/SubjectSelectPage.jsx
import SubjectSelectTopbar from "../components/SubjectSelectPage/SubjectSelectTopbar.jsx";
import SubjectSelectControls from "../components/SubjectSelectPage/SubjectSelectControls.jsx";
import SubjectSelectGrid from "../components/SubjectSelectPage/SubjectSelectGrid.jsx";
import SearchSuggestionList from "../components/Shared/SearchSuggestionList.jsx";

export default function SubjectSelectPage({ viewModel }) {
    if (viewModel.subjectsLoading) {
        return (
            <main className="subject-select-workspace">
                <section className="subject-select-empty" aria-label={viewModel.loadingAriaLabel}>
                    <h2>{viewModel.loadingTitle}</h2>
                </section>
            </main>
        );
    }

    if (viewModel.subjectsLoadError) {
        return (
            <main className="subject-select-workspace">
                <section className="subject-select-empty" aria-label={viewModel.errorAriaLabel}>
                    <h2>{viewModel.errorTitle}</h2>
                    <p>{viewModel.subjectsLoadError}</p>
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
        <div className="subject-select-layout">
            <main className="subject-select-workspace">
                <div className="subject-select-ambient-light" aria-hidden="true" />

                <SubjectSelectTopbar t={viewModel.t} />

                <SubjectSelectGrid
                    t={viewModel.t}
                    subjects={viewModel.filteredSubjects}
                    selectedSubject={viewModel.selectedSubject}
                    emptyTitle={viewModel.emptyTitle}
                    emptyDescription={viewModel.emptyDescription}
                    onSelectSubject={viewModel.selectSubject}
                />
            </main>

            <button
                type="button"
                className={backdropClassName}
                onClick={viewModel.closeSearch}
                aria-label={viewModel.searchCloseLabel}
                aria-hidden={!viewModel.isSearchFocused}
                tabIndex={viewModel.isSearchFocused ? 0 : -1}
            />

            <div
                className="subject-search-footer"
                onBlur={(event) => {
                    if (!event.currentTarget.contains(event.relatedTarget)) {
                        viewModel.closeSearch();
                    }
                }}
            >
                {showSuggestions && (
                    <SearchSuggestionList
                        suggestions={viewModel.searchSuggestions}
                        onSelect={viewModel.selectSubject}
                    />
                )}

                <SubjectSelectControls
                    t={viewModel.t}
                    searchTerm={viewModel.searchTerm}
                    onSearchTermChange={viewModel.changeSearchTerm}
                    onSearchFocus={viewModel.focusSearch}
                    onCloseSearch={viewModel.closeSearch}
                    faculty={viewModel.faculty}
                    facultyLabel={viewModel.facultyLabel}
                    onFacultyChange={viewModel.changeFaculty}
                    faculties={viewModel.faculties}
                />
            </div>
        </div>
    );
}
