// src/ui/view/components/Sidebar/useMobileNavigationAnimation.js
import { useState, useCallback, useRef, useLayoutEffect } from "react";

// Dekker begge mobile navigasjonsmoduser.
// Må holdes i synk med CSS-breakpointene i sidebar-menu-button.css.
const NAV_MODE_MQ = "(max-width: 767px), (max-width: 932px) and (orientation: landscape)";

const ANIMATION_DURATION_MS = 260;

export default function useMobileNavigationAnimation({ isMenuOpen, onToggleMenu, onCloseMenu }) {
	const [allowAnimation, setAllowAnimation] = useState(false);
	const timerRef = useRef(null);

	const enableAnimationBriefly = useCallback(() => {
		window.clearTimeout(timerRef.current);
		setAllowAnimation(true);

		timerRef.current = window.setTimeout(() => {
			setAllowAnimation(false);
		}, ANIMATION_DURATION_MS);
	}, []);

	const handleToggleMenu = useCallback(() => {
		enableAnimationBriefly();
		onToggleMenu();
	}, [enableAnimationBriefly, onToggleMenu]);

	const handleCloseMenu = useCallback(() => {
		enableAnimationBriefly();
		onCloseMenu();
	}, [enableAnimationBriefly, onCloseMenu]);

	useLayoutEffect(() => {
		if (typeof window === "undefined") {
			return undefined;
		}

		const mediaQuery = window.matchMedia(NAV_MODE_MQ);

		const handleNavModeChange = () => {
			window.clearTimeout(timerRef.current);
			setAllowAnimation(false);

			if (isMenuOpen) {
				onCloseMenu();
			}
		};

		mediaQuery.addEventListener("change", handleNavModeChange);

		return () => {
			mediaQuery.removeEventListener("change", handleNavModeChange);
			window.clearTimeout(timerRef.current);
		};
	}, [isMenuOpen, onCloseMenu]);

	return {
		allowAnimation,
		handleToggleMenu,
		handleCloseMenu,
	};
}
