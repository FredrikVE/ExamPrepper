// src/ui/viewmodel/Utils/resolveFirstLoadError.js
export default function resolveFirstLoadError(loadModels, fallbackMessage) {
	for (const loadModel of loadModels) {
		if (loadModel.error) {
			return loadModel.error;
		}
	}

	return fallbackMessage;
}
