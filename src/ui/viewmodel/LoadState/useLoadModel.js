// src/ui/viewmodel/LoadState/useLoadModel.js
import { useCallback, useEffect, useRef, useState } from "react";
import { LOAD_STATUS } from "../../loadStatus/loadStatus.js";

export default function useLoadModel({
	execute,
	emptyData,
	errorFallbackMessage,
	onLoaded
}) {
	const hasLoadedOnceRef = useRef(false);
	const [resource, setResource] = useState({
		status: LOAD_STATUS.LOADING,
		data: emptyData,
		error: null
	});

	const runLoad = useCallback(() => {
		let cancelled = false;

		const run = async () => {
			const inFlightStatus = hasLoadedOnceRef.current
				? LOAD_STATUS.RELOADING
				: LOAD_STATUS.LOADING;

			setResource((previousResource) => ({
				status: inFlightStatus,
				data: previousResource.data,
				error: null
			}));

			try {
				const loadedData = await execute();

				if (cancelled) {
					return;
				}

				hasLoadedOnceRef.current = true;
				setResource({
					status: LOAD_STATUS.READY,
					data: loadedData,
					error: null
				});
				onLoaded({ loadedData });
			}

			catch (loadError) {
				if (cancelled) {
					return;
				}

				logLoadError(loadError);

				setResource((previousResource) => ({
					status: LOAD_STATUS.ERROR,
					data: previousResource.data,
					error: errorFallbackMessage
				}));
			}
		};

		run();

		return () => {
			cancelled = true;
		};
	}, [execute, errorFallbackMessage, onLoaded]);

	useEffect(runLoad, [runLoad]);

	return {
		status: resource.status,
		data: resource.data,
		error: resource.error,
		reload: runLoad
	};
}

function logLoadError(loadError) {
	if (import.meta.env?.DEV !== true) {
		return;
	}

	console.error("[useLoadModel] Load failed", loadError);
}
