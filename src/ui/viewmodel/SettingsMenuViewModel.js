//src/ui/viewmodel/SettingsMenuViewModel.js
import { useCallback, useEffect, useState } from "react";

const RANDOMIZE_ANSWER_OPTIONS_STORAGE_KEY = "exam-emulator-randomize-answer-options";

export default function useSettingsMenuViewModel() {
    // Settings-state
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

    return {
        randomizeAnswerOptions,                     // Settings
        toggleRandomizeAnswerOptions                // Handlers
    };
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