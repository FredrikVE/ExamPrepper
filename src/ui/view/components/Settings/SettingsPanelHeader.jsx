// src/ui/view/components/Settings/SettingsPanelHeader.jsx
import { ChevronLeft, X } from "lucide-react";

export default function SettingsPanelHeader({ title, closeLabel, backLabel, onBack, onClose }) {
    const headerClassNames = [
        "settings-panel-header",
        onBack ? "settings-panel-header-with-back" : null
    ].filter(Boolean);

    return (
        <div className={headerClassNames.join(" ")}>
            {onBack && (
                <button
                    type="button"
                    onClick={onBack}
                    className="settings-panel-back"
                    aria-label={backLabel}
                >
                    <ChevronLeft className="settings-panel-back-icon" />
                </button>
            )}

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
