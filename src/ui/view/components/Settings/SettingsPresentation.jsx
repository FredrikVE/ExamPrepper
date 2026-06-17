// src/ui/view/components/Settings/SettingsPresentation.jsx
import SettingsMobileSheet from "./SettingsMobileSheet.jsx";
import SettingsSidebarPanel from "./SettingsSidebarPanel.jsx";

export default function SettingsPresentation({ mode, isOpen, onClose }) {
    if (mode === "sheet") {
        return (
            <SettingsMobileSheet
                isOpen={isOpen}
                onClose={onClose}
            />
        );
    }

    return (
        <SettingsSidebarPanel
            isOpen={isOpen}
            onClose={onClose}
        />
    );
}
