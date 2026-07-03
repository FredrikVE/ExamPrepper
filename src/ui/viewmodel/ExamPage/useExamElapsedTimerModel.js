// src/ui/viewmodel/ExamPage/useExamElapsedTimerModel.js
import { useCallback, useEffect, useMemo, useState } from "react";
import formatElapsedTime from "./formatElapsedTime.js";

export default function useExamElapsedTimerModel({ isPaused }) {
	const [elapsedSeconds, setElapsedSeconds] = useState(0);

	const resetElapsedSeconds = useCallback(() => {
		setElapsedSeconds(0);
	}, []);

	useEffect(() => {
		if (isPaused) {
			return undefined;
		}

		const intervalId = window.setInterval(() => {
			setElapsedSeconds((elapsedSecondCount) => elapsedSecondCount + 1);
		}, 1000);

		return () => window.clearInterval(intervalId);
	}, [isPaused]);

	const elapsedTimeLabel = useMemo(() => {
		return formatElapsedTime(elapsedSeconds);
	}, [elapsedSeconds]);

	return {
		elapsedSeconds,
		elapsedTimeLabel,
		resetElapsedSeconds
	};
}
