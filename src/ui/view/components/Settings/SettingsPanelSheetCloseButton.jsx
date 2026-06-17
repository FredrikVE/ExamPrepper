// src/ui/view/components/Settings/SettingsPanelSheetCloseButton.jsx
import { ChevronUp } from "lucide-react";

export default function SettingsPanelSheetCloseButton({ closeLabel, onClose }) {
    return (
        <button
            type="button"
            className="settings-panel-sheet-close"
            onClick={onClose}
            aria-label={closeLabel}
        >
            <ChevronUp className="settings-panel-sheet-close-icon" />
        </button>
    );
}
