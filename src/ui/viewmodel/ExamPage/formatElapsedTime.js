// src/ui/viewmodel/ExamPage/formatElapsedTime.js
export default function formatElapsedTime(seconds) {
	const safeSeconds = Math.max(seconds, 0);
	const minutes = Math.floor(safeSeconds / 60);
	const remainingSeconds = safeSeconds % 60;

	return `${String(minutes).padStart(2, "0")}:${String(remainingSeconds).padStart(2, "0")}`;
}
