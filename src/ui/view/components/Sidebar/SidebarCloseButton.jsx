// src/ui/view/components/Sidebar/SidebarCloseButton.jsx
import { ChevronUp } from "lucide-react";

export default function SidebarCloseButton({ onCloseMenu }) {
	return (
		<button
			type="button"
			className="sidebar-close-button"
			onClick={onCloseMenu}
			aria-label="Lukk navigasjon"
			aria-controls="app-navigation-menu"
		>
			<ChevronUp className="sidebar-close-button-icon" />
		</button>
	);
}
