// src/ui/view/components/SubjectSelectPage/SubjectSelectControls.jsx
import { ChevronDown, Funnel, Search } from "lucide-react";

export default function SubjectSelectControls({ t, searchTerm, onSearchTermChange, faculty, onFacultyChange, faculties }) {
    return (
        <div className="subject-select-controls" aria-label={t.subjectSelectControlsLabel}>
            <label className="subject-select-search">
                <Search className="subject-select-search-icon" aria-hidden="true" />
                <span className="sr-only">{t.subjectSearchLabel}</span>
                <input
                    type="search"
                    value={searchTerm}
                    onChange={(event) => onSearchTermChange(event.target.value)}
                    placeholder={t.subjectSearchPlaceholder}
                />
            </label>

            <label className="subject-select-filter">
                <Funnel className="subject-select-filter-icon" aria-hidden="true" />
                <span className="sr-only">{t.subjectFacultyLabel}</span>
                <select
                    value={faculty}
                    onChange={(event) => onFacultyChange(event.target.value)}
                >
                    <option value="all">{t.subjectAllFaculties}</option>
                    {faculties.map((facultyOption) => (
                        <option key={facultyOption} value={facultyOption}>
                            {facultyOption}
                        </option>
                    ))}
                </select>
                <ChevronDown className="subject-select-filter-chevron" aria-hidden="true" />
            </label>
        </div>
    );
}
