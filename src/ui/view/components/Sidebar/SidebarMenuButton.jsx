// src/ui/view/components/Sidebar/SidebarMenuButton.jsx
import { Menu } from "lucide-react";
import SidebarBrand from "./SidebarBrand.jsx";

export default function SidebarMenuButton(props) {
    const shouldShowOpenHeaderSubjectSwitcher = props.isMenuOpen && props.showSubjectSwitcher;

    const headerClassName = shouldShowOpenHeaderSubjectSwitcher
        ? "mobile-top-header mobile-top-header-open"
        : "mobile-top-header";

    return (
        <header className={headerClassName} aria-label="Mobilnavigasjon">
            <button
                type="button"
                className="sidebar-menu-button"
                onClick={props.onToggleMenu}
                aria-label={props.isMenuOpen ? "Lukk navigasjon" : "Åpne navigasjon"}
                aria-controls="app-navigation-menu"
                aria-expanded={props.isMenuOpen}
            >
                <Menu className="sidebar-menu-button-icon" />
            </button>

            {shouldShowOpenHeaderSubjectSwitcher && (
                <div className="mobile-top-header-subject-switcher">
                    <SidebarBrand
                        subjects={props.subjects}
                        selectedSubject={props.selectedSubject}
                        onSelectSubject={props.onSelectSubject}
                        onShowAllSubjects={props.onShowAllSubjects}
                    />
                </div>
            )}
        </header>
    );
}
