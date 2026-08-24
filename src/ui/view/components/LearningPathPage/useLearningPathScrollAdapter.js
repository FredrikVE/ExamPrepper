// src/ui/view/components/LearningPathPage/useLearningPathScrollAdapter.js
import { useCallback, useLayoutEffect, useRef } from "react";
import createLearningPathScrollOptions from "./createLearningPathScrollOptions.js";

const REDUCED_MOTION_QUERY = "(prefers-reduced-motion: reduce)";

export default function useLearningPathScrollAdapter({ scrollRequest }) {
	const moduleElementsByIdRef = useRef(new Map());

	const registerModuleElement = useCallback((moduleId, element) => {
		if (element === null) {
			moduleElementsByIdRef.current.delete(moduleId);
			return;
		}

		moduleElementsByIdRef.current.set(moduleId, element);
	}, []);

	useLayoutEffect(() => {
		if (scrollRequest === null) {
			return;
		}

		const targetElement = moduleElementsByIdRef.current.get(scrollRequest.targetModuleId);

		if (targetElement === undefined) {
			// A request can outlive its module while the LearningPath resource changes.
			return;
		}

		const prefersReducedMotion = readPrefersReducedMotion();
		const scrollOptions = createLearningPathScrollOptions({
			behavior: scrollRequest.behavior,
			prefersReducedMotion
		});

		targetElement.scrollIntoView(scrollOptions);
	}, [scrollRequest]);

	return {
		registerModuleElement
	};
}

function readPrefersReducedMotion() {
	if (typeof window.matchMedia !== "function") {
		return false;
	}

	return window.matchMedia(REDUCED_MOTION_QUERY).matches === true;
}
