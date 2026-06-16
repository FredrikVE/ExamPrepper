// src/ui/view/components/Sidebar/useMobileMenuEscapeKey.js
import { useEffect } from "react";

export default function useMobileMenuEscapeKey(isMenuOpen, onCloseMenu) {
	useEffect(() => {
		if (!isMenuOpen || typeof window === "undefined") {
			return undefined;
		}

		const closeMenuOnEscape = (event) => {
			if (event.key === "Escape") {
				onCloseMenu();
			}
		};

		window.addEventListener("keydown", closeMenuOnEscape);

		return () => {
			window.removeEventListener("keydown", closeMenuOnEscape);
		};
	}, [isMenuOpen, onCloseMenu]);
}
