// src/ui/viewmodel/LoadState/useLoadModel.js
import { useCallback, useEffect, useRef, useState } from "react";
import { LOAD_STATUS } from "./loadStatus.js";

export default function useLoadModel({
	execute,
	emptyData,
	errorMessage,
	resourceKey,
	isEnabled,
	onLoaded
}) {
	const hasLoadedOnceRef = useRef(false);
	const activeRunIdRef = useRef(0);
	const activeResourceKeyRef = useRef(resourceKey);
	const emptyDataRef = useRef(emptyData);
	const onLoadedRef = useRef(onLoaded);

	emptyDataRef.current = emptyData;
	onLoadedRef.current = onLoaded;

	const [resource, setResource] = useState({
		status: LOAD_STATUS.LOADING,
		data: emptyData
	});

	const runLoad = useCallback(() => {
		if (!isEnabled) {
			return () => {};
		}

		const hasResourceChanged = activeResourceKeyRef.current !== resourceKey;

		if (hasResourceChanged) {
			activeResourceKeyRef.current = resourceKey;
			hasLoadedOnceRef.current = false;
		}

		activeRunIdRef.current = activeRunIdRef.current + 1;
		const runId = activeRunIdRef.current;

		const run = async () => {
			const inFlightStatus = hasLoadedOnceRef.current
				? LOAD_STATUS.READY
				: LOAD_STATUS.LOADING;

			setResource((previousResource) => ({
				status: inFlightStatus,
				data: hasResourceChanged ? emptyDataRef.current : previousResource.data
			}));

			try {
				const loadedData = await execute();

				if (activeRunIdRef.current !== runId) {
					return;
				}

				hasLoadedOnceRef.current = true;
				setResource({
					status: LOAD_STATUS.READY,
					data: loadedData
				});

				if (onLoadedRef.current !== null) {
					onLoadedRef.current({ loadedData });
				}
			}

			catch (loadError) {
				if (activeRunIdRef.current !== runId) {
					return;
				}

				logLoadError(loadError);

				setResource((previousResource) => ({
					status: LOAD_STATUS.ERROR,
					data: previousResource.data
				}));
			}
		};

		run();

		return () => {
			if (activeRunIdRef.current === runId) {
				activeRunIdRef.current = activeRunIdRef.current + 1;
			}
		};
	}, [execute, isEnabled, resourceKey]);

	useEffect(runLoad, [runLoad]);

	const hasPendingResourceChange = isEnabled && activeResourceKeyRef.current !== resourceKey;
	const visibleResource = hasPendingResourceChange
		? {
			status: LOAD_STATUS.LOADING,
			data: emptyData
		}
		: resource;

	return {
		status: visibleResource.status,
		data: visibleResource.data,
		error: visibleResource.status === LOAD_STATUS.ERROR ? errorMessage : null,
		reload: runLoad
	};
}

function logLoadError(loadError) {
	if (import.meta.env?.DEV !== true) {
		return;
	}

	console.error("[useLoadModel] Load failed", loadError);
}
