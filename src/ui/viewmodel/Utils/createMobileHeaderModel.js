// src/ui/viewmodel/Utils/createMobileHeaderModel.js
import { NAV_SCREENS } from "../../../navigation/navGraph.js";

export default function createMobileHeaderModel(activeScreen, selectedSubject, t) {
    const subjectCode = selectedSubject?.code ?? null;
    const subjectName = selectedSubject?.name ?? null;

    return {
        title: createMobileHeaderTitle(activeScreen, subjectCode, t),
        subtitle: createMobileHeaderSubtitle(activeScreen, subjectName, t),
        activeLabel: createMobileHeaderActiveLabel(activeScreen, t)
    };
}

function createMobileHeaderTitle(activeScreen, subjectCode, t) {
    if (activeScreen === NAV_SCREENS.OVERVIEW && !subjectCode) {
        return t.selectStatistics ?? "Statistikk";
    }

    return subjectCode ?? "ExamPrepper";
}

function createMobileHeaderSubtitle(activeScreen, subjectName, t) {
    if (subjectName) {
        return subjectName;
    }

    if (activeScreen === NAV_SCREENS.SUBJECTS) {
        return t.subjectSelectTitle ?? "Velg fag";
    }

    if (activeScreen === NAV_SCREENS.OVERVIEW) {
        return t.sidebarOverview ?? t.selectStatistics ?? "Oversikt";
    }

    return t.selectIntroTitle ?? "Velg eksamen";
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
