// src/ui/viewmodel/AppNavigation/useSyncSelectedExamWithLanguage.js
import { useEffect, useRef } from "react";
import { NAV_SCREENS } from "../../../navigation/navigation.js";
import resolveTranslatedExamId from "../Utils/resolveTranslatedExamId.js";

export default function useSyncSelectedExamWithLanguage({ language, activeScreen, selectedExamId, selectedSubjectId, getExamByIdUseCase, getExamByBaseIdAndLangUseCase, onExamResolved, onExamUnavailable, onExamSyncFailed }) {
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

				if (resolved === null) {
					onExamUnavailable();
					return;
				}

				onExamResolved(resolved.examId, resolved.subjectId ?? selectedSubjectId);
			} catch (error) {
				if (cancelled) {
					return;
				}

				if (import.meta.env?.DEV === true) {
					console.error("[useSyncSelectedExamWithLanguage] Sync failed", error);
				}

				onExamSyncFailed();
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
		onExamUnavailable,
		onExamSyncFailed
	]);
}
