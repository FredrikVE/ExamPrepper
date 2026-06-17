// src/ui/view/components/Settings/SettingsPresentation.jsx
import SettingsMobileSheet from "./SettingsMobileSheet.jsx";
import SettingsSidebarPanel from "./SettingsSidebarPanel.jsx";

export default function SettingsPresentation({ mode, isOpen, onClose, onBackToMenu }) {
    if (mode === "sheet") {
        return (
            <SettingsMobileSheet
                isOpen={isOpen}
                onClose={onClose}
                onBackToMenu={onBackToMenu}
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
