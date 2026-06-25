// src/ui/view/hooks/usePresentationMode.js
import { useEffect, useState } from "react";
import { APP_MOBILE_QUERY, resolvePresentationModeFromMatches } from "../../presentation/presentationMode.js";

function resolvePresentationMode() {
	if (typeof window === "undefined" || typeof window.matchMedia !== "function") {
		return "desktop";
	}

	return resolvePresentationModeFromMatches(window.matchMedia(APP_MOBILE_QUERY).matches);
}

export default function usePresentationMode() {
	const [presentationMode, setPresentationMode] = useState(resolvePresentationMode);

	useEffect(() => {
		if (typeof window === "undefined" || typeof window.matchMedia !== "function") {
			return undefined;
		}

		const mediaQuery = window.matchMedia(APP_MOBILE_QUERY);

		const syncPresentationMode = () => {
			setPresentationMode(resolvePresentationModeFromMatches(mediaQuery.matches));
		};

		syncPresentationMode();
		mediaQuery.addEventListener("change", syncPresentationMode);

		return () => {
			mediaQuery.removeEventListener("change", syncPresentationMode);
		};
	}, []);

	return presentationMode;
}
