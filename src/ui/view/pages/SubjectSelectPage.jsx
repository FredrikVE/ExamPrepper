// src/ui/view/pages/SubjectSelectPage.jsx
import SubjectSelectTopbar from "../components/SubjectSelectPage/SubjectSelectTopbar.jsx";
import SubjectSelectGrid from "../components/SubjectSelectPage/SubjectSelectGrid.jsx";
import SearchSheetContent from "../components/Search/SearchSheetContent.jsx";
import SearchFilterField from "../components/Search/SearchFilterField.jsx";
import useSearchSheetEscapeKey from "../components/Search/useSearchSheetEscapeKey.js";
import PageToolsMobileFooterSheet from "../components/PageTools/PageToolsMobileFooterSheet.jsx";
import WorkspaceScaffoldHeader from "../components/WorkspaceScaffold/WorkspaceScaffoldHeader.jsx";
import WorkspaceScaffoldSearchFooter from "../components/WorkspaceScaffold/WorkspaceScaffoldSearchFooter.jsx";

export default function SubjectSelectPage({ viewModel }) {
	useSearchSheetEscapeKey(viewModel.isSearchSheetOpen, viewModel.closeSubjectSearchSheet);

	const renderSearchContent = () => {
		if (!viewModel.isSearchSheetOpen) {
			return null;
		}

		return (
			<SearchSheetContent
				isFilterOptionsMode={viewModel.isFilterOptionsMode}
				searchSuggestions={viewModel.searchSuggestions}
				filterOptions={viewModel.facultyFilterOptions}
				selectedFilterValue={viewModel.faculty}
				onSelectSearchSuggestion={viewModel.selectSubject}
				onSelectFilterOption={viewModel.selectFacultyFilterOption}
			/>
		);
	};

	const renderSearchControls = () => (
		<div className="subject-select-controls" aria-label={viewModel.t.subjectSelectControlsLabel}>
			<SearchFilterField
				searchTerm={viewModel.searchTerm}
				searchPlaceholder={viewModel.t.subjectSearchPlaceholder}
				searchLabel={viewModel.t.subjectSearchLabel}
				onSearchTermChange={viewModel.changeSubjectSearchTerm}
				onFocusSearch={viewModel.openSubjectSearchSuggestions}
				onRequestClose={viewModel.closeSubjectSearchSheet}
				filterButtonLabel={viewModel.facultyLabel}
				filterButtonAriaLabel={viewModel.t.subjectFacultyLabel}
				isFilterOptionsOpen={viewModel.isSearchSheetOpen && viewModel.isFilterOptionsMode}
				onOpenFilterOptions={viewModel.openSubjectFacultyOptions}
			/>
		</div>
	);

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

	return (
		<div className="subject-select-layout">
			<main className="subject-select-workspace">
				<div className="subject-select-ambient-light" aria-hidden="true" />

				<WorkspaceScaffoldHeader
					showBackButton={viewModel.showBackButton}
					backLabel={viewModel.backLabel}
					navigationLabel={viewModel.navigationLabel}
					onBack={viewModel.onBack}
					tools={viewModel.pageTools}
				/>

				<div className="subject-select-scroll">
					<SubjectSelectTopbar t={viewModel.t} />

					<SubjectSelectGrid
						t={viewModel.t}
						subjects={viewModel.filteredSubjects}
						selectedSubject={viewModel.selectedSubject}
						emptyTitle={viewModel.emptyTitle}
						emptyDescription={viewModel.emptyDescription}
						onSelectSubject={viewModel.selectSubject}
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
					onClick={viewModel.closeSubjectSearchSheet}
					aria-label={viewModel.searchCloseLabel}
					tabIndex={-1}
				/>
			)}

			<WorkspaceScaffoldSearchFooter
				isOpen={viewModel.isSearchSheetOpen}
				className="subject-search-footer"
				openClassName="subject-search-footer-open"
				onBlur={(event) => {
					if (!event.currentTarget.contains(event.relatedTarget)) {
						viewModel.closeSubjectSearchSheet();
					}
				}}
			>
				<PageToolsMobileFooterSheet
					tools={viewModel.pageTools}
					renderControls={renderSearchControls}
					renderSearchContent={renderSearchContent}
					onCloseSheet={viewModel.closeSubjectSearchSheet}
				/>
			</WorkspaceScaffoldSearchFooter>
		</div>
	);
}
