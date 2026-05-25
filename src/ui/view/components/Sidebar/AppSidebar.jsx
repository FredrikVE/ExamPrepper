//src/ui/view/components/Sidebar/AppSidebar.jsx
import { useLanguage } from "../../../../i18n/LanguageContext.jsx";
import SidebarBrand from "./SidebarBrand.jsx";
import SidebarCloseButton from "./SidebarCloseButton.jsx";
import SidebarNavigation from "./SidebarNavigation.jsx";
import SidebarSettingsButton from "./SidebarSettingsButton.jsx";
import SidebarUserCard from "./SidebarUserCard.jsx";

export default function AppSidebar({ activeScreen, onChangeScreen, SCREENS, settingsOpen, onOpenSettings, sidebarOpen, onCloseSidebar, subjects, selectedSubject, onSelectSubject, onShowAllSubjects }) {

    const { t } = useLanguage();

    return (
        <>
            <div
                className={`app-sidebar-backdrop ${sidebarOpen ? "app-sidebar-backdrop-open" : ""}`}
                onClick={onCloseSidebar}
                aria-hidden="true"
            />

            <aside
                className={`app-sidebar ${sidebarOpen ? "app-sidebar-open" : ""}`}
                aria-label={t.sidebarLabel}
            >
                <SidebarCloseButton onCloseSidebar={onCloseSidebar} />

                <SidebarBrand
                    subjects={subjects}
                    selectedSubject={selectedSubject}
                    onSelectSubject={onSelectSubject}
                    onShowAllSubjects={onShowAllSubjects}
                />

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
        </>
    );
}