// src/ui/theme/ThemeContext.jsx
import { createContext, useContext, useState, useCallback, useEffect } from "react";
import { readThemePreference, tryWriteThemePreference } from "./themePreference.js";

const ThemeContext = createContext();

export function ThemeProvider({ children }) {
	const [isDark, setIsDark] = useState(readInitialDarkMode);

	const toggleTheme = useCallback(() => {
		setIsDark((previousIsDark) => !previousIsDark);
	}, []);

	useEffect(() => {
		applyDocumentTheme(isDark);
		tryWriteThemePreference(isDark);
	}, [isDark]);

	return (
		<ThemeContext.Provider value={{ isDark, toggleTheme }}>
			{children}
		</ThemeContext.Provider>
	);
}

export function useTheme() {
	return useContext(ThemeContext);
}

function readInitialDarkMode() {
	const storedTheme = readThemePreference();

	if (storedTheme === "dark") {
		return true;
	}

	if (storedTheme === "light") {
		return false;
	}

	return window.matchMedia("(prefers-color-scheme: dark)").matches;
}

function applyDocumentTheme(isDark) {
	const root = document.documentElement;

	if (isDark) {
		root.classList.add("dark");
	}

	else {
		root.classList.remove("dark");
	}
}
