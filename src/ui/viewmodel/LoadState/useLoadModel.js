// src/ui/viewmodel/LoadState/useLoadModel.js
import { useCallback, useEffect, useRef, useState } from "react";
import { LOAD_STATUS } from "../../loadStatus/loadStatus.js";

export default function useLoadModel({
	execute,                 // stabil referanse (useCallback hos kaller) — ENESTE reload-trigger
	emptyData,
	errorMessage,            // produkttekst som vises ved feil; tekniske feil logges kun i dev
	onLoaded
}) {
	const hasLoadedOnceRef = useRef(false);
	const activeRunIdRef = useRef(0);

	/* Meldingen og callbacken leses via refs slik at identiteten deres
	   ALDRI er en reload-trigger: språkbytte skal utløse reload via
	   execute-avhengighetene (bevisst), ikke via at en i18n-streng
	   tilfeldigvis byttet identitet. */
	const errorMessageRef = useRef(errorMessage);
	const onLoadedRef = useRef(onLoaded);
	errorMessageRef.current = errorMessage;
	onLoadedRef.current = onLoaded;

	const [resource, setResource] = useState({
		status: LOAD_STATUS.LOADING,
		data: emptyData,
		error: null
	});

	const runLoad = useCallback(() => {
		/* Løpenummer: bare siste igangsatte last får skrive resultat.
		   Beskytter mot interleaving når reload() kalles mens en last
		   allerede er underveis (f.eks. to raske retry-klikk). */
		activeRunIdRef.current = activeRunIdRef.current + 1;
		const runId = activeRunIdRef.current;

		const run = async () => {
			/* Oppfrisking etter første vellykkede last er intern oppførsel,
			   ikke offentlig status: ressursen holder READY med stående data,
			   så innholdet blir værende uten spinner. Feiler oppfriskingen,
			   eskalerer den til ERROR som vanlig. */
			const inFlightStatus = hasLoadedOnceRef.current
				? LOAD_STATUS.READY
				: LOAD_STATUS.LOADING;

			setResource((previousResource) => ({
				status: inFlightStatus,
				data: previousResource.data,
				error: null
			}));

			try {
				const loadedData = await execute();

				if (activeRunIdRef.current !== runId) {
					return;
				}

				hasLoadedOnceRef.current = true;
				setResource({
					status: LOAD_STATUS.READY,
					data: loadedData,
					error: null
				});
				onLoadedRef.current({ loadedData });
			}

			catch (loadError) {
				if (activeRunIdRef.current !== runId) {
					return;
				}

				logLoadError(loadError);

				setResource((previousResource) => ({
					status: LOAD_STATUS.ERROR,
					data: previousResource.data,
					error: errorMessageRef.current
				}));
			}
		};

		run();

		return () => {
			/* Ugyldiggjør dette løpet ved unmount/re-run uten å blokkere
			   et nyere løp som allerede har tatt over løpenummeret. */
			if (activeRunIdRef.current === runId) {
				activeRunIdRef.current = activeRunIdRef.current + 1;
			}
		};
	}, [execute]);

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
