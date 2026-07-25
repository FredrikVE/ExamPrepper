// src/ui/view/components/GlossaryPage/TopicAreaPanel/GlossarySearchField.jsx
import { useRef } from "react";
import { X } from "lucide-react";
import SearchField from "../../Search/SearchField.jsx";
import SearchFilterControl from "../../Search/SearchFilterControl.jsx";

const SEARCH_META_ID = "glossary-search-meta";

export default function GlossarySearchField(props) {
	const searchInputRef = useRef(null);

	const handleKeyDown = (event) => {
		if (event.key === "ArrowDown" && props.isSearchAutocompleteActive) {
			event.preventDefault();
			props.onMoveSearchSelectionDown();
			return;
		}

		if (event.key === "ArrowUp" && props.isSearchAutocompleteActive) {
			event.preventDefault();
			props.onMoveSearchSelectionUp();
			return;
		}

		if (event.key === "Enter" && props.isSearchAutocompleteActive) {
			event.preventDefault();
			props.onOpenSearchKeyboardSelection();
			return;
		}

		if (event.key === "Escape" && props.isSearchPopupOpen) {
			event.preventDefault();
			props.onRequestClose();
			return;
		}

		if (event.key === "Escape" && props.isSearching) {
			event.preventDefault();
			props.onClearSearch();
		}
	};

	const trailingContent = (
		<>
			{props.isSearching ? (
				<button className="glossary-search-field__clear" type="button" aria-label={props.searchClearLabel} onClick={props.onClearSearch}>
					<X aria-hidden="true" focusable="false" />
				</button>
			) : null}

			<SearchFilterControl
				label={props.chapterFilterLabel}
				ariaLabel={props.searchFilterAriaLabel}
				isOpen={props.isSearchFilterOptionsOpen}
				onOpen={() => {
					searchInputRef.current?.blur();
					props.onOpenFilterOptions();
				}}
			/>
		</>
	);

	return (
		<div className={props.isSearching ? "glossary-search-control glossary-search-control--active" : "glossary-search-control"}>
			<SearchField className="search-filter-field glossary-search-field" trailingContent={trailingContent}>
				<input
					ref={searchInputRef}
					className="search-field-input search-filter-field-input glossary-search-field__input"
					type="search"
					value={props.searchTerm}
					placeholder={props.searchPlaceholder}
					aria-label={props.searchLabel}
					aria-describedby={SEARCH_META_ID}
					role="combobox"
					aria-expanded={props.isSearchAutocompleteActive}
					aria-controls={props.autocompleteListId}
					aria-activedescendant={props.searchActiveDescendantId}
					aria-autocomplete="list"
					autoComplete="off"
					onChange={(event) => props.onSearchTermChange(event.target.value)}
					onFocus={props.onFocusSearch}
					onKeyDown={handleKeyDown}
				/>
			</SearchField>

			<div id={SEARCH_META_ID} className="glossary-search-meta" aria-live="polite">
				<span>{props.searchSummaryLabel}</span>
				{props.isSearchAutocompleteActive ? <span>{props.searchKeyboardHint}</span> : null}
			</div>
		</div>
	);
}
