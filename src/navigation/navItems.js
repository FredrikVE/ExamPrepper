// src/navigation/navItems.js
import { NAV_SCREENS } from "./navGraph.js";

export const SIDEBAR_NAV_ITEMS = [
    {
        id: "subjects",
        section: "primary",
        screen: NAV_SCREENS.SUBJECTS,
        labelKey: "sidebarSubjects",
        fallbackLabel: "Velg fag fra hjemskjerm",
        activeScreens: [NAV_SCREENS.SUBJECTS]
    },
    {
        id: "exams",
        section: "primary",
        screen: NAV_SCREENS.SELECT,
        labelKey: "sidebarExams",
        fallbackLabel: "Velg eksamen",
        activeScreens: [NAV_SCREENS.SELECT, NAV_SCREENS.EXAM, NAV_SCREENS.FLIPCARDS, NAV_SCREENS.MATCHCARDS]
    },
    {
        id: "overview",
        section: "secondary",
        screen: NAV_SCREENS.OVERVIEW,
        labelKey: "sidebarStatistics",
        fallbackLabel: "Din statistikk",
        activeScreens: [NAV_SCREENS.OVERVIEW]
    }
];
