// src/ui/view/components/Sidebar/useMobileMenuEscapeKey.js
import { useEffect } from "react";

export default function useMobileMenuEscapeKey({
	isMobileDropDownTopBarMenuOpen,
	onCloseMobileDropDownTopBarMenu,
	isSettingsPresentationOpen,
	onCloseSettingsPresentation,
	isSubmitConfirmOpen,
	onCloseSubmitConfirm,
	isMobileSubjectPickerOpen,
	onCloseMobileSubjectPicker
}) {
	useEffect(() => {
		if (!isMobileDropDownTopBarMenuOpen || typeof window === "undefined") {
			return undefined;
		}

		const handleEscape = (event) => {
			if (event.key !== "Escape") {
				return;
			}

			if (isSettingsPresentationOpen && onCloseSettingsPresentation) {
				onCloseSettingsPresentation();
				return;
			}

			if (isSubmitConfirmOpen) {
				onCloseSubmitConfirm?.();
				return;
			}

			if (isMobileSubjectPickerOpen) {
				onCloseMobileSubjectPicker?.();
				return;
			}

			onCloseMobileDropDownTopBarMenu();
		};

		window.addEventListener("keydown", handleEscape);

		return () => {
			window.removeEventListener("keydown", handleEscape);
		};
	}, [
		isMobileDropDownTopBarMenuOpen,
		onCloseMobileDropDownTopBarMenu,
		isSettingsPresentationOpen,
		onCloseSettingsPresentation,
		isSubmitConfirmOpen,
		onCloseSubmitConfirm,
		isMobileSubjectPickerOpen,
		onCloseMobileSubjectPicker
	]);
}
