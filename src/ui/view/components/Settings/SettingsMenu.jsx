// src/ui/view/components/Settings/SettingsMenu.jsx
import { useRef } from "react";
import { createPortal } from "react-dom";
import { X, Globe, Moon, Shuffle, Sun } from "lucide-react";
import { useLanguage } from "../../../../i18n/LanguageContext.jsx";
import { LANGUAGES, LANGUAGE_LABELS } from "../../../../i18n/translations.js";
import { useSettings } from "../../../settings/SettingsContext.jsx";
import { useTheme } from "../../../theme/ThemeContext.jsx";
import useDialogDismiss from "./useDialogDismiss.js";
import SettingsSection from "./SettingsSection.jsx";
import SettingsToggle from "./SettingsToggle.jsx";

export default function SettingsMenu({ isOpen, onOpenChange }) {
    const panelRef = useRef(null);
    const { language, setLanguage, t } = useLanguage();
    const { randomizeAnswerOptions, toggleRandomizeAnswerOptions } = useSettings();
    const { isDark, toggleTheme } = useTheme();
    const closeMenu = useDialogDismiss(isOpen, panelRef, onOpenChange);

    if (!isOpen) return null;

    const ThemeIcon = isDark ? Moon : Sun;

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
            </div>
        </>,
        document.body
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
