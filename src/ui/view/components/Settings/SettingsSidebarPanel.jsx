// src/ui/view/components/Settings/SettingsSidebarPanel.jsx
import { useLanguage } from "../../../../i18n/LanguageContext.jsx";
import SettingsPanelContent from "./SettingsPanelContent.jsx";
import SettingsPanelHeader from "./SettingsPanelHeader.jsx";
import useSettingsDialog from "./useSettingsDialog.js";

export default function SettingsSidebarPanel({ isOpen, onClose }) {
    const { t } = useLanguage();
    const { dialogRef, handleClose, handleBackdropClick } = useSettingsDialog(isOpen, onClose);

    return (
        <dialog
            ref={dialogRef}
            id="settings-panel"
            className="settings-sidebar"
            onClose={handleClose}
            onClick={handleBackdropClick}
        >
            <SettingsPanelHeader
                title={t.settingsTitle}
                closeLabel={t.settingsClose}
                onClose={handleClose}
            />

            <SettingsPanelContent />
        </dialog>
    );
}
