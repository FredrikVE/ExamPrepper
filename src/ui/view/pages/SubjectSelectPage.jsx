// src/ui/view/pages/SubjectSelectPage.jsx
import { isBlockingLoadStatus } from "../../presentation/loadStatus.js";
import WorkspaceState from "../components/WorkspaceState/WorkspaceState.jsx";
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

	const renderPageContent = () => {
		if (isBlockingLoadStatus(viewModel.pageStatus)) {
			return (
				<WorkspaceState
					status={viewModel.pageStatus}
					loadingLabel={viewModel.loadingTitle}
					errorTitle={viewModel.errorTitle}
					errorBody={viewModel.pageErrorMessage}
					actionLabel={null}
					onAction={null}
				/>
			);
		}

		return (
			<>
				<SubjectSelectTopbar t={viewModel.t} />

				<SubjectSelectGrid
					t={viewModel.t}
					subjects={viewModel.filteredSubjects}
					selectedSubject={viewModel.selectedSubject}
					emptyTitle={viewModel.emptyTitle}
					emptyDescription={viewModel.emptyDescription}
					onSelectSubject={viewModel.selectSubject}
				/>
			</>
		);
	};

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
			{renderPageContent()}
		</SelectPageScaffold>
	);
}
