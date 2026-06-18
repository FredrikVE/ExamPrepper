// src/ui/view/components/ExamSelectPage/ExamSearchSheetContent.jsx
import { Funnel, Search } from "lucide-react";

function ExamSearchSuggestionList({ suggestions, onSelectSearchSuggestion }) {
	if (suggestions.length === 0) {
		return null;
	}

	return (
		<ul className="exam-search-sheet-list exam-search-sheet-list-suggestions" role="listbox">
			{suggestions.map((suggestion) => (
				<li key={suggestion.id} role="option">
					<button
						type="button"
						className="exam-search-sheet-row exam-search-sheet-row-suggestion"
						onMouseDown={(event) => {
							event.preventDefault();
						}}
						onClick={() => onSelectSearchSuggestion(suggestion.id)}
					>
						<Search className="exam-search-sheet-row-icon" aria-hidden="true" />
						<span className="exam-search-sheet-row-label">{suggestion.label}</span>
					</button>
				</li>
			))}
		</ul>
	);
}

function ExamFilterOptionList({ filterOptions, selectedFilterValue, onSelectFilterOption }) {
	if (filterOptions.length === 0) {
		return null;
	}

	return (
		<ul className="exam-search-sheet-list exam-search-sheet-list-filter-options" role="listbox">
			{filterOptions.map((filterOption) => (
				<li
					key={filterOption.id}
					role="option"
					aria-selected={filterOption.value === selectedFilterValue}
				>
					<button
						type="button"
						className="exam-search-sheet-row exam-search-sheet-row-filter-option"
						onMouseDown={(event) => {
							event.preventDefault();
						}}
						onClick={() => onSelectFilterOption(filterOption.value)}
					>
						<span className="exam-search-sheet-row-label">{filterOption.label}</span>
						<Funnel className="exam-search-sheet-row-icon" aria-hidden="true" />
					</button>
				</li>
			))}
		</ul>
	);
}

export default function ExamSearchSheetContent({
	isFilterOptionsMode,
	searchSuggestions,
	filterOptions,
	selectedFilterValue,
	onSelectSearchSuggestion,
	onSelectFilterOption
}) {
	if (isFilterOptionsMode) {
		return (
			<ExamFilterOptionList
				filterOptions={filterOptions}
				selectedFilterValue={selectedFilterValue}
				onSelectFilterOption={onSelectFilterOption}
			/>
		);
	}

	return (
		<ExamSearchSuggestionList
			suggestions={searchSuggestions}
			onSelectSearchSuggestion={onSelectSearchSuggestion}
		/>
	);
}
