// src/ui/view/components/Sidebar/AppSidebar.jsx
import SidebarBrand from "./SidebarBrand.jsx";
import SidebarNavigation from "./SidebarNavigation.jsx";
import SidebarSettingsButton from "./SidebarSettingsButton.jsx";
import SidebarUserCard from "./SidebarUserCard.jsx";
import SidebarCloseButton from "./SidebarCloseButton.jsx";
import useMobileMenuEscapeKey from "./useMobileMenuEscapeKey.js";

export default function AppSidebar({ activeScreen, onChangeScreen, settingsOpen, onOpenSettings, isMenuOpen, onCloseMenu, showSubjectSwitcher, subjects, selectedSubject, onSelectSubject, onShowAllSubjects }) {
	useMobileMenuEscapeKey(isMenuOpen, onCloseMenu);

	const sidebarClassNames = [
		"app-sidebar",
		isMenuOpen ? "app-sidebar-open" : null,
		showSubjectSwitcher ? "app-sidebar-with-brand" : null
	].filter(Boolean);

	const sidebarClassName = sidebarClassNames.join(" ");

	const backdropClassName = isMenuOpen
		? "app-sidebar-backdrop app-sidebar-backdrop-open"
		: "app-sidebar-backdrop";

	return (
		<>
			<button
				type="button"
				className={backdropClassName}
				onClick={onCloseMenu}
				aria-label="Lukk navigasjon"
				aria-hidden={!isMenuOpen}
				tabIndex={isMenuOpen ? 0 : -1}
			/>

			<aside
				id="app-navigation-menu"
				className={sidebarClassName}
				aria-label="Navigasjonsmeny"
			>
				{showSubjectSwitcher && (
					<>
						<SidebarBrand
							subjects={subjects}
							selectedSubject={selectedSubject}
							onSelectSubject={onSelectSubject}
							onShowAllSubjects={onShowAllSubjects}
						/>

						<div className="sidebar-brand-navigation-divider" />
					</>
				)}

				<SidebarNavigation
					section="primary"
					activeScreen={activeScreen}
					onChangeScreen={onChangeScreen}
				/>

				<div className="sidebar-spacer" />

				<SidebarNavigation
					section="secondary"
					activeScreen={activeScreen}
					onChangeScreen={onChangeScreen}
				/>

				<SidebarSettingsButton settingsOpen={settingsOpen} onOpenSettings={onOpenSettings} />

				<SidebarUserCard />

				<SidebarCloseButton onCloseMenu={onCloseMenu} />
			</aside>
		</>
	);
}
