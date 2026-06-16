// src/ui/view/components/Sidebar/SidebarCloseButton.jsx
import { ChevronUp } from "lucide-react";
import { useLanguage } from "../../../../i18n/LanguageContext.jsx";

export default function SidebarCloseButton({ onCloseMenu }) {
	const { t } = useLanguage();

	return (
		<button
			type="button"
			className="sidebar-close-button"
			onClick={onCloseMenu}
			aria-label={t.sidebarCloseNavigation}
			aria-controls="app-navigation-menu"
		>
			<ChevronUp className="sidebar-close-button-icon" />
		</button>
	);
}
