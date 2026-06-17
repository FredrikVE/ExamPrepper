// src/ui/view/components/Settings/SettingsMobileSheet.jsx
import { useLanguage } from "../../../../i18n/LanguageContext.jsx";
import SettingsPanelContent from "./SettingsPanelContent.jsx";
import SettingsPanelHeader from "./SettingsPanelHeader.jsx";
import SettingsPanelSheetCloseButton from "./SettingsPanelSheetCloseButton.jsx";
import useSettingsDialog from "./useSettingsDialog.js";

export default function SettingsMobileSheet({ isOpen, onClose, onBackToMenu }) {
    const { t } = useLanguage();
    const { dialogRef, handleClose, handleBackdropClick } = useSettingsDialog(isOpen, onClose);

    return (
        <dialog
            ref={dialogRef}
            id="settings-panel"
            className="settings-sheet"
            onClose={handleClose}
            onClick={handleBackdropClick}
        >
            <SettingsPanelHeader
                title={t.settingsTitle}
                closeLabel={t.settingsClose}
                backLabel={t.settingsBackToMenu}
                onBack={onBackToMenu}
                onClose={handleClose}
            />

            <SettingsPanelContent />

            <SettingsPanelSheetCloseButton
                closeLabel={t.settingsClose}
                onClose={handleClose}
            />
        </dialog>
    );
}
