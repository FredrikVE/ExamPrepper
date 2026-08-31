// src/ui/view/components/Search/useSearchSheetEscapeKey.js
import useKeyboardShortcuts from "../../KeyboardNavigation/useKeyboardShortcuts.js";

export default function useSearchSheetEscapeKey(isSearchSheetOpen, onCloseSearchSheet) {
	function closeSearchSheetOnEscape(event) {
		if (event.key === "Escape") {
			event.preventDefault();
			onCloseSearchSheet();
		}
	}

	useKeyboardShortcuts({
		isEnabled: isSearchSheetOpen,
		onKeyDown: closeSearchSheetOnEscape
	});
}
