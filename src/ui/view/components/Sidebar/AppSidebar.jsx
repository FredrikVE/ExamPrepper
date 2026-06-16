// src/ui/view/components/Sidebar/AppSidebar.jsx
import { useLanguage } from "../../../../i18n/LanguageContext.jsx";
import SidebarBrand from "./SidebarBrand.jsx";
import SidebarNavigation from "./SidebarNavigation.jsx";
import SidebarSettingsButton from "./SidebarSettingsButton.jsx";
import SidebarUserCard from "./SidebarUserCard.jsx";
import SidebarCloseButton from "./SidebarCloseButton.jsx";
import useMobileMenuEscapeKey from "./useMobileMenuEscapeKey.js";

export default function AppSidebar(props) {
	const { t } = useLanguage();

	useMobileMenuEscapeKey(props.isMenuOpen, props.onCloseMenu);

	const sidebarClassNames = [
		"app-sidebar",
		props.isMenuOpen ? "app-sidebar-open" : null,
		props.showSubjectSwitcher ? "app-sidebar-with-brand" : null
	].filter(Boolean);

	const sidebarClassName = sidebarClassNames.join(" ");

	const backdropClassName = props.isMenuOpen
		? "app-sidebar-backdrop app-sidebar-backdrop-open"
		: "app-sidebar-backdrop";

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
				id="app-navigation-menu"
				className={sidebarClassName}
				aria-label={t.sidebarNavigationMenu}
			>
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
			</aside>
		</>
	);
}
