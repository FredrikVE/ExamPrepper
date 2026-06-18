// src/ui/view/components/Shared/SearchSheetContent.jsx
import FilterOptionList from "./FilterOptionList.jsx";
import SearchSuggestionList from "./SearchSuggestionList.jsx";

export default function SearchSheetContent({
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
