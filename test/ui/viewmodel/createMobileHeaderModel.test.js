// test/ui/viewmodel/createMobileHeaderModel.test.js
import { describe, expect, test } from "@jest/globals";
import createMobileHeaderModel from "../../../src/ui/viewmodel/Utils/createMobileHeaderModel.js";
import { NAV_SCREENS } from "../../../src/navigation/navGraph.js";

const t = {
    subjectSelectTitle: "Velg fag",
    selectIntroTitle: "Velg eksamen",
    selectStatistics: "Din statistikk",
    sidebarOverview: "Oversikt",
    sidebarSettings: "Innstillinger",
    sidebarExams: "Velg eksamen"
};

describe("createMobileHeaderModel", () => {
    test("uses selected subject as header title and subtitle", () => {
        const result = createMobileHeaderModel(
            NAV_SCREENS.SELECT,
            { code: "IN5431", name: "IT Governance" },
            t
        );

        expect(result).toEqual({
            title: "IN5431",
            subtitle: "IT Governance",
            activeLabel: "Velg eksamen"
        });
    });

    test("creates subject home fallback labels", () => {
        const result = createMobileHeaderModel(NAV_SCREENS.SUBJECTS, null, t);

        expect(result).toEqual({
            title: "ExamPrepper",
            subtitle: "Velg fag",
            activeLabel: "Velg fag"
        });
    });

    test("creates statistics fallback labels without selected subject", () => {
        const result = createMobileHeaderModel(NAV_SCREENS.OVERVIEW, null, t);

        expect(result).toEqual({
            title: "Din statistikk",
            subtitle: "Oversikt",
            activeLabel: "Din statistikk"
        });
    });
});
