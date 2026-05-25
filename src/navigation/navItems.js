//src/navigation/navItems.js
import { NAV_SCREENS } from "./navGraph.js";

export const SIDEBAR_NAV_ITEMS = [
    {
        id: "exams",
        screen: NAV_SCREENS.SELECT,
        labelKey: "sidebarExams",
        fallbackLabel: "Velg eksamen",
        activeScreens: [NAV_SCREENS.SELECT, NAV_SCREENS.EXAM]
    },
    {
        id: "subjects",
        screen: NAV_SCREENS.SUBJECTS,
        labelKey: "sidebarSubjects",
        fallbackLabel: "Velg fag fra hjemskjerm",
        activeScreens: [NAV_SCREENS.SUBJECTS]
    },
    {
        id: "overview",
        screen: NAV_SCREENS.OVERVIEW,
        labelKey: "sidebarOverview",
        fallbackLabel: "Oversikt",
        activeScreens: [NAV_SCREENS.OVERVIEW]
    },
    {
        id: "notes",
        screen: NAV_SCREENS.NOTES,
        labelKey: "sidebarNotes",
        fallbackLabel: "Notater",
        activeScreens: [NAV_SCREENS.NOTES]
    }
];