// src/ui/view/KeyboardNavigation/KeyboardShortcutBinding.jsx
import useKeyboardShortcuts from "./useKeyboardShortcuts.js";

export default function KeyboardShortcutBinding({ isEnabled, onKeyDown }) {
	useKeyboardShortcuts({
		isEnabled,
		onKeyDown
	});

	return null;
}
