// src/ui/viewmodel/AppNavigation/useSyncSelectedExamWithLanguage.js
import { useEffect, useRef } from "react";
import { NAV_SCREENS } from "../../../navigation/navGraph.js";
import resolveTranslatedExamId from "../Utils/resolveTranslatedExamId.js";

export default function useSyncSelectedExamWithLanguage({
	language,
	activeScreen,
	selectedExamId,
	selectedSubjectId,
	getExamByIdUseCase,
	getExamByBaseIdAndLangUseCase,
	onExamResolved,
	onExamUnavailable
}) {
	const prevLanguageRef = useRef(language);

	useEffect(() => {
		const previousLanguage = prevLanguageRef.current;

		if (previousLanguage === language) {
			return undefined;
		}

		prevLanguageRef.current = language;

		if (activeScreen !== NAV_SCREENS.EXAM || !selectedExamId) {
			return undefined;
		}

		let cancelled = false;

		async function syncSelectedExam() {
			try {
				const resolved = await resolveTranslatedExamId(
					selectedExamId,
					language,
					getExamByIdUseCase,
					getExamByBaseIdAndLangUseCase
				);

				if (cancelled) {
					return;
				}

				if (resolved) {
					onExamResolved(resolved.examId, resolved.subjectId ?? selectedSubjectId);
					return;
				}

				onExamUnavailable();
			} catch {
				if (!cancelled) {
					onExamUnavailable();
				}
			}
		}

		syncSelectedExam();

		return () => {
			cancelled = true;
		};
	}, [
		language,
		activeScreen,
		selectedExamId,
		selectedSubjectId,
		getExamByIdUseCase,
		getExamByBaseIdAndLangUseCase,
		onExamResolved,
		onExamUnavailable
	]);
}
