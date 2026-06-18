// src/ui/view/components/ExamSelectPage/ExamSelectControls.jsx
import { ChevronDown, Funnel, Search } from "lucide-react";

export default function ExamSelectControls({ searchTerm, onSearchTermChange, onSearchFocus, onSearchBlur, category, onCategoryChange, categories, searchPlaceholder, allCategoriesLabel }) {
	return (
		<div className="exam-select-controls">
			<label className="exam-select-search">
				<Search className="exam-select-search-icon" aria-hidden="true" />
				<input
					type="search"
					value={searchTerm}
					onChange={(event) => onSearchTermChange(event.target.value)}
					onFocus={onSearchFocus}
					onBlur={onSearchBlur}
					placeholder={searchPlaceholder}
				/>
			</label>

			<label className="exam-select-filter">
				<Funnel className="exam-select-filter-icon" aria-hidden="true" />
				<select
					value={category}
					onChange={(event) => onCategoryChange(event.target.value)}
				>
					<option value="all">{allCategoriesLabel}</option>
					{categories.map((cat) => (
						<option key={cat} value={cat}>
							{cat}
						</option>
					))}
				</select>
				<ChevronDown className="exam-select-filter-chevron" aria-hidden="true" />
			</label>
		</div>
	);
}
