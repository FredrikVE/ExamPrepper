//src/ui/view/components/Sidebar/SidebarMenuButton.jsx
import { Menu } from "lucide-react";

export default function SidebarMenuButton({ onOpenSidebar }) {
    return (
        <button
            type="button"
            className="sidebar-menu-button"
            onClick={onOpenSidebar}
            aria-label="Åpne navigasjon"
        >
            <Menu className="sidebar-menu-button-icon" />
        </button>
    );
}