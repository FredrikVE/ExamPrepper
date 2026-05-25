//src/ui/view/components/Sidebar/SidebarNavigation.jsx
import { BarChart3, FileText, Home, PencilLine } from "lucide-react";
import { useLanguage } from "../../../../i18n/LanguageContext.jsx";

export default function SidebarNavigation({ activeScreen, onChangeScreen, SCREENS }) {
    const { t } = useLanguage();

    const navItems = [
        { screen: SCREENS.SELECT, label: t.sidebarHome, icon: Home },
        { screen: SCREENS.EXAM, label: t.sidebarTask, icon: FileText },
        { screen: SCREENS.OVERVIEW, label: t.sidebarOverview, icon: BarChart3 },
        { screen: SCREENS.NOTES, label: t.sidebarNotes, icon: PencilLine }
    ];

    return (
        <nav className="sidebar-navigation">
            {navItems.map(({ screen, label, icon: Icon }) => (
                <button
                    key={screen}
                    type="button"
                    onClick={() => onChangeScreen(screen)}
                    className={`sidebar-navigation-item ${activeScreen === screen ? "sidebar-navigation-item-active" : ""}`}
                >
                    <Icon className="sidebar-navigation-icon" />
                    <span>{label}</span>
                </button>
            ))}
        </nav>
    );
}