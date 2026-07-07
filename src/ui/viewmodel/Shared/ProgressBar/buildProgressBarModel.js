// src/ui/viewmodel/Shared/ProgressBar/buildProgressBarModel.js
const ACTIVE_POINT_CLASS_NAME = "progress-bar-point progress-bar-point-active";
const INACTIVE_POINT_CLASS_NAME = "progress-bar-point";

function calculateLeftPercent(stepNumber, totalSteps) {
	if (totalSteps === 1) {
		return 0;
	}

	return ((stepNumber - 1) / (totalSteps - 1)) * 100;
}

function createPointClassName(isActive) {
	if (isActive) {
		return ACTIVE_POINT_CLASS_NAME;
	}

	return INACTIVE_POINT_CLASS_NAME;
}

function createPointCallback(onActivateStep, stepNumber) {
	if (onActivateStep === null) {
		return null;
	}

	return () => onActivateStep(stepNumber);
}

function createProgressPoint({ key, stepNumber, label, currentStep, totalSteps, isFlag, onActivateStep }) {
	const isActive = currentStep >= stepNumber;

	return {
		key,
		left: calculateLeftPercent(stepNumber, totalSteps),
		label,
		isActive,
		isFlag,
		className: createPointClassName(isActive),
		onActivatePoint: createPointCallback(onActivateStep, stepNumber)
	};
}

export function buildProgressBarModel({ totalSteps, currentStep, ariaLabel, startLabel, formatStepLabel, onActivateStep }) {
	const safeTotalSteps = Math.max(totalSteps, 1);
	const boundedCurrentStep = Math.min(Math.max(currentStep, 1), safeTotalSteps);
	const middleStep = Math.max(1, Math.round(safeTotalSteps * 0.48));
	const lateStep = Math.min(safeTotalSteps, Math.max(middleStep + 1, Math.round(safeTotalSteps * 0.72)));
	const fillPercent = calculateLeftPercent(boundedCurrentStep, safeTotalSteps);

	return {
		ariaLabel,
		fillPercent,
		points: [
			createProgressPoint({
				key: "start",
				stepNumber: 1,
				label: startLabel,
				currentStep: boundedCurrentStep,
				totalSteps: safeTotalSteps,
				isFlag: false,
				onActivateStep
			}),
			createProgressPoint({
				key: "middle",
				stepNumber: middleStep,
				label: formatStepLabel(middleStep, safeTotalSteps),
				currentStep: boundedCurrentStep,
				totalSteps: safeTotalSteps,
				isFlag: false,
				onActivateStep
			}),
			createProgressPoint({
				key: "late",
				stepNumber: lateStep,
				label: formatStepLabel(lateStep, safeTotalSteps),
				currentStep: boundedCurrentStep,
				totalSteps: safeTotalSteps,
				isFlag: false,
				onActivateStep
			}),
			createProgressPoint({
				key: "finish",
				stepNumber: safeTotalSteps,
				label: formatStepLabel(safeTotalSteps, safeTotalSteps),
				currentStep: boundedCurrentStep,
				totalSteps: safeTotalSteps,
				isFlag: true,
				onActivateStep
			})
		]
	};
}
