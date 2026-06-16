// src/ui/view/components/Sidebar/useCloseMobileMenuOnDesktopBreakpoint.js
import { useEffect } from "react";

const DESKTOP_BREAKPOINT = "(min-width: 768px)";

export default function useCloseMobileMenuOnDesktopBreakpoint(isMenuOpen, onCloseMenu) {
	useEffect(() => {
		if (!isMenuOpen || typeof window === "undefined") {
			return undefined;
		}

		const mediaQuery = window.matchMedia(DESKTOP_BREAKPOINT);

		const closeMenuOnDesktop = (event) => {
			if (event.matches) {
				onCloseMenu();
			}
		};

		mediaQuery.addEventListener("change", closeMenuOnDesktop);

		return () => {
			mediaQuery.removeEventListener("change", closeMenuOnDesktop);
		};
	}, [isMenuOpen, onCloseMenu]);
}
