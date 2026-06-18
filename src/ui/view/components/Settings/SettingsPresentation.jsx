// src/ui/view/components/Settings/SettingsPresentation.jsx
import SettingsSidebarPanel from "./SettingsSidebarPanel.jsx";

export default function SettingsPresentation({ mode, isOpen, onClose }) {
    if (mode === "sheet") {
        return null;
    }

    return (
        <SettingsSidebarPanel
            isOpen={isOpen}
            onClose={onClose}
        />
    );
}
