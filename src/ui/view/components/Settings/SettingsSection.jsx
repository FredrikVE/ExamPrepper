// src/ui/view/components/Settings/SettingsSection.jsx
export default function SettingsSection({ icon: Icon, label, spaced, children }) {
    const sectionClassName = spaced
        ? "settings-section settings-section-spaced"
        : "settings-section";

    return (
        <div className={sectionClassName}>
            <div className="settings-section-label">
                <Icon className="settings-section-icon" />
                {label}
            </div>

            {children}
        </div>
    );
}
