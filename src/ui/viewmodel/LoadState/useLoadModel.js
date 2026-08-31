// src/ui/viewmodel/LoadState/useLoadModel.js
import { useCallback, useEffect, useRef, useState } from "react";
import { LOAD_STATUS } from "./loadStatus.js";

export default function useLoadModel({ execute, emptyData, errorMessage, resourceKey, isEnabled, onLoaded }) {
	const activeRunIdRef = useRef(0);
	const emptyDataRef = useRef(emptyData);
	const onLoadedRef = useRef(onLoaded);

	emptyDataRef.current = emptyData;
	onLoadedRef.current = onLoaded;

	const [resource, setResource] = useState({
		resourceKey,
		status: LOAD_STATUS.LOADING,
		data: emptyData,
		hasLoadedOnce: false
	});

	const runLoad = useCallback(() => {
		if (!isEnabled) {
			return () => {};
		}

		activeRunIdRef.current = activeRunIdRef.current + 1;
		const runId = activeRunIdRef.current;

		const run = async () => {
			setResource((previousResource) => {
				if (previousResource.resourceKey !== resourceKey) {
					return {
						resourceKey,
						status: LOAD_STATUS.LOADING,
						data: emptyDataRef.current,
						hasLoadedOnce: false
					};
				}

				let status = LOAD_STATUS.LOADING;

				if (previousResource.hasLoadedOnce) {
					status = LOAD_STATUS.READY;
				}

				return {
					...previousResource,
					status
				};
			});

			try {
				const loadedData = await execute();

				if (activeRunIdRef.current !== runId) {
					return;
				}

				setResource({
					resourceKey,
					status: LOAD_STATUS.READY,
					data: loadedData,
					hasLoadedOnce: true
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
					...previousResource,
					status: LOAD_STATUS.ERROR
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

	let visibleStatus = resource.status;
	let visibleData = resource.data;

	// Data er bare gyldig for resourceKey-en de ble lastet for.
	// isEnabled bestemmer om vi starter en load, ikke om gammel data
	// kan presenteres som den nye ressursen.
	if (resource.resourceKey !== resourceKey) {
		visibleStatus = LOAD_STATUS.LOADING;
		visibleData = emptyData;
	}

	return {
		status: visibleStatus,
		data: visibleData,
		error: visibleStatus === LOAD_STATUS.ERROR ? errorMessage : null,
		reload: runLoad
	};
}

function logLoadError(loadError) {
	if (import.meta.env?.DEV !== true) {
		return;
	}

	console.error("[useLoadModel] Load failed", loadError);
}
