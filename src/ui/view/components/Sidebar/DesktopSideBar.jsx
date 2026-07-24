// src/ui/view/components/Sidebar/DesktopSideBar.jsx
import { useLanguage } from "../../../../i18n/LanguageContext.jsx";
import SidebarBrand from "./SidebarBrand.jsx";
import SidebarNavigation from "./SidebarNavigation.jsx";
import SidebarSettingsButton from "./SidebarSettingsButton.jsx";
import SidebarUserCard from "./SidebarUserCard.jsx";

export default function DesktopSideBar(props) {
	const { t } = useLanguage();

	return (
		<aside className="desktop-sidebar" aria-label={t.sidebarNavigationMenu}>
			{props.showSubjectSwitcher && (
				<>
					<SidebarBrand subjectSwitcher={props.subjectSwitcher} onSelectSubject={props.onSelectSubject} />

					<div className="desktop-sidebar-divider" />
				</>
			)}

			<SidebarNavigation
				section="primary"
				activeScreen={props.activeScreen}
				onChangeScreen={props.onChangeScreen}
			/>

			<div className="desktop-sidebar-spacer" />

			<SidebarNavigation
				section="secondary"
				activeScreen={props.activeScreen}
				onChangeScreen={props.onChangeScreen}
			/>

			<SidebarSettingsButton
				isSettingsPresentationOpen={props.isSettingsPresentationOpen}
				onOpenSettingsPresentation={props.onOpenSettingsPresentation}
			/>

			<SidebarUserCard />
		</aside>
	);
}
