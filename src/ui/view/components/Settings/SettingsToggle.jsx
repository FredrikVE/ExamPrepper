// src/ui/view/components/Settings/SettingsToggle.jsx
export default function SettingsToggle({ checked, onToggle, ariaLabel }) {
    const trackClassName = checked
        ? "settings-toggle-track settings-toggle-track-on"
        : "settings-toggle-track";

    const thumbClassName = checked
        ? "settings-toggle-thumb settings-toggle-thumb-on"
        : "settings-toggle-thumb";

    return (
        <button
            type="button"
            onClick={onToggle}
            className={trackClassName}
            role="switch"
            aria-checked={checked}
            aria-label={ariaLabel}
        >
            <span className={thumbClassName} />
        </button>
    );
}
