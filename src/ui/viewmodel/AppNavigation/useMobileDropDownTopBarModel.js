// src/ui/viewmodel/AppNavigation/useMobileDropDownTopBarModel.js
import { useCallback, useState } from "react";

export default function useMobileDropDownTopBarModel() {
	const [isMobileDropDownTopBarMenuOpen, setIsMobileDropDownTopBarMenuOpen] = useState(false);
	const [isMobileSubjectPickerOpen, setIsMobileSubjectPickerOpen] = useState(false);

	const toggleMobileDropDownTopBarMenu = useCallback(() => {
		setIsMobileDropDownTopBarMenuOpen((wasOpen) => !wasOpen);
	}, []);

	const closeMobileDropDownTopBarMenu = useCallback(() => {
		setIsMobileDropDownTopBarMenuOpen(false);
	}, []);

	const toggleMobileSubjectPicker = useCallback(() => {
		setIsMobileSubjectPickerOpen((wasOpen) => !wasOpen);
	}, []);

	const closeMobileSubjectPicker = useCallback(() => {
		setIsMobileSubjectPickerOpen(false);
	}, []);

	return {
		isMobileDropDownTopBarMenuOpen,
		isMobileSubjectPickerOpen,
		toggleMobileDropDownTopBarMenu,
		closeMobileDropDownTopBarMenu,
		toggleMobileSubjectPicker,
		closeMobileSubjectPicker
	};
}
