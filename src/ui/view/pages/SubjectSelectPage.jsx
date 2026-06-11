// src/ui/view/pages/SubjectSelectPage.jsx
import SubjectSelectTopbar from "../components/SubjectSelectPage/SubjectSelectTopbar.jsx";
import SubjectSelectControls from "../components/SubjectSelectPage/SubjectSelectControls.jsx";
import SubjectSelectGrid from "../components/SubjectSelectPage/SubjectSelectGrid.jsx";

export default function SubjectSelectPage({ viewModel }) {
    if (viewModel.loading) {
        return (
            <main className="subject-select-workspace">
                <section className="subject-select-empty" aria-label="Laster fag">
                    <h2>Laster fag...</h2>
                </section>
            </main>
        );
    }

    if (viewModel.error) {
        return (
            <main className="subject-select-workspace">
                <section className="subject-select-empty" aria-label="Feil ved lasting av fag">
                    <h2>Feil</h2>
                    <p>{viewModel.error}</p>
                </section>
            </main>
        );
    }

    return (
        <main className="subject-select-workspace">
            <div className="subject-select-ambient-light" aria-hidden="true" />

            <SubjectSelectTopbar
                t={viewModel.t}
                onShowStatistics={viewModel.showStatistics}
            />

            <SubjectSelectControls
                t={viewModel.t}
                searchTerm={viewModel.searchTerm}
                onSearchTermChange={viewModel.setSearchTerm}
                faculty={viewModel.faculty}
                onFacultyChange={viewModel.setFaculty}
                faculties={viewModel.faculties}
            />

            <SubjectSelectGrid
                t={viewModel.t}
                subjects={viewModel.filteredSubjects}
                selectedSubject={viewModel.selectedSubject}
                onSelectSubject={viewModel.selectSubject}
            />
        </main>
    );
}
