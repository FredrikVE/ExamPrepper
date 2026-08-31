// src/ui/viewmodel/Shared/createConceptPracticeEventId.js
export default function createConceptPracticeEventId() {
	if (typeof globalThis.crypto?.randomUUID !== "function") {
		throw new Error("crypto.randomUUID is required to record concept practice");
	}

	return globalThis.crypto.randomUUID();
}
