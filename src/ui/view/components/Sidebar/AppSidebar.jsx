// src/ui/view/components/Sidebar/AppSidebar.jsx
import { useLanguage } from "../../../../i18n/LanguageContext.jsx";
import SidebarBrand from "./SidebarBrand.jsx";
import SidebarNavigation from "./SidebarNavigation.jsx";
import SidebarSettingsButton from "./SidebarSettingsButton.jsx";
import SidebarUserCard from "./SidebarUserCard.jsx";
import SidebarCloseButton from "./SidebarCloseButton.jsx";
import useMobileMenuEscapeKey from "./useMobileMenuEscapeKey.js";
import useCloseMobileMenuOnDesktopBreakpoint from "./useCloseMobileMenuOnDesktopBreakpoint.js";

function SidebarContent(props) {
	return (
		<>
			{props.showSubjectSwitcher && (
				<>
					<SidebarBrand
						subjects={props.subjects}
						selectedSubject={props.selectedSubject}
						onSelectSubject={props.onSelectSubject}
						onShowAllSubjects={props.onShowAllSubjects}
					/>

					<div className="sidebar-brand-navigation-divider" />
				</>
			)}

			<SidebarNavigation
				section="primary"
				activeScreen={props.activeScreen}
				onChangeScreen={props.onChangeScreen}
			/>

			<div className="sidebar-spacer" />

			<SidebarNavigation
				section="secondary"
				activeScreen={props.activeScreen}
				onChangeScreen={props.onChangeScreen}
			/>

			<SidebarSettingsButton settingsOpen={props.settingsOpen} onOpenSettings={props.onOpenSettings} />

			<SidebarUserCard />

			<SidebarCloseButton onCloseMenu={props.onCloseMenu} />
		</>
	);
}

export default function AppSidebar(props) {
	const { t } = useLanguage();

	useMobileMenuEscapeKey(props.isMenuOpen, props.onCloseMenu);
	useCloseMobileMenuOnDesktopBreakpoint(props.isMenuOpen, props.onCloseMenu);

	const mobileTopsheetClassNames = [
		"mobile-topsheet",
		props.isMenuOpen ? "mobile-topsheet-open" : null,
		props.showSubjectSwitcher ? "mobile-topsheet-with-brand" : null
	].filter(Boolean);

	const mobileTopsheetClassName = mobileTopsheetClassNames.join(" ");

	const backdropClassName = props.isMenuOpen
		? "mobile-topsheet-backdrop mobile-topsheet-backdrop-visible"
		: "mobile-topsheet-backdrop";

	return (
		<>
			<button
				type="button"
				className={backdropClassName}
				onClick={props.onCloseMenu}
				aria-label={t.sidebarCloseNavigation}
				aria-hidden={!props.isMenuOpen}
				tabIndex={props.isMenuOpen ? 0 : -1}
			/>

			<aside
				className="desktop-sidebar"
				aria-label={t.sidebarNavigationMenu}
			>
				<SidebarContent {...props} />
			</aside>

			<aside
				id="app-navigation-menu"
				className={mobileTopsheetClassName}
				aria-label={t.sidebarNavigationMenu}
			>
				<SidebarContent {...props} />
			</aside>
		</>
	);
}
