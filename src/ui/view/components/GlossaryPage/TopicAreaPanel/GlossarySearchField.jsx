// src/ui/view/components/GlossaryPage/TopicAreaPanel/GlossarySearchField.jsx
import { Search, X } from "lucide-react";

const SEARCH_META_ID = "glossary-search-meta";

export default function GlossarySearchField({
	searchTerm,
	searchPlaceholder,
	searchClearLabel,
	searchKeyboardHint,
	searchSummaryLabel,
	isSearching,
	isSearchComboboxActive,
	searchActiveDescendantId,
	topicAreaListId,
	onSearchTermChange,
	onClearSearch,
	onMoveSearchSelectionDown,
	onMoveSearchSelectionUp,
	onOpenSearchKeyboardSelection
}) {
	const handleKeyDown = (event) => {
		if (event.key === "ArrowDown") {
			event.preventDefault();
			onMoveSearchSelectionDown();
			return;
		}

		if (event.key === "ArrowUp") {
			event.preventDefault();
			onMoveSearchSelectionUp();
			return;
		}

		if (event.key === "Enter") {
			event.preventDefault();
			onOpenSearchKeyboardSelection();
			return;
		}

		if (event.key === "Escape" && isSearching) {
			event.preventDefault();
			onClearSearch();
		}
	};

	const searchInput = isSearching ? (
		<input
			className="glossary-search-field__input"
			type="search"
			value={searchTerm}
			placeholder={searchPlaceholder}
			aria-label={searchPlaceholder}
			aria-describedby={SEARCH_META_ID}
			role="combobox"
			aria-expanded={isSearchComboboxActive}
			aria-controls={topicAreaListId}
			aria-activedescendant={searchActiveDescendantId}
			aria-autocomplete="list"
			autoComplete="off"
			onChange={(event) => onSearchTermChange(event.target.value)}
			onKeyDown={handleKeyDown}
		/>
	) : (
		<input
			className="glossary-search-field__input"
			type="search"
			value={searchTerm}
			placeholder={searchPlaceholder}
			aria-label={searchPlaceholder}
			aria-describedby={SEARCH_META_ID}
			autoComplete="off"
			onChange={(event) => onSearchTermChange(event.target.value)}
			onKeyDown={handleKeyDown}
		/>
	);

	return (
		<div className={isSearching ? "glossary-search-control glossary-search-control--active" : "glossary-search-control"}>
			<label className="glossary-search-field">
				<Search className="glossary-search-field__icon" aria-hidden="true" focusable="false" />
				{searchInput}

				{isSearching ? (
					<button className="glossary-search-field__clear" type="button" aria-label={searchClearLabel} onClick={onClearSearch}>
						<X aria-hidden="true" focusable="false" />
					</button>
				) : null}
			</label>

			<div id={SEARCH_META_ID} className="glossary-search-meta" aria-live="polite">
				<span>{searchSummaryLabel}</span>
				{isSearching ? <span>{searchKeyboardHint}</span> : null}
			</div>
		</div>
	);
}
