// test/ui/viewmodel/Shared/ProgressBar/buildProgressBarModel.test.js
import { buildProgressBarModel } from "../../../../../src/ui/viewmodel/Shared/ProgressBar/buildProgressBarModel.js";

describe("buildProgressBarModel", () => {
	it("builds passive progress points with bound labels", () => {
		const model = buildProgressBarModel({
			totalSteps: 6,
			currentStep: 4,
			ariaLabel: "Fremdrift",
			startLabel: "Start",
			formatStepLabel: formatStepLabel,
			onActivateStep: null
		});

		expect(model.ariaLabel).toBe("Fremdrift");
		expect(model.fillPercent).toBe(60);
		expect(model.points).toEqual([
			expect.objectContaining({ key: "start", left: 0, label: "Start", isActive: true, isFlag: false, className: "progress-bar-point progress-bar-point-active", onActivatePoint: null }),
			expect.objectContaining({ key: "middle", left: 40, label: "3/6", isActive: true, isFlag: false, className: "progress-bar-point progress-bar-point-active", onActivatePoint: null }),
			expect.objectContaining({ key: "late", left: 60, label: "4/6", isActive: true, isFlag: false, className: "progress-bar-point progress-bar-point-active", onActivatePoint: null }),
			expect.objectContaining({ key: "finish", left: 100, label: "6/6", isActive: false, isFlag: true, className: "progress-bar-point", onActivatePoint: null })
		]);
	});

	it("builds interactive point callbacks when activation is provided", () => {
		const activatedSteps = [];
		const model = buildProgressBarModel({
			totalSteps: 5,
			currentStep: 2,
			ariaLabel: "Fremdrift",
			startLabel: "Start",
			formatStepLabel: formatStepLabel,
			onActivateStep: function onActivateStep(stepNumber) {
				activatedSteps.push(stepNumber);
			}
		});

		model.points[2].onActivatePoint();

		expect(activatedSteps).toEqual([4]);
	});

	it("bounds invalid totals and current steps", () => {
		const model = buildProgressBarModel({
			totalSteps: 0,
			currentStep: 99,
			ariaLabel: "Fremdrift",
			startLabel: "Start",
			formatStepLabel: formatStepLabel,
			onActivateStep: null
		});

		expect(model.fillPercent).toBe(0);
		expect(model.points).toHaveLength(4);
		expect(model.points[3]).toEqual(expect.objectContaining({ key: "finish", left: 0, label: "1/1", isActive: true }));
	});
});

function formatStepLabel(stepNumber, totalSteps) {
	return `${stepNumber}/${totalSteps}`;
}
