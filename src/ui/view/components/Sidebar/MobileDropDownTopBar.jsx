// src/ui/view/components/Sidebar/MobileDropDownTopBar.jsx
import { Menu } from "lucide-react";
import { useLanguage } from "../../../../i18n/LanguageContext.jsx";
import MobileSubjectPicker from "./MobileSubjectPicker.jsx";
import SidebarNavigation from "./SidebarNavigation.jsx";
import SidebarSettingsButton from "./SidebarSettingsButton.jsx";
import SidebarUserCard from "./SidebarUserCard.jsx";
import SidebarCloseButton from "./SidebarCloseButton.jsx";
import useMobileMenuEscapeKey from "./useMobileMenuEscapeKey.js";

function MobileDropdownContent(props) {
	return (
		<>
			{props.showSubjectSwitcher && (
				<MobileSubjectPicker
					subjects={props.subjects}
					selectedSubject={props.selectedSubject}
					isOpen={props.isSubjectPickerOpen}
					onToggle={props.onToggleSubjectPicker}
					onClose={props.onCloseSubjectPicker}
					onSelectSubject={props.onSelectSubject}
					onShowAllSubjects={props.onShowAllSubjects}
				/>
			)}

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

	useMobileMenuEscapeKey(
		props.isMenuOpen,
		props.onCloseMenu,
		props.isSubjectPickerOpen,
		props.onCloseSubjectPicker
	);

	const topbarClassName = props.isMenuOpen
		? "mobile-topbar mobile-topbar-menu-open"
		: "mobile-topbar";

	const dropdownClassName = props.isMenuOpen
		? "mobile-dropdown mobile-dropdown-open"
		: "mobile-dropdown";

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
					showSubjectSwitcher={props.showSubjectSwitcher}
					subjects={props.subjects}
					selectedSubject={props.selectedSubject}
					isSubjectPickerOpen={props.isSubjectPickerOpen}
					onToggleSubjectPicker={props.onToggleSubjectPicker}
					onCloseSubjectPicker={props.onCloseSubjectPicker}
					onSelectSubject={props.onSelectSubject}
					onShowAllSubjects={props.onShowAllSubjects}
				/>
			</aside>
		</>
	);
}
