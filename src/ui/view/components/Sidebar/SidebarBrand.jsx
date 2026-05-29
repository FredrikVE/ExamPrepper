// src/ui/view/components/Sidebar/SidebarBrand.jsx
import { useState } from "react";
import { ChevronDown, ChevronRight, Check } from "lucide-react";
import SubjectIcon from "../SubjectIcon.jsx";

export default function SidebarBrand({ subjects, selectedSubject, onSelectSubject, onShowAllSubjects }) {
    const [isOpen, setIsOpen] = useState(false);

    const currentSubject = selectedSubject ?? subjects[0] ?? {
        id: "in5431",
        code: "IN5431",
        name: "Exam Emulator",
        icon: "clipboard"
    };

    const toggleOpen = () => {
        setIsOpen((prev) => !prev);
    };

    const handleSelectSubject = (subjectId) => {
        onSelectSubject(subjectId);
        setIsOpen(false);
    };

    const handleShowAllSubjects = () => {
        onShowAllSubjects();
        setIsOpen(false);
    };

    return (
        <div className="sidebar-brand-wrapper">
            <button
                type="button"
                className={isOpen ? "sidebar-brand sidebar-brand-open" : "sidebar-brand"}
                onClick={toggleOpen}
                aria-expanded={isOpen}
            >
                <div className="sidebar-brand-icon">
                    <SubjectIcon icon={currentSubject.icon} />
                </div>

                <div className="sidebar-brand-copy">
                    <p className="sidebar-brand-title">{currentSubject.code}</p>
                    <p className="sidebar-brand-subtitle">
                        {currentSubject.name ?? "Exam Emulator"}
                    </p>
                </div>

                <ChevronDown className="sidebar-brand-chevron" />
            </button>

            {isOpen && (
                <div className="sidebar-subject-menu">
                    <p className="sidebar-subject-menu-label">Velg emne</p>

                    <div className="sidebar-subject-list">
                        {subjects.map((subject) => {
                            const isSelected = subject.id === currentSubject.id;

                            return (
                                <button
                                    key={subject.id}
                                    type="button"
                                    className={
                                        isSelected
                                            ? "sidebar-subject-item sidebar-subject-item-selected"
                                            : "sidebar-subject-item"
                                    }
                                    onClick={() => handleSelectSubject(subject.id)}
                                >
                                    <div className="sidebar-subject-item-icon">
                                        <SubjectIcon icon={subject.icon} />
                                    </div>

                                    <div className="sidebar-subject-item-copy">
                                        <p className="sidebar-subject-item-code">
                                            {subject.code}
                                        </p>
                                        <p className="sidebar-subject-item-name">
                                            {subject.name}
                                        </p>
                                    </div>

                                    {isSelected && (
                                        <span className="sidebar-subject-selected-indicator">
                                            <Check size={15} />
                                        </span>
                                    )}
                                </button>
                            );
                        })}
                    </div>

                    <button
                        type="button"
                        className="sidebar-subject-see-all"
                        onClick={handleShowAllSubjects}
                    >
                        <span>Se alle emner</span>
                        <ChevronRight size={18} />
                    </button>
                </div>
            )}
        </div>
    );
}