//src/ui/view/components/Settings/SettingsMenu.jsx
import { useCallback, useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { X, Globe, Moon, Shuffle, Sun } from "lucide-react";
import { useLanguage } from "../../../../i18n/LanguageContext.jsx";
import { LANGUAGES, LANGUAGE_LABELS } from "../../../../i18n/translations.js";
import { useSettings } from "../../../settings/SettingsContext.jsx";
import { useTheme } from "../../../theme/ThemeContext.jsx";

export default function SettingsMenu({ isOpen, onOpenChange }) {
    const panelRef = useRef(null);
    const { language, setLanguage, t } = useLanguage();
    const { randomizeAnswerOptions, toggleRandomizeAnswerOptions } = useSettings();
    const { isDark, toggleTheme } = useTheme();

    const closeMenu = useCallback(() => {
        onOpenChange(false);
    }, [onOpenChange]);

    // Close on Escape key
    useEffect(() => {
        if (!isOpen) return;

        const handleKeyDown = (event) => {
            if (event.key === "Escape") {
                closeMenu();
            }
        };

        document.addEventListener("keydown", handleKeyDown);
        return () => document.removeEventListener("keydown", handleKeyDown);
    }, [isOpen, closeMenu]);

    // Close on click outside the panel
    useEffect(() => {
        if (!isOpen) return;

        const handleClickOutside = (event) => {
            if (panelRef.current && !panelRef.current.contains(event.target)) {
                closeMenu();
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, [isOpen, closeMenu]);

    if (!isOpen) return null;

    return createPortal(
        <>
            <div className="settings-overlay" aria-hidden="true" onClick={closeMenu} />

            <div
                ref={panelRef}
                id="settings-panel"
                className="settings-panel settings-panel-open"
                role="dialog"
                aria-modal="true"
                aria-labelledby="settings-panel-title"
            >
                <div className="settings-panel-header">
                    <h2 id="settings-panel-title" className="settings-panel-title">
                        {t.settingsTitle}
                    </h2>

                    <button
                        type="button"
                        onClick={closeMenu}
                        className="settings-panel-close"
                        aria-label={t.settingsClose}
                    >
                        <X className="settings-panel-close-icon" />
                    </button>
                </div>

                <div className="settings-panel-content">
                    <div className="settings-section">
                        <div className="settings-section-label">
                            <Globe className="settings-section-icon" />
                            {t.settingsLanguage}
                        </div>

                        <div className="settings-language-options">
                            {Object.values(LANGUAGES).map((langCode) => (
                                <button
                                    key={langCode}
                                    type="button"
                                    onClick={() => setLanguage(langCode)}
                                    className={`settings-language-button ${
                                        language === langCode
                                            ? "settings-language-button-active"
                                            : ""
                                    }`}
                                >
                                    {LANGUAGE_LABELS[langCode]}
                                </button>
                            ))}
                        </div>
                    </div>

                    <div className="settings-section settings-section-spaced">
                        <div className="settings-section-label">
                            <Shuffle className="settings-section-icon" />
                            {t.settingsRandomizeAnswers}
                        </div>

                        <SettingsToggle
                            checked={randomizeAnswerOptions}
                            onToggle={toggleRandomizeAnswerOptions}
                            ariaLabel={t.settingsRandomizeAnswers}
                        />
                    </div>

                    <div className="settings-section settings-section-spaced">
                        <div className="settings-section-label">
                            {isDark ? (
                                <Moon className="settings-section-icon" />
                            ) : (
                                <Sun className="settings-section-icon" />
                            )}
                            {t.settingsDarkMode}
                        </div>

                        <SettingsToggle
                            checked={isDark}
                            onToggle={toggleTheme}
                            ariaLabel={t.settingsDarkMode}
                        />
                    </div>
                </div>
            </div>
        </>,
        document.body
    );
}

function SettingsToggle({ checked, onToggle, ariaLabel }) {
    return (
        <button
            type="button"
            onClick={onToggle}
            className={`settings-toggle-track ${checked ? "settings-toggle-track-on" : ""}`}
            role="switch"
            aria-checked={checked}
            aria-label={ariaLabel}
        >
            <span
                className={`settings-toggle-thumb ${
                    checked ? "settings-toggle-thumb-on" : ""
                }`}
            />
        </button>
    );
}