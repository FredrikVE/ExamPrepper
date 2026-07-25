import { Search } from "lucide-react";

export default function SearchSuggestionList(props) {
	if (props.suggestions.length === 0) {
		return null;
	}

	return (
		<ul
			id={props.listId}
			className="search-sheet-list search-sheet-list-suggestions"
			role="listbox"
			aria-label={props.ariaLabel}
		>
			{props.suggestions.map((suggestion) => {
				const isSelected = suggestion.optionId === props.activeSuggestionId;

				return (
					<li
						id={suggestion.optionId ?? null}
						key={suggestion.id}
						role="option"
						aria-selected={isSelected}
					>
						<button
							type="button"
							className="search-sheet-row search-sheet-row-suggestion"
							data-keyboard-target={isSelected ? "true" : "false"}
							onMouseDown={(event) => {
								event.preventDefault();
							}}
							onClick={() => props.onSelectSearchSuggestion(suggestion.id)}
						>
							<Search className="search-sheet-row-icon" aria-hidden="true" />
							<span className="search-sheet-row-copy">
								<span className="search-sheet-row-label">{suggestion.label}</span>
								{suggestion.metaLabel === null || suggestion.metaLabel === undefined ? null : (
									<span className="search-sheet-row-meta">{suggestion.metaLabel}</span>
								)}
							</span>
						</button>
					</li>
				);
			})}
		</ul>
	);
}
