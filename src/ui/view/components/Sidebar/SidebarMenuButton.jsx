// src/ui/view/components/Sidebar/SidebarMenuButton.jsx
import { Menu } from "lucide-react";

export default function SidebarMenuButton({ isMenuOpen, mobileHeaderModel, onToggleMenu }) {
    const headerModel = mobileHeaderModel ?? {
        title: "ExamPrepper",
        subtitle: "Exam Emulator",
        activeLabel: "Meny"
    };

    return (
        <header className="mobile-top-header" aria-label="Mobilnavigasjon">
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

            <div className="mobile-top-header-copy">
                <strong>{headerModel.title}</strong>
                <span>{headerModel.subtitle}</span>
            </div>

            <div className="mobile-top-header-pill">
                {headerModel.activeLabel}
            </div>
        </header>
    );
}
