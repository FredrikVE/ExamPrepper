//src/ui/view/components/Settings/SettingsMenu.jsx
import { useState, useCallback, useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { Menu, X, Globe, Moon, Sun } from "lucide-react";
import { useLanguage } from "../../../../i18n/LanguageContext.jsx";
import { LANGUAGES, LANGUAGE_LABELS } from "../../../../i18n/translations.js";
import { useTheme } from "../../../theme/ThemeContext.jsx";

export default function SettingsMenu() {
    const [isOpen, setIsOpen] = useState(false);
    const panelRef = useRef(null);
    const buttonRef = useRef(null);
    const { language, setLanguage, t } = useLanguage();
    const { isDark, toggleTheme } = useTheme();

    const toggleMenu = useCallback(() => {
        setIsOpen((prev) => !prev);
    }, []);

    const closeMenu = useCallback(() => {
        setIsOpen(false);
    }, []);

    // Close on Escape key
    useEffect(() => {
        if (!isOpen) return;

        const handleKeyDown = (event) => {
            if (event.key === "Escape") {
                closeMenu();
                buttonRef.current?.focus();
            }
        };

        document.addEventListener("keydown", handleKeyDown);
        return () => document.removeEventListener("keydown", handleKeyDown);
    }, [isOpen, closeMenu]);

    // Close on click outside
    useEffect(() => {
        if (!isOpen) return;

        const handleClickOutside = (event) => {
            if (
                panelRef.current &&
                !panelRef.current.contains(event.target) &&
                buttonRef.current &&
                !buttonRef.current.contains(event.target)
            ) {
                closeMenu();
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, [isOpen, closeMenu]);

    const menuPanel = isOpen
        ? createPortal(
            <>
                <div className="settings-overlay" aria-hidden="true" onClick={closeMenu} />

                <div
                    ref={panelRef}
                    className="settings-panel settings-panel-open"
                    role="dialog"
                    aria-modal="true"
                    aria-label={t.settingsTitle}
                >
                    <div className="settings-panel-header">
                        <h2 className="settings-panel-title">{t.settingsTitle}</h2>

                        <button
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
                                {isDark ? (
                                    <Moon className="settings-section-icon" />
                                ) : (
                                    <Sun className="settings-section-icon" />
                                )}
                                {t.settingsDarkMode}
                            </div>

                            <button
                                type="button"
                                onClick={toggleTheme}
                                className="settings-toggle-track"
                                role="switch"
                                aria-checked={isDark}
                            >
                                <span
                                    className={`settings-toggle-thumb ${
                                        isDark ? "settings-toggle-thumb-on" : ""
                                    }`}
                                />
                            </button>
                        </div>
                    </div>
                </div>
            </>,
            document.body
        )
        : null;

    return (
        <>
            <button
                ref={buttonRef}
                type="button"
                onClick={toggleMenu}
                className="settings-menu-trigger"
                aria-label={t.settingsOpenMenu}
                aria-expanded={isOpen}
            >
                <Menu className="settings-menu-trigger-icon" />
            </button>

            {menuPanel}
        </>
    );
}