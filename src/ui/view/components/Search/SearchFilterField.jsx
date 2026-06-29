// src/ui/view/components/Search/SearchFilterField.jsx
import { useRef } from "react";
import { ChevronDown, Funnel, Search } from "lucide-react";

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

	return (
		<div className="search-filter-field">
			<div className="search-filter-field-main">
				<Search className="search-filter-field-icon" aria-hidden="true" />
				<input
					ref={searchInputRef}
					className="search-filter-field-input"
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
			</div>

			<span className="search-filter-field-divider" aria-hidden="true" />

			<div className="search-filter-field-filter">
				<Funnel className="search-filter-field-filter-icon" aria-hidden="true" />
				<span className="search-filter-field-filter-label" aria-hidden="true">
					{filterButtonLabel}
				</span>
				<button
					type="button"
					className="search-filter-field-filter-button"
					onClick={() => {
						searchInputRef.current?.blur();
						onOpenFilterOptions();
					}}
					aria-haspopup="listbox"
					aria-expanded={isFilterOptionsOpen}
					aria-label={filterButtonAriaLabel}
				/>
				<ChevronDown className="search-filter-field-filter-chevron" aria-hidden="true" />
			</div>
		</div>
	);
}
