// src/ui/view/pages/SubjectSelectPage.jsx
import SubjectSelectTopbar from "../components/SubjectSelectPage/SubjectSelectTopbar.jsx";
import SubjectSelectGrid from "../components/SubjectSelectPage/SubjectSelectGrid.jsx";
import SearchSheetBody from "../components/Search/SearchSheetBody.jsx";
import SearchFilterField from "../components/Search/SearchFilterField.jsx";
import useSearchSheetEscapeKey from "../components/Search/useSearchSheetEscapeKey.js";
import PageToolsMobileFooterSheet from "../components/PageTools/PageToolsMobileFooterSheet.jsx";
import SelectPageScaffold from "../components/SelectPageScaffold/SelectPageScaffold.jsx";

export default function SubjectSelectPage({ viewModel }) {
	useSearchSheetEscapeKey(viewModel.isSearchSheetOpen, viewModel.closeSubjectSearchSheet);

	const renderSearchContent = () => {
		if (!viewModel.isSearchSheetOpen) {
			return null;
		}

		return (
			<SearchSheetBody
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
		<SelectPageScaffold
			layoutClassName="subject-select-layout"
			workspaceClassName="subject-select-workspace"
			ambientLightClassName="subject-select-ambient-light"
			scrollClassName="subject-select-scroll"
			showBackButton={viewModel.showBackButton}
			backLabel={viewModel.backLabel}
			navigationLabel={viewModel.navigationLabel}
			onBack={viewModel.onBack}
			pageTools={viewModel.pageTools}
			isSearchSheetOpen={viewModel.isSearchSheetOpen}
			onCloseSearchSheet={viewModel.closeSubjectSearchSheet}
			searchCloseLabel={viewModel.searchCloseLabel}
			isFooterOpen={viewModel.isFooterOpen}
			footerClassName="subject-search-footer"
			footerOpenClassName="subject-search-footer-open"
			footer={(
				<PageToolsMobileFooterSheet
					tools={viewModel.pageTools}
					renderControls={renderSearchControls}
					renderSearchContent={renderSearchContent}
					isSheetOpen={viewModel.isFooterSheetOpen}
					onOpenSheet={viewModel.openSubjectFooterSheet}
					onSheetOpenChange={viewModel.changeSubjectFooterSheetOpen}
				/>
			)}
		>
			<SubjectSelectTopbar t={viewModel.t} />

			<SubjectSelectGrid
				t={viewModel.t}
				subjects={viewModel.filteredSubjects}
				selectedSubject={viewModel.selectedSubject}
				emptyTitle={viewModel.emptyTitle}
				emptyDescription={viewModel.emptyDescription}
				onSelectSubject={viewModel.selectSubject}
			/>
		</SelectPageScaffold>
	);
}
