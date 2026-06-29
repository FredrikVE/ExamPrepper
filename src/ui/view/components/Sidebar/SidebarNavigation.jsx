// src/ui/view/components/Sidebar/SidebarNavigation.jsx
import { BookOpen, BarChart3, GalleryHorizontalEnd, Home } from "lucide-react";
import { useLanguage } from "../../../../i18n/LanguageContext.jsx";
import { SIDEBAR_NAV_ITEMS } from "../../../../navigation/navItems.js";
import { NAV_SCREENS } from "../../../../navigation/navGraph.js";

const SIDEBAR_ICONS = {
    subjects: Home,
    exams: BookOpen,
    flipcards: GalleryHorizontalEnd,
    overview: BarChart3
};

const CLASS_NAMES = {
    navigation: "sidebar-navigation",
    item: "sidebar-navigation-item",
    itemActive: "sidebar-navigation-item-active",
    icon: "sidebar-navigation-icon"
};

export default function SidebarNavigation({ activeScreen, onChangeScreen, section, hasSelectedSubject }) {
    const { t } = useLanguage();

    const visibleItems = SIDEBAR_NAV_ITEMS.filter((item) => {
        return item.section === section && shouldShowNavigationItem(item, activeScreen, hasSelectedSubject);
    });

    if (visibleItems.length === 0) {
        return null;
    }

    return (
        <nav
            className={CLASS_NAMES.navigation}
            aria-label={t.sidebarLabel ?? "Eksamensnavigasjon"}
        >
            {visibleItems.map((item) => {
                const Icon = SIDEBAR_ICONS[item.id] ?? BookOpen;
                const label = t[item.labelKey] ?? item.fallbackLabel;
                const active = item.activeScreens.includes(activeScreen);

                return (
                    <SidebarNavigationItem
                        key={item.id}
                        Icon={Icon}
                        label={label}
                        active={active}
                        onClick={() => onChangeScreen(item.screen)}
                    />
                );
            })}
        </nav>
    );
}

function getNavigationItemClassName(active) {
	return active
		? `${CLASS_NAMES.item} ${CLASS_NAMES.itemActive}`
		: CLASS_NAMES.item;
}

const SidebarNavigationIcon = ({ Icon }) => {
    return (
        <Icon
            className={CLASS_NAMES.icon}
            aria-hidden="true"
            focusable="false"
        />
    );
};

const SidebarNavigationItem = ({ Icon, label, active, onClick }) => {
    return (
        <button
            type="button"
            className={getNavigationItemClassName(active)}
            onClick={onClick}
            aria-current={active ? "page" : undefined}
        >
            <SidebarNavigationIcon Icon={Icon} />
            <span>{label}</span>
        </button>
    );
};

const shouldShowNavigationItem = (item, activeScreen, hasSelectedSubject) => {
    const isSubjectHomeButton = item.screen === NAV_SCREENS.SUBJECTS;
    const isExamSelectButton = item.screen === NAV_SCREENS.SELECT;

    if (item.requiresSubject && !hasSelectedSubject) {
        return false;
    }

    if (activeScreen === NAV_SCREENS.SUBJECTS) {
        return !isSubjectHomeButton && !isExamSelectButton;
    }

    if (activeScreen === NAV_SCREENS.SELECT) {
        return !isExamSelectButton;
    }

    return true;
};