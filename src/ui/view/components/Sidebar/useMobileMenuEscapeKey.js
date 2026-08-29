// src/ui/view/components/Sidebar/useMobileMenuEscapeKey.js
import useKeyboardShortcuts from "../../KeyboardNavigation/useKeyboardShortcuts.js";

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
	function closeActiveMobileMenuLayerOnEscape(event) {
		if (event.key !== "Escape") {
			return;
		}

		if (isSettingsPresentationOpen) {
			onCloseSettingsPresentation();
			return;
		}

		if (isSubmitConfirmOpen) {
			onCloseSubmitConfirm();
			return;
		}

		if (isMobileSubjectPickerOpen) {
			onCloseMobileSubjectPicker();
			return;
		}

		onCloseMobileDropDownTopBarMenu();
	}

	useKeyboardShortcuts({
		isEnabled: isMobileDropDownTopBarMenuOpen,
		onKeyDown: closeActiveMobileMenuLayerOnEscape
	});
}
