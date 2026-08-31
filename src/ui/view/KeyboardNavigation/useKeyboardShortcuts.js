// src/ui/view/KeyboardNavigation/useKeyboardShortcuts.js
import { useEffect } from "react";

const KEYDOWN_LISTENER_OPTIONS = { capture: true };

export function isShortcutEvent(event) {
	return !(
		event.repeat ||
		event.altKey ||
		event.ctrlKey ||
		event.metaKey ||
		event.shiftKey ||
		event.isComposing
	);
}

export default function useKeyboardShortcuts({ isEnabled, onKeyDown }) {
	useEffect(() => {
		if (!isEnabled || typeof window === "undefined") {
			return undefined;
		}

		window.addEventListener("keydown", onKeyDown, KEYDOWN_LISTENER_OPTIONS);

		return () => {
			window.removeEventListener("keydown", onKeyDown, KEYDOWN_LISTENER_OPTIONS);
		};
	}, [isEnabled, onKeyDown]);
}
