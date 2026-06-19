// src/ui/view/components/SubjectSelectPage/SubjectSelectControls.jsx
import { useRef } from "react";
import { ChevronDown, Funnel, Search } from "lucide-react";

export default function SubjectSelectControls(props) {
	const searchInputRef = useRef(null);
	return (
		<div className="subject-select-controls" aria-label={props.t.subjectSelectControlsLabel}>
			<div className="mobile-search-shell">
				<div className="mobile-search-main">
					<Search className="mobile-search-icon" aria-hidden="true" />
					<input
						ref={searchInputRef}
						className="mobile-search-input"
						type="search"
						value={props.searchTerm}
						onChange={(event) => props.onSubjectSearchTermChange(event.target.value)}
						onFocus={props.onOpenSubjectSearchSuggestions}
						onKeyDown={(event) => {
							if (event.key === "Escape") {
								event.preventDefault();
								props.onCloseSubjectSearchSheet();
								event.currentTarget.blur();
							}
						}}
						placeholder={props.t.subjectSearchPlaceholder}
						aria-label={props.t.subjectSearchLabel}
					/>
				</div>

				<span className="mobile-search-divider" aria-hidden="true" />

				<div className="mobile-search-filter">
					<Funnel className="mobile-filter-icon" aria-hidden="true" />
					<span className="mobile-filter-label" aria-hidden="true">
						{props.facultyLabel}
					</span>
					<button
						type="button"
						className="mobile-filter-button"
						onClick={() => {
							searchInputRef.current?.blur();
							props.onOpenSubjectFacultyOptions?.();
						}}
						aria-haspopup="listbox"
						aria-expanded={props.isFilterOptionsVisible}
						aria-label={props.t.subjectFacultyLabel}
					/>
					<ChevronDown className="mobile-filter-chevron" aria-hidden="true" />
				</div>
			</div>
		</div>
	);
}
