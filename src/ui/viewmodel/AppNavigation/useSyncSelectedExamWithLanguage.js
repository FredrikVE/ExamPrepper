// src/ui/viewmodel/AppNavigation/useSyncSelectedExamWithLanguage.js
import { useEffect, useRef } from "react";
import { NAV_SCREENS } from "../../../navigation/navGraph.js";
import resolveTranslatedExamId from "../Utils/resolveTranslatedExamId.js";

function logLanguageSync(eventName, payload = {}) {
	console.debug(`[language-sync] ${eventName}`, payload);
}

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

		logLanguageSync("effect", {
			previousLanguage,
			language,
			activeScreen,
			selectedExamId,
			selectedSubjectId
		});

		if (previousLanguage === language) {
			logLanguageSync("skip:same-language", { language });
			return undefined;
		}

		prevLanguageRef.current = language;

		if (activeScreen !== NAV_SCREENS.EXAM || !selectedExamId) {
			logLanguageSync("skip:not-exam-screen", {
				language,
				activeScreen,
				selectedExamId
			});

			return undefined;
		}

		let cancelled = false;

		async function syncSelectedExam() {
			logLanguageSync("resolve:start", {
				fromLanguage: previousLanguage,
				toLanguage: language,
				selectedExamId,
				selectedSubjectId
			});

			try {
				const resolved = await resolveTranslatedExamId(
					selectedExamId,
					language,
					getExamByIdUseCase,
					getExamByBaseIdAndLangUseCase
				);

				logLanguageSync("resolve:done", {
					cancelled,
					selectedExamId,
					selectedSubjectId,
					resolved
				});

				if (cancelled) {
					logLanguageSync("resolve:ignored-cancelled", { selectedExamId, language });
					return;
				}

				if (resolved) {
					onExamResolved(resolved.examId, resolved.subjectId ?? selectedSubjectId);
					return;
				}

				logLanguageSync("resolve:unavailable", { selectedExamId, language });
				onExamUnavailable();
			} catch (error) {
				logLanguageSync("resolve:error", {
					cancelled,
					selectedExamId,
					language,
					message: error instanceof Error ? error.message : String(error)
				});

				if (!cancelled) {
					onExamUnavailable();
				}
			}
		}

		syncSelectedExam();

		return () => {
			cancelled = true;
			logLanguageSync("cleanup", { selectedExamId, language });
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
