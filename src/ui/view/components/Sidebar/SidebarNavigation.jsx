// src/ui/view/components/Sidebar/SidebarNavigation.jsx
import { BarChart3, BookOpen, Home } from "lucide-react";
import { useLanguage } from "../../../../i18n/LanguageContext.jsx";
import { NAV_ITEMS, NAV_SCREENS } from "../../../../navigation/navigation.js";

const SIDEBAR_ICONS = {
	"bar-chart-3": BarChart3,
	home: Home
};

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
		<nav className={CLASS_NAMES.navigation} aria-label={t.sidebarLabel ?? "Eksamensnavigasjon"}>
			{visibleItems.map((item) => {
				const Icon = SIDEBAR_ICONS[item.iconKey] ?? BookOpen;
				const label = t[item.labelKey] ?? item.fallbackLabel;
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

function shouldShowNavigationItem(item, activeScreen) {
	if (activeScreen === NAV_SCREENS.SUBJECTS) {
		return item.screen !== NAV_SCREENS.SUBJECTS;
	}

	return true;
}
