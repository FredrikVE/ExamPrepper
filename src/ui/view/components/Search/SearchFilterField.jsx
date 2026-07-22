// src/ui/view/components/Search/SearchFilterField.jsx
import { useRef } from "react";
import SearchField from "./SearchField.jsx";
import SearchFilterControl from "./SearchFilterControl.jsx";

export default function SearchFilterField({
	searchTerm,
	searchPlaceholder,
	searchLabel,
	onSearchTermChange,
	onFocusSearch,
	onRequestClose,
	filterButtonLabel,
	filterButtonAriaLabel,
	isFilterOptionsOpen,
	onOpenFilterOptions
}) {
	const searchInputRef = useRef(null);

	const filterControl = (
		<SearchFilterControl
			label={filterButtonLabel}
			ariaLabel={filterButtonAriaLabel}
			isOpen={isFilterOptionsOpen}
			onOpen={() => {
				searchInputRef.current?.blur();
				onOpenFilterOptions();
			}}
		/>
	);

	return (
		<SearchField className="search-filter-field" trailingContent={filterControl}>
			<input
				ref={searchInputRef}
				className="search-field-input search-filter-field-input"
				type="search"
				value={searchTerm}
				onChange={(event) => onSearchTermChange(event.target.value)}
				onFocus={onFocusSearch}
				onKeyDown={(event) => {
					if (event.key === "Escape") {
						event.preventDefault();
						onRequestClose();
						event.currentTarget.blur();
					}
				}}
				placeholder={searchPlaceholder}
				aria-label={searchLabel}
			/>
		</SearchField>
	);
}
