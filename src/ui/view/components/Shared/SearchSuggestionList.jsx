// src/ui/view/components/Shared/SearchSuggestionList.jsx
import { Search } from "lucide-react";

export default function SearchSuggestionList({ suggestions, onSelect }) {
	if (suggestions.length === 0) {
		return null;
	}

	return (
		<ul className="search-suggestion-list" role="listbox">
			{suggestions.map((suggestion) => (
				<li key={suggestion.id} role="option">
					<button
						type="button"
						className="search-suggestion-item"
						onMouseDown={(event) => {
							event.preventDefault();
							onSelect(suggestion.id);
						}}
					>
						<Search className="search-suggestion-icon" aria-hidden="true" />
						<span className="search-suggestion-label">{suggestion.label}</span>
					</button>
				</li>
			))}
		</ul>
	);
}
