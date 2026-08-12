// test/ui/viewmodel/GlossaryPage/useGlossaryDetailModel.test.js
import { beforeEach, describe, expect, jest, test } from "@jest/globals";
import { PRESENTATION_MODE } from "../../../../src/ui/presentation/presentationMode.js";

const stateSetters = [jest.fn(), jest.fn(), jest.fn()];
const refs = [];
const effects = [];
let stateIndex = 0;
let refIndex = 0;
let stateValues = [null, [], null];
const useState = jest.fn((initialValue) => {
	const currentIndex = stateIndex;
	stateIndex += 1;
	const value = stateValues[currentIndex] === undefined ? initialValue : stateValues[currentIndex];
	return [value, stateSetters[currentIndex]];
});
const useEffect = jest.fn((effect) => {
	effects.push(effect);
});
const useCallback = jest.fn((callback) => callback);
const useRef = jest.fn((initialValue) => {
	const currentIndex = refIndex;
	refIndex += 1;
	if (refs[currentIndex] === undefined) {
		refs[currentIndex] = { current: initialValue };
	}
	return refs[currentIndex];
});

jest.unstable_mockModule("react", () => ({
	useCallback,
	useEffect,
	useRef,
	useState
}));

const { default: useGlossaryDetailModel, resolveMobileGlossaryDetailEntryKey, useGlossaryDetailPresentationModeSync } = await import(
	"../../../../src/ui/viewmodel/GlossaryPage/useGlossaryDetailModel.js"
);

function renderDetailModel({ presentationMode, values }) {
	stateIndex = 0;
	refIndex = 0;
	stateValues = values;
	return useGlossaryDetailModel({ presentationMode, resetKey: "in2120:none" });
}

beforeEach(() => {
	stateIndex = 0;
	refIndex = 0;
	stateValues = [null, [], null];
	refs.length = 0;
	effects.length = 0;
	useState.mockClear();
	useEffect.mockClear();
	useCallback.mockClear();
	useRef.mockClear();
	for (const setter of stateSetters) {
		setter.mockClear();
	}
});

describe("useGlossaryDetailModel", () => {
	test("owns detail state and clears retained refs on reset", () => {
		const model = renderDetailModel({ presentationMode: PRESENTATION_MODE.DESKTOP, values: ["packet", ["transport-layer"], { key: "snapshot" }] });
		model.resolveGlossaryRowRef("packet")({});
		model.resolveGlossaryDisclosureRef("packet")({});
		model.resolveGlossaryDetailTriggerRef("packet")({});

		effects[0]();

		expect(stateSetters[0]).toHaveBeenCalledWith(null);
		expect(stateSetters[1]).toHaveBeenCalledWith([]);
		expect(stateSetters[2]).toHaveBeenCalledWith(null);
		expect(model.resolveGlossaryRowRef("packet")).not.toBeNull();
	});

	test("reuses row, disclosure and detail-trigger callback refs across rerenders", () => {
		const first = renderDetailModel({ presentationMode: PRESENTATION_MODE.DESKTOP, values: [null, [], null] });
		const firstRowRef = first.resolveGlossaryRowRef("packet");
		const firstDisclosureRef = first.resolveGlossaryDisclosureRef("packet");
		const firstTriggerRef = first.resolveGlossaryDetailTriggerRef("packet");

		const second = renderDetailModel({ presentationMode: PRESENTATION_MODE.DESKTOP, values: [null, [], null] });

		expect(second.resolveGlossaryRowRef("packet")).toBe(firstRowRef);
		expect(second.resolveGlossaryDisclosureRef("packet")).toBe(firstDisclosureRef);
		expect(second.resolveGlossaryDetailTriggerRef("packet")).toBe(firstTriggerRef);
	});

	test("keeps mobile disclosure focus and row scrolling inside the detail submodel", () => {
		const model = renderDetailModel({ presentationMode: PRESENTATION_MODE.MOBILE, values: ["packet", [], null] });
		const rowElement = { scrollIntoView: jest.fn() };
		const disclosureElement = { focus: jest.fn() };
		model.resolveGlossaryRowRef("packet")(rowElement);
		model.resolveGlossaryDisclosureRef("packet")(disclosureElement);

		effects[1]();

		expect(disclosureElement.focus).toHaveBeenCalledWith({ preventScroll: true });
		expect(rowElement.scrollIntoView).toHaveBeenCalledWith({ behavior: "smooth", block: "nearest" });
	});

	test("moves desktop focus to the requested detail title", () => {
		const model = renderDetailModel({ presentationMode: PRESENTATION_MODE.DESKTOP, values: ["packet", [], null] });
		const titleElement = { focus: jest.fn() };
		model.glossaryDetailTitleFocusRequestKeyRef.current = "packet";
		model.glossaryDetailTitleElementRef.current = titleElement;

		effects[2]();

		expect(titleElement.focus).toHaveBeenCalledWith({ preventScroll: true });
		expect(model.glossaryDetailTitleFocusRequestKeyRef.current).toBeNull();
	});

	test("resolves the mobile fallback target from active, origin or no visible entry", () => {
		expect(resolveMobileGlossaryDetailEntryKey({
			activeGlossaryEntryKey: "packet",
			originGlossaryEntryKey: "transport-layer",
			visibleGlossaryEntryKeys: ["packet", "transport-layer"]
		})).toBe("packet");
		expect(resolveMobileGlossaryDetailEntryKey({
			activeGlossaryEntryKey: "public-key",
			originGlossaryEntryKey: "packet",
			visibleGlossaryEntryKeys: ["packet", "transport-layer"]
		})).toBe("packet");
		expect(resolveMobileGlossaryDetailEntryKey({
			activeGlossaryEntryKey: "public-key",
			originGlossaryEntryKey: "asymmetric-key",
			visibleGlossaryEntryKeys: ["packet", "transport-layer"]
		})).toBeNull();
	});

	test("reconciles desktop detail state when presentation mode changes", () => {
		const originRef = { current: "packet" };
		const titleFocusRequestRef = { current: "public-key" };
		const previousModeRef = { current: PRESENTATION_MODE.DESKTOP };
		const setExpanded = jest.fn();
		const setTrail = jest.fn();
		const effectCountBeforeSync = effects.length;

		useGlossaryDetailPresentationModeSync({
			expandedGlossaryEntryKey: "public-key",
			glossaryDetailOriginEntryKeyRef: originRef,
			glossaryDetailTitleFocusRequestKeyRef: titleFocusRequestRef,
			previousPresentationModeRef: previousModeRef,
			presentationMode: PRESENTATION_MODE.MOBILE,
			setExpandedGlossaryEntryKey: setExpanded,
			setGlossaryDetailTrailKeys: setTrail,
			visibleGlossaryEntryKeys: ["packet", "transport-layer"]
		});
		effects[effectCountBeforeSync]();

		expect(setTrail).toHaveBeenCalledWith([]);
		expect(setExpanded).toHaveBeenCalledWith("packet");
		expect(originRef.current).toBeNull();
		expect(titleFocusRequestRef.current).toBeNull();
	});
});
