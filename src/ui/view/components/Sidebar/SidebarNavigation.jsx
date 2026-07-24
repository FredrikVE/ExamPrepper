// src/ui/view/components/Sidebar/SidebarNavigation.jsx
import { useLanguage } from "../../../../i18n/LanguageContext.jsx";
import { NAV_ITEMS } from "../../../../navigation/navigation.js";
import { getSidebarIcon, shouldShowNavigationItem } from "./sidebarNavigationModel.js";

const CLASS_NAMES = {
	navigation: "sidebar-navigation",
	item: "sidebar-navigation-item",
	itemActive: "sidebar-navigation-item-active",
	icon: "sidebar-navigation-icon"
};

export default function SidebarNavigation({ activeScreen, onChangeScreen, section }) {
	const { t } = useLanguage();
	const visibleItems = NAV_ITEMS.sidebarItems.filter((item) => item.section === section && shouldShowNavigationItem(item, activeScreen));

	if (visibleItems.length === 0) {
		return null;
	}

	return (
		<nav className={CLASS_NAMES.navigation} aria-label={t.sidebarLabel}>
			{visibleItems.map((item) => {
				const Icon = getSidebarIcon(item.iconKey);
				const label = t[item.labelKey];
				const active = item.activeScreens.includes(activeScreen);

				return <SidebarNavigationItem key={item.id} Icon={Icon} label={label} active={active} onClick={() => onChangeScreen(item.screen)} />;
			})}
		</nav>
	);
}

function getNavigationItemClassName(active) {
	return active ? `${CLASS_NAMES.item} ${CLASS_NAMES.itemActive}` : CLASS_NAMES.item;
}

function SidebarNavigationIcon({ Icon }) {
	return <Icon className={CLASS_NAMES.icon} aria-hidden="true" focusable="false" />;
}

function SidebarNavigationItem({ Icon, label, active, onClick }) {
	return (
		<button type="button" className={getNavigationItemClassName(active)} onClick={onClick} aria-current={active ? "page" : undefined}>
			<SidebarNavigationIcon Icon={Icon} />
			<span>{label}</span>
		</button>
	);
}
