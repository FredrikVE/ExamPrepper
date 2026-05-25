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

function SidebarNavigationButton({ Icon, label, active, onClick }) {
    const className = active
        ? "sidebar-navigation-button active"
        : "sidebar-navigation-button";

    return (
        <button
            type="button"
            className={className}
            onClick={onClick}
        >
            <Icon size={22} strokeWidth={2.2} />
            <span>{label}</span>
        </button>
    );
}

export default function SidebarNavigation({ activeScreen, onChangeScreen }) {
    const { t } = useLanguage();

    return (
        <nav
            className="sidebar-navigation"
            aria-label={t.sidebarLabel ?? "Eksamensnavigasjon"}
        >
            {SIDEBAR_NAV_ITEMS.map((item) => {
                const Icon = SIDEBAR_ICONS[item.id] ?? BookOpen;
                const label = t[item.labelKey] ?? item.fallbackLabel;
                const active = item.activeScreens.includes(activeScreen);

                return (
                    <SidebarNavigationButton
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