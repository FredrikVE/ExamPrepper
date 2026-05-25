//src/ui/view/components/Sidebar/AppSidebar.jsx
import SidebarBrand from "./SidebarBrand.jsx";
import SidebarNavigation from "./SidebarNavigation.jsx";
import SidebarSettingsButton from "./SidebarSettingsButton.jsx";
import SidebarUserCard from "./SidebarUserCard.jsx";
import SidebarCloseButton from "./SidebarCloseButton.jsx";

export default function AppSidebar({activeScreen, onChangeScreen, SCREENS, onOpenSettings, sidebarOpen, onCloseSidebar, subjects, selectedSubject, onSelectSubject, onShowAllSubjects }) {
    const className = sidebarOpen
        ? "app-sidebar app-sidebar-open"
        : "app-sidebar";

    const shouldShowSubjectSwitcher =
        activeScreen === SCREENS.SELECT ||
        activeScreen === SCREENS.EXAM;

    return (
        <aside className={className}>
            <SidebarCloseButton onCloseSidebar={onCloseSidebar} />

            {shouldShowSubjectSwitcher && (
                <>
                    <SidebarBrand
                        subjects={subjects}
                        selectedSubject={selectedSubject}
                        onSelectSubject={onSelectSubject}
                        onShowAllSubjects={onShowAllSubjects}
                    />

                    <div className="sidebar-brand-navigation-divider" />
                </>
            )}

            <SidebarNavigation
                activeScreen={activeScreen}
                onChangeScreen={onChangeScreen}
            />

            <SidebarSettingsButton onOpenSettings={onOpenSettings} />

            <SidebarUserCard />
        </aside>
    );
}