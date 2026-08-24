// test/ui/viewmodel/LearningPath/createLearningPathActionKey.test.js
import { describe, expect, test } from "@jest/globals";
import createLearningPathActionKey from "../../../../src/ui/viewmodel/LearningPath/createLearningPathActionKey.js";

describe("createLearningPathActionKey", () => {
	test("namespaces every LearningPath start target", () => {
		expect(createLearningPathActionKey({ moduleId: "module-1", target: { kind: "module" } })).toBe("module:module-1:start");
		expect(createLearningPathActionKey({ moduleId: "module-1", target: { kind: "module-replay" } })).toBe("module:module-1:replay");
		expect(createLearningPathActionKey({ moduleId: "module-1", target: { kind: "section", sectionId: "section-2" } })).toBe("module:module-1:section:section-2");
		expect(createLearningPathActionKey({ moduleId: "module-1", target: { kind: "session", planKey: "plan-3" } })).toBe("module:module-1:session:plan-3");
	});

	test("fails fast for an unknown start target", () => {
		expect(() => createLearningPathActionKey({ moduleId: "module-1", target: { kind: "unknown" } })).toThrow("Unknown LearningPath start target 'unknown'");
	});
});
