// src/ui/view/components/Sidebar/MobileDropDownTopBar.jsx
import { Menu } from "lucide-react";
import { useLanguage } from "../../../../i18n/LanguageContext.jsx";
import SidebarBrand from "./SidebarBrand.jsx";
import SidebarNavigation from "./SidebarNavigation.jsx";
import SidebarSettingsButton from "./SidebarSettingsButton.jsx";
import SidebarUserCard from "./SidebarUserCard.jsx";
import SidebarCloseButton from "./SidebarCloseButton.jsx";
import useMobileMenuEscapeKey from "./useMobileMenuEscapeKey.js";

function MobileDropdownContent(props) {
	return (
		<>
			<SidebarNavigation
				section="primary"
				activeScreen={props.activeScreen}
				onChangeScreen={props.onChangeScreen}
			/>

			<div className="mobile-dropdown-spacer" />

			<SidebarNavigation
				section="secondary"
				activeScreen={props.activeScreen}
				onChangeScreen={props.onChangeScreen}
			/>

			<SidebarSettingsButton
				settingsOpen={props.settingsOpen}
				onOpenSettings={props.onOpenSettings}
			/>

			<SidebarUserCard />

			<SidebarCloseButton onCloseMenu={props.onCloseMenu} />
		</>
	);
}

export default function MobileDropDownTopBar(props) {
	const { t } = useLanguage();

	useMobileMenuEscapeKey(props.isMenuOpen, props.onCloseMenu);

	const shouldShowHeaderBrand = props.isMenuOpen && props.showSubjectSwitcher;

	const topbarClassNames = [
		"mobile-topbar",
		shouldShowHeaderBrand ? "mobile-topbar-open" : null,
		props.isMenuOpen ? "mobile-topbar-menu-open" : null
	].filter(Boolean);

	const topbarClassName = topbarClassNames.join(" ");

	const dropdownClassNames = [
		"mobile-dropdown",
		props.isMenuOpen ? "mobile-dropdown-open" : null,
		props.showSubjectSwitcher ? "mobile-dropdown-with-brand" : null
	].filter(Boolean);

	const dropdownClassName = dropdownClassNames.join(" ");

	const backdropClassName = props.isMenuOpen
		? "mobile-dropdown-backdrop mobile-dropdown-backdrop-visible"
		: "mobile-dropdown-backdrop";

	const menuButtonLabel = props.isMenuOpen
		? t.sidebarCloseNavigation
		: t.sidebarOpenNavigation;

	return (
		<>
			<header className={topbarClassName} aria-label={t.sidebarMobileNavigation}>
				<button
					type="button"
					className="mobile-topbar-menu-button"
					onClick={props.onToggleMenu}
					aria-label={menuButtonLabel}
					aria-controls="app-navigation-menu"
					aria-expanded={props.isMenuOpen}
				>
					<Menu className="mobile-topbar-menu-icon" />
				</button>

				{shouldShowHeaderBrand && (
					<div className="mobile-topbar-subject-switcher">
						<SidebarBrand
							subjects={props.subjects}
							selectedSubject={props.selectedSubject}
							onSelectSubject={props.onSelectSubject}
							onShowAllSubjects={props.onShowAllSubjects}
						/>
					</div>
				)}
			</header>

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
				className={dropdownClassName}
				aria-label={t.sidebarNavigationMenu}
				aria-hidden={!props.isMenuOpen}
			>
				<MobileDropdownContent
					activeScreen={props.activeScreen}
					onChangeScreen={props.onChangeScreen}
					settingsOpen={props.settingsOpen}
					onOpenSettings={props.onOpenSettings}
					onCloseMenu={props.onCloseMenu}
				/>
			</aside>
		</>
	);
}
