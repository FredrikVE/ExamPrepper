// src/ui/view/components/Sidebar/SidebarSettingsButton.jsx
import { Settings } from "lucide-react";
import { useLanguage } from "../../../../i18n/LanguageContext.jsx";

export default function SidebarSettingsButton({ settingsOpen, onOpenSettings }) {
    const { t } = useLanguage();

    return (
        <button
            type="button"
            onClick={onOpenSettings}
            className={`sidebar-settings-button ${settingsOpen ? "sidebar-settings-button-active" : ""}`}
            aria-controls="settings-panel"
            aria-expanded={settingsOpen}
        >
            <Settings className="sidebar-settings-button-icon" />
            <span>{t.sidebarSettings}</span>
        </button>
    );
}