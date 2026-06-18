// src/ui/view/components/SubjectSelectPage/SubjectSelectControls.jsx
import { ChevronDown, Funnel, Search } from "lucide-react";

export default function SubjectSelectControls({ t, searchTerm, onSearchTermChange, onSearchFocus, onCloseSearch, faculty, facultyLabel, onFacultyChange, faculties }) {
    return (
        <div className="subject-select-controls" aria-label={t.subjectSelectControlsLabel}>
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
                        placeholder={t.subjectSearchPlaceholder}
                        aria-label={t.subjectSearchLabel}
                    />
                </div>

                <span className="mobile-search-divider" aria-hidden="true" />

                <div className="mobile-search-filter">
                    <Funnel className="mobile-filter-icon" aria-hidden="true" />
                    <span className="mobile-filter-label" aria-hidden="true">
                        {facultyLabel}
                    </span>
                    <select
                        className="mobile-filter-select"
                        value={faculty}
                        onPointerDown={onCloseSearch}
                        onFocus={onCloseSearch}
                        onKeyDown={(event) => {
                            if (event.key === "Escape") {
                                onCloseSearch();
                            }
                        }}
                        onChange={(event) => onFacultyChange(event.target.value)}
                        aria-label={t.subjectFacultyLabel}
                    >
                        <option value="all">{t.subjectAllFaculties}</option>
                        {faculties.map((facultyOption) => (
                            <option key={facultyOption} value={facultyOption}>
                                {facultyOption}
                            </option>
                        ))}
                    </select>
                    <ChevronDown className="mobile-filter-chevron" aria-hidden="true" />
                </div>
            </div>
        </div>
    );
}
