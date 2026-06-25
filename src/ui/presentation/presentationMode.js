// src/ui/presentation/presentationMode.js
export const APP_MOBILE_QUERY = "(max-width: 932px)";

export function resolvePresentationModeFromMatches(matches) {
	if (matches) {
		return "mobile";
	}

	return "desktop";
}
