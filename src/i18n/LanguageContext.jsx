// src/i18n/LanguageContext.jsx
import { createContext, useCallback, useContext, useMemo, useState } from "react";
import { LANGUAGES, translations } from "./translations.js";

const LanguageContext = createContext(null);

const STORAGE_KEY = "exam-emulator-language";

const LOCALES = {
    [LANGUAGES.NO]: "nb-NO",
    [LANGUAGES.EN]: "en-GB"
};

const DEFAULT_LOCALE = LOCALES[LANGUAGES.NO];

function getInitialLanguage() {
    try {
        const stored = localStorage.getItem(STORAGE_KEY);

        if (stored && translations[stored]) {
            return stored;
        }
    } catch {
        // localStorage not available
    }

    return LANGUAGES.NO;
}

export function LanguageProvider({ children }) {
    const [language, setLanguageState] = useState(getInitialLanguage);

    const setLanguage = useCallback((newLanguage) => {
        setLanguageState(newLanguage);

        try {
            localStorage.setItem(STORAGE_KEY, newLanguage);
        } catch {
            // localStorage not available
        }
    }, []);

    const t = translations[language];
    const locale = LOCALES[language] ?? DEFAULT_LOCALE;

    const formatDate = useCallback((isoString) => {
        const timestamp = Date.parse(isoString);

        if (!Number.isFinite(timestamp)) {
            return null;
        }

        return new Intl.DateTimeFormat(locale, {
            day: "2-digit",
            month: "short",
            year: "numeric"
        }).format(new Date(timestamp));
    }, [locale]);

    const value = useMemo(() => ({
        language, setLanguage, t, formatDate
    }), [language, setLanguage, t, formatDate]);

    return (
        <LanguageContext.Provider value={value}>
            {children}
        </LanguageContext.Provider>
    );
}

export function useLanguage() {
    const context = useContext(LanguageContext);

    if (!context) {
        throw new Error("useLanguage must be used within a LanguageProvider");
    }

    return context;
}
