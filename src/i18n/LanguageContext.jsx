//src/i18n/LanguageContext.jsx
import { createContext, useCallback, useContext, useState } from "react";
import { LANGUAGES, translations } from "./translations.js";

const LanguageContext = createContext(null);

const STORAGE_KEY = "exam-emulator-language";

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

    return (
        <LanguageContext.Provider value={{ language, setLanguage, t }}>
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
