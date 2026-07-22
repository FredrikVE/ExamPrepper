// src/ui/view/pages/SubjectSelectPage.jsx
import WorkspaceState from "../components/WorkspaceState/WorkspaceState.jsx";
import Header from "../components/Header/Header.jsx";
import Footer from "../components/Footer/Footer.jsx";
import SubjectSelectTopbar from "../components/SubjectSelectPage/SubjectSelectTopbar.jsx";
import SubjectSelectGrid from "../components/SubjectSelectPage/SubjectSelectGrid.jsx";
import SearchSheetBody from "../components/Search/SearchSheetBody.jsx";
import SearchFilterField from "../components/Search/SearchFilterField.jsx";
import useSearchSheetEscapeKey from "../components/Search/useSearchSheetEscapeKey.js";
import PageToolsMobileFooterSheet from "../components/PageTools/PageToolsMobileFooterSheet.jsx";
import WorkspaceScaffold from "../components/WorkspaceScaffold/WorkspaceScaffold.jsx";

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

	const renderPageContent = () => (
		<WorkspaceState state={viewModel.workspaceState}>
			<>
				<SubjectSelectTopbar t={viewModel.t} />

				<SubjectSelectGrid
					t={viewModel.t}
					subjects={viewModel.filteredSubjects}
					selectedSubject={viewModel.selectedSubject}
					onSelectSubject={viewModel.selectSubject}
				/>
			</>
		</WorkspaceState>
	);

	const header = (
		<Header
			showBackButton={viewModel.showBackButton}
			backLabel={viewModel.backLabel}
			navigationLabel={viewModel.navigationLabel}
			onBack={viewModel.onBack}
			progressBarModel={null}
			tools={viewModel.pageTools}
			trailing={null}
		/>
	);

	const footer = (
		<Footer
			isOpen={viewModel.isFooterOpen}
			className="subject-search-footer"
			openClassName="subject-search-footer-open"
		>
			<PageToolsMobileFooterSheet
				tools={viewModel.pageTools}
				renderControls={renderSearchControls}
				renderSearchContent={renderSearchContent}
				isSheetOpen={viewModel.isFooterSheetOpen}
				onOpenSheet={viewModel.openSubjectFooterSheet}
				onSheetOpenChange={viewModel.changeSubjectFooterSheetOpen}
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
			onClick={viewModel.closeSubjectSearchSheet}
			aria-label={viewModel.searchCloseLabel}
			tabIndex={-1}
		/>
	) : null;

	return (
		<WorkspaceScaffold
			className="subject-select-layout subject-select-workspace"
			contentClassName="subject-select-scroll"
			header={header}
			footer={footer}
			overlay={overlay}
			scrollToTopRequestId={null}
		>
			{renderPageContent()}
		</WorkspaceScaffold>
	);
}
