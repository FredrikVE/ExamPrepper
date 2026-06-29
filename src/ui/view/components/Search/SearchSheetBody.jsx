// src/ui/view/components/Search/SearchSheetBody.jsx
import FilterOptionList from "./FilterOptionList.jsx";
import SearchSuggestionList from "./SearchSuggestionList.jsx";

export default function SearchSheetBody({
	isFilterOptionsMode,
	searchSuggestions,
	filterOptions,
	selectedFilterValue,
	onSelectSearchSuggestion,
	onSelectFilterOption
}) {
	if (isFilterOptionsMode) {
		return (
			<FilterOptionList
				filterOptions={filterOptions}
				selectedFilterValue={selectedFilterValue}
				onSelectFilterOption={onSelectFilterOption}
			/>
		);
	}

	return (
		<SearchSuggestionList
			suggestions={searchSuggestions}
			onSelectSearchSuggestion={onSelectSearchSuggestion}
		/>
	);
}
