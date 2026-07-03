// src/ui/presentation/presentationMode.js
const APP_MOBILE_QUERY = "(max-width: 932px)";

export const PRESENTATION_MODE = {
    MOBILE: "mobile",
    DESKTOP: "desktop"
};

function canQueryViewport() {
    return typeof window !== "undefined" && typeof window.matchMedia === "function";
}

export function resolvePresentationModeFromMatches(matches) {
    if (matches) {
        return PRESENTATION_MODE.MOBILE;
    }

    return PRESENTATION_MODE.DESKTOP;
}

export function getPresentationMode() {
    if (!canQueryViewport()) {
        return PRESENTATION_MODE.DESKTOP;
    }

    return resolvePresentationModeFromMatches(window.matchMedia(APP_MOBILE_QUERY).matches);
}

export function subscribeToPresentationMode(onChange) {
    if (!canQueryViewport()) {
        return () => {};
    }

    const mediaQuery = window.matchMedia(APP_MOBILE_QUERY);
    mediaQuery.addEventListener("change", onChange);

    return () => {
        mediaQuery.removeEventListener("change", onChange);
    };
}
