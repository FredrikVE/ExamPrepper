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
        id: "overview",
        section: "secondary",
        screen: NAV_SCREENS.OVERVIEW,
        labelKey: "sidebarStatistics",
        fallbackLabel: "Din statistikk",
        activeScreens: [NAV_SCREENS.OVERVIEW]
    }
];
