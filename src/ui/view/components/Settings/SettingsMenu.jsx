// src/ui/view/components/Settings/SettingsMenu.jsx
import { useLanguage } from "../../../../i18n/LanguageContext.jsx";
import SettingsPanelContent from "./SettingsPanelContent.jsx";
import SettingsPanelHeader from "./SettingsPanelHeader.jsx";
import SettingsPanelSheetCloseButton from "./SettingsPanelSheetCloseButton.jsx";
import useCloseSettingsOnMobileBreakpointExit from "./useCloseSettingsOnMobileBreakpointExit.js";
import useSettingsDialog from "./useSettingsDialog.js";

export default function SettingsMenu({ isOpen, onClose }) {
    const { t } = useLanguage();
    const { dialogRef, handleClose, handleBackdropClick } = useSettingsDialog(isOpen, onClose);

    useCloseSettingsOnMobileBreakpointExit(isOpen, onClose);

    return (
        <dialog
            ref={dialogRef}
            id="settings-panel"
            className="settings-panel"
            onClose={handleClose}
            onClick={handleBackdropClick}
        >
            <SettingsPanelHeader
                title={t.settingsTitle}
                closeLabel={t.settingsClose}
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
