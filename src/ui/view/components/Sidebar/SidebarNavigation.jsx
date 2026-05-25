//src/ui/view/components/Sidebar/SidebarNavigation.jsx
import { BookOpen, BarChart3, Home, PencilLine } from "lucide-react";
import { useLanguage } from "../../../../i18n/LanguageContext.jsx";
import { SIDEBAR_NAV_ITEMS } from "../../../../navigation/navItems.js";

const SIDEBAR_ICONS = {
    exams: BookOpen,
    subjects: Home,
    overview: BarChart3,
    notes: PencilLine
};

const CLASS_NAMES = {
    navigation: "sidebar-navigation",
    item: "sidebar-navigation-item",
    itemActive: "sidebar-navigation-item-active",
    icon: "sidebar-navigation-icon"
};

function getNavigationItemClassName(active) {
    if (active) {
        return `${CLASS_NAMES.item} ${CLASS_NAMES.itemActive}`;
    }

    return CLASS_NAMES.item;
}

function SidebarNavigationIcon({ Icon }) {
    return (
        <Icon
            className={CLASS_NAMES.icon}
            aria-hidden="true"
            focusable="false"
        />
    );
}

function SidebarNavigationItem({ Icon, label, active, onClick }) {
    return (
        <button
            type="button"
            className={getNavigationItemClassName(active)}
            onClick={onClick}
        >
            <SidebarNavigationIcon Icon={Icon} />
            <span>{label}</span>
        </button>
    );
}

export default function SidebarNavigation({ activeScreen, onChangeScreen }) {
    const { t } = useLanguage();

    return (
        <nav
            className={CLASS_NAMES.navigation}
            aria-label={t.sidebarLabel ?? "Eksamensnavigasjon"}
        >
            {SIDEBAR_NAV_ITEMS.map((item) => {
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