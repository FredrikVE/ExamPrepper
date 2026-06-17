// src/ui/view/components/Settings/SettingsLanguageOptions.jsx
import { LANGUAGES, LANGUAGE_LABELS } from "../../../../i18n/translations.js";

function getLanguageButtonClassName(isActive) {
    return isActive
        ? "settings-language-button settings-language-button-active"
        : "settings-language-button";
}

export default function SettingsLanguageOptions({ language, onSetLanguage }) {
    return (
        <div className="settings-language-options">
            {Object.values(LANGUAGES).map((langCode) => (
                <button
                    key={langCode}
                    type="button"
                    onClick={() => onSetLanguage(langCode)}
                    className={getLanguageButtonClassName(language === langCode)}
                >
                    {LANGUAGE_LABELS[langCode]}
                </button>
            ))}
        </div>
    );
}
