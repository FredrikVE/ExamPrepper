import FilterOptionList from "./FilterOptionList.jsx";
import SearchSuggestionList from "./SearchSuggestionList.jsx";

export default function SearchSheetBody(props) {
	if (props.isFilterOptionsMode) {
		return (
			<FilterOptionList
				filterOptions={props.filterOptions}
				selectedFilterValue={props.selectedFilterValue}
				onSelectFilterOption={props.onSelectFilterOption}
			/>
		);
	}

	return (
		<SearchSuggestionList
			suggestions={props.searchSuggestions}
			listId={props.suggestionListId}
			ariaLabel={props.suggestionListAriaLabel}
			activeSuggestionId={props.activeSuggestionId}
			onSelectSearchSuggestion={props.onSelectSearchSuggestion}
		/>
	);
}
