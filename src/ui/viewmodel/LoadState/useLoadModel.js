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

	/* Callbacken leses via ref slik at identiteten dens ALDRI er en
	   reload-trigger: språkbytte skal utløse reload via
	   execute-avhengighetene (bevisst), ikke via at en funksjonsreferanse
	   tilfeldigvis byttet identitet. */
	const onLoadedRef = useRef(onLoaded);
	onLoadedRef.current = onLoaded;

	/* Ressursen holder KUN status og data — aldri presentasjonstekst.
	   Feilteksten avledes ved retur, slik at et språkbytte mens brukeren
	   står i ERROR-tilstand oppdaterer meldingen uten reload. */
	const [resource, setResource] = useState({
		status: LOAD_STATUS.LOADING,
		data: emptyData
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
				data: previousResource.data
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
		error: resource.status === LOAD_STATUS.ERROR ? errorMessage : null,
		reload: runLoad
	};
}

function logLoadError(loadError) {
	if (import.meta.env?.DEV !== true) {
		return;
	}

	console.error("[useLoadModel] Load failed", loadError);
}
