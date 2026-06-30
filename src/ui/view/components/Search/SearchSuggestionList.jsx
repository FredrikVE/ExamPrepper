// src/ui/view/components/Search/SearchSuggestionList.jsx
import { Search } from "lucide-react";

export default function SearchSuggestionList({ suggestions, onSelectSearchSuggestion }) {
	if (suggestions.length === 0) {
		return null;
	}

	return (
		<ul className="search-sheet-list search-sheet-list-suggestions" role="listbox">
			{suggestions.map((suggestion) => (
				<li key={suggestion.id} role="option">
					<button
						type="button"
						className="search-sheet-row search-sheet-row-suggestion"
						onMouseDown={(event) => {
							event.preventDefault();
						}}
						onClick={() => onSelectSearchSuggestion(suggestion.id)}
					>
						<Search className="search-sheet-row-icon" aria-hidden="true" />
						<span className="search-sheet-row-label">{suggestion.label}</span>
					</button>
				</li>
			))}
		</ul>
	);
}
