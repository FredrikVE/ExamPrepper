// src/ui/view/components/GlossaryPage/TopicAreaPanel/GlossarySearchField.jsx
import { X } from "lucide-react";
import SearchField from "../../Search/SearchField.jsx";
import SearchFilterControl from "../../Search/SearchFilterControl.jsx";

const SEARCH_META_ID = "glossary-search-meta";

export default function GlossarySearchField({
	searchTerm,
	searchPlaceholder,
	searchLabel,
	searchClearLabel,
	searchKeyboardHint,
	searchSummaryLabel,
	searchScopeLabel,
	searchScopeAriaLabel,
	isSearchFilterOptionsOpen,
	isSearching,
	isSearchComboboxActive,
	searchActiveDescendantId,
	topicAreaListId,
	onSearchTermChange,
	onFocusSearch,
	onClearSearch,
	onOpenFilterOptions,
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
			className="search-field-input glossary-search-field__input"
			type="search"
			value={searchTerm}
			placeholder={searchPlaceholder}
			aria-label={searchLabel}
			aria-describedby={SEARCH_META_ID}
			role="combobox"
			aria-expanded={isSearchComboboxActive}
			aria-controls={topicAreaListId}
			aria-activedescendant={searchActiveDescendantId}
			aria-autocomplete="list"
			autoComplete="off"
			onChange={(event) => onSearchTermChange(event.target.value)}
			onFocus={onFocusSearch}
			onKeyDown={handleKeyDown}
		/>
	) : (
		<input
			className="search-field-input glossary-search-field__input"
			type="search"
			value={searchTerm}
			placeholder={searchPlaceholder}
			aria-label={searchLabel}
			aria-describedby={SEARCH_META_ID}
			autoComplete="off"
			onChange={(event) => onSearchTermChange(event.target.value)}
			onFocus={onFocusSearch}
			onKeyDown={handleKeyDown}
		/>
	);

	const trailingContent = (
		<>
			{isSearching ? (
				<button className="glossary-search-field__clear" type="button" aria-label={searchClearLabel} onClick={onClearSearch}>
					<X aria-hidden="true" focusable="false" />
				</button>
			) : null}

			<SearchFilterControl
				label={searchScopeLabel}
				ariaLabel={searchScopeAriaLabel}
				isOpen={isSearchFilterOptionsOpen}
				onOpen={onOpenFilterOptions}
			/>
		</>
	);

	return (
		<div className={isSearching ? "glossary-search-control glossary-search-control--active" : "glossary-search-control"}>
			<SearchField className="glossary-search-field" trailingContent={trailingContent}>
				{searchInput}
			</SearchField>

			<div id={SEARCH_META_ID} className="glossary-search-meta" aria-live="polite">
				<span>{searchSummaryLabel}</span>
				{isSearching ? <span>{searchKeyboardHint}</span> : null}
			</div>
		</div>
	);
}
