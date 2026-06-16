// src/ui/viewmodel/Utils/createMobileHeaderModel.js
import { NAV_SCREENS } from "../../../navigation/navGraph.js";

export default function createMobileHeaderModel(activeScreen, t) {
    return {
        activeLabel: createMobileHeaderActiveLabel(activeScreen, t)
    };
}

function createMobileHeaderActiveLabel(activeScreen, t) {
    if (activeScreen === NAV_SCREENS.SUBJECTS) {
        return t.subjectSelectTitle ?? "Fag";
    }

    if (activeScreen === NAV_SCREENS.SELECT) {
        return t.selectIntroTitle ?? "Eksamen";
    }

    if (activeScreen === NAV_SCREENS.EXAM) {
        return t.selectIntroTitle ?? t.sidebarExams ?? "Eksamen";
    }

    if (activeScreen === NAV_SCREENS.OVERVIEW) {
        return t.selectStatistics ?? "Statistikk";
    }

    return t.sidebarSettings ?? "Meny";
}
