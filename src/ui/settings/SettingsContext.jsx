//src/ui/settings/SettingsContext.jsx
import { createContext, useCallback, useContext, useEffect, useState } from "react";

const SettingsContext = createContext(null);

const RANDOMIZE_ANSWER_OPTIONS_STORAGE_KEY = "exam-emulator-randomize-answer-options";

export function SettingsProvider({ children }) {
    const [randomizeAnswerOptions, setRandomizeAnswerOptions] = useState(getInitialRandomizeAnswerOptions);

    const toggleRandomizeAnswerOptions = useCallback(() => {
        setRandomizeAnswerOptions((value) => !value);
    }, []);

    const handleRandomizeAnswerOptionsChanged = useCallback(() => {
        writeBooleanSetting(
            RANDOMIZE_ANSWER_OPTIONS_STORAGE_KEY,
            randomizeAnswerOptions
        );
    }, [randomizeAnswerOptions]);

    useEffect(handleRandomizeAnswerOptionsChanged, [handleRandomizeAnswerOptionsChanged]);

    return (
        <SettingsContext.Provider
            value={{
                randomizeAnswerOptions,
                toggleRandomizeAnswerOptions
            }}
        >
            {children}
        </SettingsContext.Provider>
    );
}

export function useSettings() {
    const context = useContext(SettingsContext);

    if (!context) {
        throw new Error("useSettings må brukes inni SettingsProvider");
    }

    return context;
}

const getInitialRandomizeAnswerOptions = () => {
    return readBooleanSetting(RANDOMIZE_ANSWER_OPTIONS_STORAGE_KEY, false);
};

const readBooleanSetting = (key, fallbackValue) => {
    try {
        return localStorage.getItem(key) === "true";
    } catch (error) {
        handleSettingsStorageError("Kunne ikke lese innstilling fra localStorage", error);
        return fallbackValue;
    }
};

const writeBooleanSetting = (key, value) => {
    try {
        localStorage.setItem(key, value ? "true" : "false");
    } catch (error) {
        handleSettingsStorageError("Kunne ikke lagre innstilling i localStorage", error);
    }
};

const handleSettingsStorageError = (message, error) => {
    console.warn(message, error);
};