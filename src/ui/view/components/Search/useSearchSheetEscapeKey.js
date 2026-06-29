// src/ui/view/components/Search/useSearchSheetEscapeKey.js
import { useEffect } from "react";

export default function useSearchSheetEscapeKey(isSearchSheetOpen, onCloseSearchSheet) {
	useEffect(() => {
		if (!isSearchSheetOpen) {
			return undefined;
		}

		function closeSearchSheetOnEscape(event) {
			if (event.key === "Escape") {
				event.preventDefault();
				onCloseSearchSheet();
			}
		}

		document.addEventListener("keydown", closeSearchSheetOnEscape);
		return () => {
			document.removeEventListener("keydown", closeSearchSheetOnEscape);
		};
	}, [isSearchSheetOpen, onCloseSearchSheet]);
}
