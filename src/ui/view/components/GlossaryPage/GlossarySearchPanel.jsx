// src/ui/view/components/GlossaryPage/GlossarySearchPanel.jsx
import SearchFilterField from "../Search/SearchFilterField.jsx";
import SearchSheetBody from "../Search/SearchSheetBody.jsx";
import { SEARCH_POPUP_CONTENT } from "../../../viewmodel/GlossaryPage/glossarySearchModel.js";

export default function GlossarySearchPanel({ search, descriptionId, keyboardHint }) {
	return (
		<SearchFilterField
			className={null}
			searchTerm={search.term}
			searchPlaceholder={search.placeholder}
			searchLabel={search.label}
			onSearchTermChange={search.onChangeTerm}
			onFocusSearch={search.onFocus}
			onRequestClose={search.onRequestClose}
			filterButtonLabel={search.filterLabel}
			filterButtonAriaLabel={search.filterAriaLabel}
			isFilterOptionsOpen={search.isFilterOptionsMode}
			onOpenFilterOptions={search.onOpenFilterOptions}
			clearAction={search.isSearching ? { label: search.clearLabel, onClear: search.onClear } : null}
			autocomplete={{
				isActive: search.isAutocompleteActive,
				isPopupOpen: search.isPopupOpen,
				listId: search.listId,
				activeDescendantId: search.activeDescendantId,
				descriptionId,
				keyboardHint,
				onMoveDown: search.onMoveDown,
				onMoveUp: search.onMoveUp,
				onSelectActive: search.onSelectActive
			}}
		/>
	);
}

export function GlossarySearchPopup({ search }) {
	if (search.popupContent === SEARCH_POPUP_CONTENT.NONE) {
		return null;
	}

	return (
		<SearchSheetBody
			isFilterOptionsMode={search.popupContent === SEARCH_POPUP_CONTENT.FILTER_OPTIONS}
			searchSuggestions={search.suggestions}
			suggestionListId={search.listId}
			suggestionListAriaLabel={search.suggestionListAriaLabel}
			activeSuggestionId={search.activeDescendantId}
			filterOptions={search.filterOptions}
			selectedFilterValue={search.filterValue}
			onSelectSearchSuggestion={search.onSelectSuggestion}
			onSelectFilterOption={search.onSelectFilterOption}
		/>
	);
}
