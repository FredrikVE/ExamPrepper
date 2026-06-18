// src/ui/view/components/ExamSelectPage/ExamSelectControls.jsx
import { useRef } from "react";
import { ChevronDown, Funnel, Search } from "lucide-react";

export default function ExamSelectControls(props) {
	const searchInputRef = useRef(null);
	const changeSearchTerm = props.onExamSearchTermChange ?? props.onSearchTermChange;
	const openSearchSuggestions = props.onOpenExamSearchSuggestions ?? props.onSearchFocus;
	const closeSearchSheet = props.onCloseExamSearchSheet ?? props.onCloseSearch;

	return (
		<div className="exam-select-controls">
			<div className="mobile-search-shell">
				<div className="mobile-search-main">
					<Search className="mobile-search-icon" aria-hidden="true" />
					<input
						ref={searchInputRef}
						className="mobile-search-input"
						type="search"
						value={props.searchTerm}
						onChange={(event) => changeSearchTerm(event.target.value)}
						onFocus={openSearchSuggestions}
						onKeyDown={(event) => {
							if (event.key === "Escape") {
								event.preventDefault();
								closeSearchSheet();
								event.currentTarget.blur();
							}
						}}
						placeholder={props.searchPlaceholder}
						aria-label={props.searchLabel}
					/>
				</div>

				<span className="mobile-search-divider" aria-hidden="true" />

				<div className="mobile-search-filter">
					<Funnel className="mobile-filter-icon" aria-hidden="true" />
					<span className="mobile-filter-label" aria-hidden="true">
						{props.categoryLabel}
					</span>
					<select
						className="mobile-filter-select"
						value={props.category}
						onPointerDown={closeSearchSheet}
						onFocus={closeSearchSheet}
						onKeyDown={(event) => {
							if (event.key === "Escape") {
								closeSearchSheet();
							}
						}}
						onChange={(event) => props.onCategoryChange(event.target.value)}
						aria-label={props.categoryAriaLabel}
					>
						<option value="all">{props.allCategoriesLabel}</option>
						{props.categories.map((cat) => (
							<option key={cat} value={cat}>
								{cat}
							</option>
						))}
					</select>
					<button
						type="button"
						className="mobile-filter-button"
						onClick={() => {
							searchInputRef.current?.blur();
							props.onOpenExamCategoryOptions?.();
						}}
						aria-haspopup="listbox"
						aria-expanded={props.isFilterOptionsVisible}
						aria-label={props.categoryAriaLabel}
					/>
					<ChevronDown className="mobile-filter-chevron" aria-hidden="true" />
				</div>
			</div>
		</div>
	);
}
