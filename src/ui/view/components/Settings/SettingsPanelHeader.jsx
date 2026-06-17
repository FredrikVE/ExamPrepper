// src/ui/view/components/Settings/SettingsPanelHeader.jsx
import { X } from "lucide-react";

export default function SettingsPanelHeader({ title, closeLabel, onClose }) {
    return (
        <div className="settings-panel-header">
            <h2 className="settings-panel-title">
                {title}
            </h2>

            <button
                type="button"
                onClick={onClose}
                className="settings-panel-close"
                aria-label={closeLabel}
            >
                <X className="settings-panel-close-icon" />
            </button>
        </div>
    );
}
