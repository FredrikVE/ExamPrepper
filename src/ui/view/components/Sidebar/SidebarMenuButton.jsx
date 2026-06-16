// src/ui/view/components/Sidebar/SidebarMenuButton.jsx
import { Menu } from "lucide-react";
import SidebarBrand from "./SidebarBrand.jsx";

export default function SidebarMenuButton({ isMenuOpen, onToggleMenu, showSubjectSwitcher, subjects, selectedSubject, onSelectSubject, onShowAllSubjects }) {
    const shouldShowOpenHeaderSubjectSwitcher = isMenuOpen && showSubjectSwitcher;

    const headerClassName = shouldShowOpenHeaderSubjectSwitcher
        ? "mobile-top-header mobile-top-header-open"
        : "mobile-top-header";

    return (
        <header className={headerClassName} aria-label="Mobilnavigasjon">
            <button
                type="button"
                className="sidebar-menu-button"
                onClick={onToggleMenu}
                aria-label={isMenuOpen ? "Lukk navigasjon" : "Åpne navigasjon"}
                aria-controls="app-navigation-menu"
                aria-expanded={isMenuOpen}
            >
                <Menu className="sidebar-menu-button-icon" />
            </button>

            {shouldShowOpenHeaderSubjectSwitcher && (
                <div className="mobile-top-header-subject-switcher">
                    <SidebarBrand
                        subjects={subjects}
                        selectedSubject={selectedSubject}
                        onSelectSubject={onSelectSubject}
                        onShowAllSubjects={onShowAllSubjects}
                    />
                </div>
            )}
        </header>
    );
}
