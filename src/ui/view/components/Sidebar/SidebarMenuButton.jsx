// src/ui/view/components/Sidebar/SidebarMenuButton.jsx
import { Menu } from "lucide-react";

export default function SidebarMenuButton({ isMenuOpen, onToggleMenu }) {
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
        </header>
    );
}
