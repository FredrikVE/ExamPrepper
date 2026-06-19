// src/ui/view/components/Sidebar/useMobileMenuEscapeKey.js
import { useEffect } from "react";

export default function useMobileMenuEscapeKey({
	isMenuOpen,
	onCloseMenu,
	isSettingsOpen,
	onCloseSettings,
	isSubmitConfirmOpen,
	onCloseSubmitConfirm,
	isSubjectPickerOpen,
	onCloseSubjectPicker
}) {
	useEffect(() => {
		if (!isMenuOpen || typeof window === "undefined") {
			return undefined;
		}

		const handleEscape = (event) => {
			if (event.key !== "Escape") {
				return;
			}

			if (isSettingsOpen && onCloseSettings) {
				onCloseSettings();
				return;
			}

			if (isSubmitConfirmOpen) {
				onCloseSubmitConfirm?.();
				return;
			}

			if (isSubjectPickerOpen) {
				onCloseSubjectPicker?.();
				return;
			}

			onCloseMenu();
		};

		window.addEventListener("keydown", handleEscape);

		return () => {
			window.removeEventListener("keydown", handleEscape);
		};
	}, [
		isMenuOpen,
		onCloseMenu,
		isSettingsOpen,
		onCloseSettings,
		isSubmitConfirmOpen,
		onCloseSubmitConfirm,
		isSubjectPickerOpen,
		onCloseSubjectPicker
	]);
}
