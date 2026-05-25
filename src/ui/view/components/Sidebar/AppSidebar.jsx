import { useLanguage } from "../../../../i18n/LanguageContext.jsx";
import SidebarBrand from "./SidebarBrand.jsx";
import SidebarNavigation from "./SidebarNavigation.jsx";
import SidebarSettingsButton from "./SidebarSettingsButton.jsx";
import SidebarUserCard from "./SidebarUserCard.jsx";

export default function AppSidebar({ activeScreen, onChangeScreen, SCREENS, settingsOpen, onOpenSettings }) {
    const { t } = useLanguage();

    return (
        <aside className="app-sidebar" aria-label={t.sidebarLabel}>
            <SidebarBrand />

            <SidebarNavigation
                activeScreen={activeScreen}
                onChangeScreen={onChangeScreen}
                SCREENS={SCREENS}
            />

            <div className="app-sidebar-divider" />

            <SidebarSettingsButton
                settingsOpen={settingsOpen}
                onOpenSettings={onOpenSettings}
            />

            <SidebarUserCard />
        </aside>
    );
}