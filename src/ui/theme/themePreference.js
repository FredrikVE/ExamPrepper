// src/ui/theme/themePreference.js
const THEME_STORAGE_KEY = "theme";
const DARK_THEME = "dark";
const LIGHT_THEME = "light";

export function readThemePreference() {
	try {
		const storedTheme = localStorage.getItem(THEME_STORAGE_KEY);

		if (storedTheme === DARK_THEME || storedTheme === LIGHT_THEME) {
			return storedTheme;
		}

		return null;
	}

	catch {
		return null;
	}
}

export function tryWriteThemePreference(isDark) {
	let theme = LIGHT_THEME;

	if (isDark) {
		theme = DARK_THEME;
	}

	try {
		localStorage.setItem(THEME_STORAGE_KEY, theme);
	}

	catch {
		return;
	}
}
