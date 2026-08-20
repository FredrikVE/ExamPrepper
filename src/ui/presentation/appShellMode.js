// src/ui/presentation/appShellMode.js
export const APP_NARROW_DESKTOP_MAX_WIDTH = 1200;
export const APP_FULL_DESKTOP_MIN_WIDTH = 1201;
export const APP_COMPACT_SHELL_QUERY = `(max-width: ${APP_NARROW_DESKTOP_MAX_WIDTH}px)`;

export const APP_SHELL_MODE = {
	COMPACT: "compact",
	FULL: "full"
};

function canQueryViewport() {
	return typeof window !== "undefined" && typeof window.matchMedia === "function";
}

export function resolveAppShellModeFromMatches(matches) {
	if (matches) {
		return APP_SHELL_MODE.COMPACT;
	}

	return APP_SHELL_MODE.FULL;
}

export function getAppShellMode() {
	if (!canQueryViewport()) {
		return APP_SHELL_MODE.FULL;
	}

	return resolveAppShellModeFromMatches(window.matchMedia(APP_COMPACT_SHELL_QUERY).matches);
}

export function subscribeToAppShellMode(onChange) {
	if (!canQueryViewport()) {
		return () => {};
	}

	const mediaQuery = window.matchMedia(APP_COMPACT_SHELL_QUERY);
	mediaQuery.addEventListener("change", onChange);

	return () => {
		mediaQuery.removeEventListener("change", onChange);
	};
}
