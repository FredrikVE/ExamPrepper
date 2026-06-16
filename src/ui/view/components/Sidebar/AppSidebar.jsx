// src/ui/view/components/Sidebar/AppSidebar.jsx
import SidebarBrand from "./SidebarBrand.jsx";
import SidebarNavigation from "./SidebarNavigation.jsx";
import SidebarSettingsButton from "./SidebarSettingsButton.jsx";
import SidebarUserCard from "./SidebarUserCard.jsx";
import SidebarCloseButton from "./SidebarCloseButton.jsx";

export default function AppSidebar({ activeScreen, onChangeScreen, SCREENS, onOpenSettings, isMenuOpen, onCloseMenu, subjects, selectedSubject, onSelectSubject, onShowAllSubjects }) {
	const sidebarClassName = isMenuOpen
		? "app-sidebar app-sidebar-open"
		: "app-sidebar";

	const backdropClassName = isMenuOpen
		? "app-sidebar-backdrop app-sidebar-backdrop-open"
		: "app-sidebar-backdrop";

	const shouldShowSubjectSwitcher =
		activeScreen === SCREENS.SELECT ||
		activeScreen === SCREENS.EXAM;

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
				{shouldShowSubjectSwitcher && (
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

				<SidebarSettingsButton onOpenSettings={onOpenSettings} />

				<SidebarUserCard />

				<SidebarCloseButton onCloseMenu={onCloseMenu} />
			</aside>
		</>
	);
}
