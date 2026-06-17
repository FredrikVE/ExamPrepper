// src/ui/view/components/Sidebar/useMobileMenuEscapeKey.js
import { useEffect } from "react";

export default function useMobileMenuEscapeKey(isMenuOpen, onCloseMenu, isSubjectPickerOpen, onCloseSubjectPicker) {
	useEffect(() => {
		if (!isMenuOpen || typeof window === "undefined") {
			return undefined;
		}

		const handleEscape = (event) => {
			if (event.key !== "Escape") {
				return;
			}

			if (isSubjectPickerOpen && onCloseSubjectPicker) {
				onCloseSubjectPicker();
			} else {
				onCloseMenu();
			}
		};

		window.addEventListener("keydown", handleEscape);

		return () => {
			window.removeEventListener("keydown", handleEscape);
		};
	}, [isMenuOpen, onCloseMenu, isSubjectPickerOpen, onCloseSubjectPicker]);
}
