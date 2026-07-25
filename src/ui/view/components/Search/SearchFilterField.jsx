// src/ui/view/components/Search/SearchFilterField.jsx
import { useRef } from "react";
import { X } from "lucide-react";
import SearchField from "./SearchField.jsx";
import SearchFilterControl from "./SearchFilterControl.jsx";

export default function SearchFilterField(props) {
	const searchInputRef = useRef(null);
	const autocomplete = props.autocomplete;
	const hasAutocompleteDescription = autocomplete !== null && autocomplete.isActive && autocomplete.keyboardHint !== null;

	const handleKeyDown = (event) => {
		if (autocomplete !== null && event.key === "ArrowDown" && autocomplete.isActive) {
			event.preventDefault();
			autocomplete.onMoveDown();
			return;
		}

		if (autocomplete !== null && event.key === "ArrowUp" && autocomplete.isActive) {
			event.preventDefault();
			autocomplete.onMoveUp();
			return;
		}

		if (autocomplete !== null && event.key === "Enter" && autocomplete.isActive) {
			event.preventDefault();
			autocomplete.onSelectActive();
			return;
		}

		if (event.key !== "Escape") {
			return;
		}

		if (autocomplete !== null && autocomplete.isPopupOpen) {
			event.preventDefault();
			props.onRequestClose();
			return;
		}

		if (props.clearAction !== null) {
			event.preventDefault();
			props.clearAction.onClear();
			return;
		}

		event.preventDefault();
		props.onRequestClose();
		event.currentTarget.blur();
	};

	const trailingContent = (
		<>
			{props.clearAction === null ? null : (
				<button className="search-filter-field-clear" type="button" aria-label={props.clearAction.label} onClick={props.clearAction.onClear}>
					<X aria-hidden="true" focusable="false" />
				</button>
			)}

			<SearchFilterControl
				label={props.filterButtonLabel}
				ariaLabel={props.filterButtonAriaLabel}
				isOpen={props.isFilterOptionsOpen}
				onOpen={() => {
					searchInputRef.current?.blur();
					props.onOpenFilterOptions();
				}}
			/>
		</>
	);
	const fieldClassName = props.className === null ? "search-filter-field" : `search-filter-field ${props.className}`;

	return (
		<>
			<SearchField className={fieldClassName} trailingContent={trailingContent}>
				<input
					ref={searchInputRef}
					className="search-field-input search-filter-field-input"
					type="search"
					value={props.searchTerm}
					onChange={(event) => props.onSearchTermChange(event.target.value)}
					onFocus={props.onFocusSearch}
					onKeyDown={handleKeyDown}
					placeholder={props.searchPlaceholder}
					aria-label={props.searchLabel}
					aria-describedby={hasAutocompleteDescription ? autocomplete.descriptionId : null}
					role={autocomplete === null ? null : "combobox"}
					aria-expanded={autocomplete === null ? null : autocomplete.isActive}
					aria-controls={autocomplete === null ? null : autocomplete.listId}
					aria-activedescendant={autocomplete === null ? null : autocomplete.activeDescendantId}
					aria-autocomplete={autocomplete === null ? null : "list"}
					autoComplete={autocomplete === null ? null : "off"}
				/>
			</SearchField>

			{hasAutocompleteDescription ? (
				<div id={autocomplete.descriptionId} className="search-filter-field-meta" aria-live="polite">
					<span>{autocomplete.keyboardHint}</span>
				</div>
			) : null}
		</>
	);
}
