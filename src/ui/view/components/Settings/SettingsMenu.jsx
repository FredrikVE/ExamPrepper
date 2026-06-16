// src/ui/view/components/Settings/SettingsMenu.jsx
import { useEffect, useRef } from "react";
import { X, ChevronUp, Globe, Moon, Shuffle, Sun } from "lucide-react";
import { useLanguage } from "../../../../i18n/LanguageContext.jsx";
import { LANGUAGES, LANGUAGE_LABELS } from "../../../../i18n/translations.js";
import { useSettings } from "../../../settings/SettingsContext.jsx";
import { useTheme } from "../../../theme/ThemeContext.jsx";
import SettingsSection from "./SettingsSection.jsx";
import SettingsToggle from "./SettingsToggle.jsx";

export default function SettingsMenu({ isOpen, onClose }) {
    const dialogRef = useRef(null);
    const { language, setLanguage, t } = useLanguage();
    const { randomizeAnswerOptions, toggleRandomizeAnswerOptions } = useSettings();
    const { isDark, toggleTheme } = useTheme();

    useEffect(() => {
        const dialog = dialogRef.current;
        if (!dialog) return;

        if (isOpen && !dialog.open) {
            dialog.showModal();
        } else if (!isOpen && dialog.open) {
            dialog.close();
        }
    }, [isOpen]);

    const handleClose = () => onClose();

    const handleBackdropClick = (event) => {
        if (event.target === dialogRef.current) {
            handleClose();
        }
    };

    const ThemeIcon = isDark ? Moon : Sun;

    return (
        <dialog
            ref={dialogRef}
            id="settings-panel"
            className="settings-panel"
            onClose={handleClose}
            onClick={handleBackdropClick}
        >
            <div className="settings-panel-header">
                <h2 className="settings-panel-title">
                    {t.settingsTitle}
                </h2>

                <button
                    type="button"
                    onClick={handleClose}
                    className="settings-panel-close"
                    aria-label={t.settingsClose}
                >
                    <X className="settings-panel-close-icon" />
                </button>
            </div>

            <div className="settings-panel-content">
                <SettingsSection icon={Globe} label={t.settingsLanguage}>
                    <LanguageOptions
                        language={language}
                        onSetLanguage={setLanguage}
                    />
                </SettingsSection>

                <SettingsSection icon={Shuffle} label={t.settingsRandomizeAnswers} spaced>
                    <SettingsToggle
                        checked={randomizeAnswerOptions}
                        onToggle={toggleRandomizeAnswerOptions}
                        ariaLabel={t.settingsRandomizeAnswers}
                    />
                </SettingsSection>

                <SettingsSection icon={ThemeIcon} label={t.settingsDarkMode} spaced>
                    <SettingsToggle
                        checked={isDark}
                        onToggle={toggleTheme}
                        ariaLabel={t.settingsDarkMode}
                    />
                </SettingsSection>
            </div>

            <button
                type="button"
                className="settings-panel-sheet-close"
                onClick={handleClose}
                aria-label={t.settingsClose}
            >
                <ChevronUp className="settings-panel-sheet-close-icon" />
            </button>
        </dialog>
    );
}

function LanguageOptions({ language, onSetLanguage }) {
    return (
        <div className="settings-language-options">
            {Object.values(LANGUAGES).map((langCode) => {
                const buttonClassName = language === langCode
                    ? "settings-language-button settings-language-button-active"
                    : "settings-language-button";

                return (
                    <button
                        key={langCode}
                        type="button"
                        onClick={() => onSetLanguage(langCode)}
                        className={buttonClassName}
                    >
                        {LANGUAGE_LABELS[langCode]}
                    </button>
                );
            })}
        </div>
    );
}
