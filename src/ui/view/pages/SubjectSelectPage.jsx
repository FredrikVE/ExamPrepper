// src/ui/view/pages/SubjectSelectPage.jsx
import SubjectSelectTopbar from "../components/SubjectSelectPage/SubjectSelectTopbar.jsx";
import SubjectSelectControls from "../components/SubjectSelectPage/SubjectSelectControls.jsx";
import SubjectSelectGrid from "../components/SubjectSelectPage/SubjectSelectGrid.jsx";
import SearchSheetContent from "../components/Shared/SearchSheetContent.jsx";
import useSearchSheetEscapeKey from "../components/Shared/useSearchSheetEscapeKey.js";

export default function SubjectSelectPage({ viewModel }) {
	useSearchSheetEscapeKey(viewModel.isSearchSheetOpen, viewModel.closeSubjectSearchSheet);

	if (viewModel.subjectsLoading) {
		return (
			<div className="subject-select-layout">
				<main className="subject-select-workspace">
					<section className="subject-select-empty" aria-label={viewModel.loadingAriaLabel}>
						<h2>{viewModel.loadingTitle}</h2>
					</section>
				</main>
			</div>
		);
	}

	if (viewModel.subjectsLoadError) {
		return (
			<div className="subject-select-layout">
				<main className="subject-select-workspace">
					<section className="subject-select-empty" aria-label={viewModel.errorAriaLabel}>
						<h2>{viewModel.errorTitle}</h2>
						<p>{viewModel.subjectsLoadError}</p>
					</section>
				</main>
			</div>
		);
	}

	const backdropClassName = viewModel.isSearchSheetOpen
		? "search-backdrop search-backdrop-visible"
		: "search-backdrop";
	const searchFooterClassName = viewModel.isSearchSheetOpen
		? "subject-search-footer subject-search-footer-open"
		: "subject-search-footer";

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
				onClick={viewModel.closeSubjectSearchSheet}
				aria-label={viewModel.searchCloseLabel}
				aria-hidden={!viewModel.isSearchSheetOpen}
				tabIndex={viewModel.isSearchSheetOpen ? 0 : -1}
			/>

			<div
				className={searchFooterClassName}
				onBlur={(event) => {
					if (!event.currentTarget.contains(event.relatedTarget)) {
						viewModel.closeSubjectSearchSheet();
					}
				}}
			>
				{viewModel.isSearchSheetOpen && (
					<SearchSheetContent
						isFilterOptionsMode={viewModel.isFilterOptionsMode}
						searchSuggestions={viewModel.searchSuggestions}
						filterOptions={viewModel.facultyFilterOptions}
						selectedFilterValue={viewModel.faculty}
						onSelectSearchSuggestion={viewModel.selectSubject}
						onSelectFilterOption={viewModel.selectFacultyFilterOption}
					/>
				)}

				<SubjectSelectControls
					t={viewModel.t}
					searchTerm={viewModel.searchTerm}
					onSubjectSearchTermChange={viewModel.changeSubjectSearchTerm}
					onOpenSubjectSearchSuggestions={viewModel.openSubjectSearchSuggestions}
					onCloseSubjectSearchSheet={viewModel.closeSubjectSearchSheet}
					onOpenSubjectFacultyOptions={viewModel.openSubjectFacultyOptions}
					isFilterOptionsVisible={viewModel.isSearchSheetOpen && viewModel.isFilterOptionsMode}
					faculty={viewModel.faculty}
					facultyLabel={viewModel.facultyLabel}
					onFacultyChange={viewModel.changeFaculty}
					faculties={viewModel.faculties}
				/>
			</div>
		</div>
	);
}
