// src/ui/view/components/GlossaryPage/TopicAreaPanel/GlossarySearchField.jsx
import { Search, X } from "lucide-react";

const SEARCH_META_ID = "glossary-search-meta";

export default function GlossarySearchField(props) {
	const handleKeyDown = (event) => {
		if (event.key === "ArrowDown") {
			event.preventDefault();
			props.onMoveSearchSelectionDown();
			return;
		}

		if (event.key === "ArrowUp") {
			event.preventDefault();
			props.onMoveSearchSelectionUp();
			return;
		}

		if (event.key === "Enter") {
			event.preventDefault();
			props.onOpenSearchKeyboardSelection();
			return;
		}

		if (event.key === "Escape" && props.isSearching) {
			event.preventDefault();
			props.onClearSearch();
		}
	};

	const searchInput = props.isSearching ? (
		<input
			className="glossary-search-field__input"
			type="search"
			value={props.searchTerm}
			placeholder={props.searchPlaceholder}
			aria-label={props.searchPlaceholder}
			aria-describedby={SEARCH_META_ID}
			role="combobox"
			aria-expanded={props.isSearchComboboxActive}
			aria-controls={props.controlledListId}
			aria-activedescendant={props.searchActiveDescendantId || undefined}
			aria-autocomplete="list"
			autoComplete="off"
			onChange={(event) => props.onSearchTermChange(event.target.value)}
			onKeyDown={handleKeyDown}
		/>
	) : (
		<input
			className="glossary-search-field__input"
			type="search"
			value={props.searchTerm}
			placeholder={props.searchPlaceholder}
			aria-label={props.searchPlaceholder}
			aria-describedby={SEARCH_META_ID}
			autoComplete="off"
			onChange={(event) => props.onSearchTermChange(event.target.value)}
			onKeyDown={handleKeyDown}
		/>
	);

	return (
		<div className={props.isSearching ? "glossary-search-control glossary-search-control--active" : "glossary-search-control"}>
			<label className="glossary-search-field">
				<Search className="glossary-search-field__icon" aria-hidden="true" focusable="false" />
				{searchInput}

				{props.isSearching ? (
					<button
						className="glossary-search-field__clear"
						type="button"
						aria-label={props.searchClearLabel}
						onClick={props.onClearSearch}
					>
						<X aria-hidden="true" focusable="false" />
					</button>
				) : null}
			</label>

			<div id={SEARCH_META_ID} className="glossary-search-meta" aria-live="polite">
				<span>{props.searchSummaryLabel}</span>
				{props.isSearching ? <span>{props.searchKeyboardHint}</span> : null}
			</div>
		</div>
	);
}
