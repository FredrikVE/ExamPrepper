//src/ui/view/components/LearningPathPage/useLearningPathScrollAdapter.js
import { useCallback, useLayoutEffect, useRef } from "react";

export function resolveScrollContainer(targetElement) {
	const container = targetElement?.closest(".workspace-scaffold-body") ?? null;

	if (container === null) {
		throw new Error("LearningPath scroll target is not inside WorkspaceScaffold body");
	}

	return container;
}

export default function useLearningPathScrollAdapter({ scrollRequest }) {
	const moduleElementsRef = useRef(new Map());

	const registerModuleElement = useCallback((moduleId, element) => {
		if (element === null) {
			moduleElementsRef.current.delete(moduleId);
			return;
		}

		moduleElementsRef.current.set(moduleId, element);
	}, []);

	useLayoutEffect(() => {
		if (scrollRequest === null) {
			return;
		}

		const target = moduleElementsRef.current.get(scrollRequest.targetModuleId);
		if (!target) {
			return;
		}

		resolveScrollContainer(target);
		const prefersReducedMotion = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches === true;
		target.scrollIntoView({ block: "nearest", inline: "nearest", behavior: prefersReducedMotion ? "auto" : scrollRequest.behavior });
	}, [scrollRequest]);

	return { registerModuleElement };
}
