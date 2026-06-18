// src/ui/view/components/ExamSelectPage/ExamSelectControls.jsx
import { ChevronDown, Funnel, Search } from "lucide-react";

export default function ExamSelectControls({ searchTerm, onSearchTermChange, onSearchFocus, onCloseSearch, category, categoryLabel, onCategoryChange, categories, searchPlaceholder, searchLabel, categoryAriaLabel, allCategoriesLabel }) {
	return (
		<div className="exam-select-controls">
			<div className="mobile-search-shell">
				<div className="mobile-search-main">
					<Search className="mobile-search-icon" aria-hidden="true" />
					<input
						className="mobile-search-input"
						type="search"
						value={searchTerm}
						onChange={(event) => onSearchTermChange(event.target.value)}
						onFocus={onSearchFocus}
						onKeyDown={(event) => {
							if (event.key === "Escape") {
								event.preventDefault();
								onCloseSearch();
								event.currentTarget.blur();
							}
						}}
						placeholder={searchPlaceholder}
						aria-label={searchLabel}
					/>
				</div>

				<span className="mobile-search-divider" aria-hidden="true" />

				<div className="mobile-search-filter">
					<Funnel className="mobile-filter-icon" aria-hidden="true" />
					<span className="mobile-filter-label" aria-hidden="true">
						{categoryLabel}
					</span>
					<select
						className="mobile-filter-select"
						value={category}
						onPointerDown={onCloseSearch}
						onFocus={onCloseSearch}
						onKeyDown={(event) => {
							if (event.key === "Escape") {
								onCloseSearch();
							}
						}}
						onChange={(event) => onCategoryChange(event.target.value)}
						aria-label={categoryAriaLabel}
					>
						<option value="all">{allCategoriesLabel}</option>
						{categories.map((cat) => (
							<option key={cat} value={cat}>
								{cat}
							</option>
						))}
					</select>
					<ChevronDown className="mobile-filter-chevron" aria-hidden="true" />
				</div>
			</div>
		</div>
	);
}
