// src/ui/viewmodel/AppNavigation/useMobileDropDownTopBarModel.js
import { useCallback, useState } from "react";

export default function useMobileDropDownTopBarModel() {
	const [isMobileDropDownMenuOpen, setIsMobileDropDownMenuOpen] = useState(false);
	const [isMobileSubjectPickerOpen, setIsMobileSubjectPickerOpen] = useState(false);

	const toggleMobileDropDownMenu = useCallback(() => {
		setIsMobileDropDownMenuOpen((wasOpen) => !wasOpen);
	}, []);

	const closeMobileDropDownMenu = useCallback(() => {
		setIsMobileDropDownMenuOpen(false);
	}, []);

	const toggleMobileSubjectPicker = useCallback(() => {
		setIsMobileSubjectPickerOpen((wasOpen) => !wasOpen);
	}, []);

	const closeMobileSubjectPicker = useCallback(() => {
		setIsMobileSubjectPickerOpen(false);
	}, []);

	return {
		isMobileDropDownMenuOpen,
		isMobileSubjectPickerOpen,
		toggleMobileDropDownMenu,
		closeMobileDropDownMenu,
		toggleMobileSubjectPicker,
		closeMobileSubjectPicker
	};
}
