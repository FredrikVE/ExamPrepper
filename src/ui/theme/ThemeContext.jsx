// src/ui/theme/ThemeContext.jsx
import { createContext, useContext, useState, useCallback, useEffect } from "react";

const ThemeContext = createContext();
const THEME_STORAGE_KEY = "theme";

export function ThemeProvider({ children }) {
	const [isDark, setIsDark] = useState(readInitialDarkMode);

	const toggleTheme = useCallback(() => {
		setIsDark((previousIsDark) => !previousIsDark);
	}, []);

	useEffect(() => {
		const root = document.documentElement;

		if (isDark) {
			root.classList.add("dark");
		}

		else {
			root.classList.remove("dark");
		}

		writeThemePreference(isDark);
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
	try {
		const savedTheme = localStorage.getItem(THEME_STORAGE_KEY);

		if (savedTheme !== null) {
			return savedTheme === "dark";
		}
	}

	catch {
		// Storage unavailable. Use system preference.
	}

	return window.matchMedia("(prefers-color-scheme: dark)").matches;
}

function writeThemePreference(isDark) {
	let theme;

	if (isDark) {
		theme = "dark";
	}

	else {
		theme = "light";
	}

	try {
		localStorage.setItem(THEME_STORAGE_KEY, theme);
	}

	catch {
		// Runtime theme still remains active.
	}
}
