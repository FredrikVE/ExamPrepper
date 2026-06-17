// src/ui/view/components/Settings/SettingsPanelContent.jsx
import { Globe, Moon, Shuffle, Sun } from "lucide-react";
import { useLanguage } from "../../../../i18n/LanguageContext.jsx";
import { useSettings } from "../../../settings/SettingsContext.jsx";
import { useTheme } from "../../../theme/ThemeContext.jsx";
import SettingsLanguageOptions from "./SettingsLanguageOptions.jsx";
import SettingsSection from "./SettingsSection.jsx";
import SettingsToggle from "./SettingsToggle.jsx";

export default function SettingsPanelContent() {
    const { language, setLanguage, t } = useLanguage();
    const { randomizeAnswerOptions, toggleRandomizeAnswerOptions } = useSettings();
    const { isDark, toggleTheme } = useTheme();
    const ThemeIcon = isDark ? Moon : Sun;

    return (
        <div className="settings-panel-content">
            <SettingsSection icon={Globe} label={t.settingsLanguage}>
                <SettingsLanguageOptions
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
    );
}
