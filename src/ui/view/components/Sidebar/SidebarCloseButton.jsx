// src/ui/view/components/Sidebar/SidebarCloseButton.jsx
import { ChevronLeft } from "lucide-react";

export default function SidebarCloseButton({ onCloseSidebar }) {
    return (
        <button
            type="button"
            className="sidebar-close-button"
            onClick={onCloseSidebar}
            aria-label="Lukk navigasjon"
        >
            <ChevronLeft className="sidebar-close-button-icon" />
        </button>
    );
}