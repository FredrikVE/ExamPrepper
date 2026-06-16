// test/ui/viewmodel/createMobileHeaderModel.test.js
import { describe, expect, test } from "@jest/globals";
import createMobileHeaderModel from "../../../src/ui/viewmodel/Utils/createMobileHeaderModel.js";
import { NAV_SCREENS } from "../../../src/navigation/navGraph.js";

const t = {
    subjectSelectTitle: "Velg fag",
    selectIntroTitle: "Velg eksamen",
    selectStatistics: "Din statistikk",
    sidebarSettings: "Innstillinger",
    sidebarExams: "Velg eksamen"
};

describe("createMobileHeaderModel", () => {
    test("creates exam select label", () => {
        const result = createMobileHeaderModel(NAV_SCREENS.SELECT, t);

        expect(result).toEqual({
            activeLabel: "Velg eksamen"
        });
    });

    test("creates subject home label", () => {
        const result = createMobileHeaderModel(NAV_SCREENS.SUBJECTS, t);

        expect(result).toEqual({
            activeLabel: "Velg fag"
        });
    });

    test("creates statistics label", () => {
        const result = createMobileHeaderModel(NAV_SCREENS.OVERVIEW, t);

        expect(result).toEqual({
            activeLabel: "Din statistikk"
        });
    });
});
