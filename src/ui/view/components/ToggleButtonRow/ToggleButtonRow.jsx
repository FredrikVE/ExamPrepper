// src/ui/view/components/ToggleButtonRow/ToggleButtonRow.jsx
import { PRESENTATION_MODE } from "../../../presentation/presentationMode.js";
import usePresentationMode from "../../../presentation/usePresentationMode.js";
import ToggleButtonRowDesktop from "./ToggleButtonRowDesktop.jsx";
import ToggleButtonRowMobile from "./ToggleButtonRowMobile.jsx";

export default function ToggleButtonRow(props) {
	const presentationMode = usePresentationMode();

	if (presentationMode === PRESENTATION_MODE.MOBILE) {
		return (
			<ToggleButtonRowMobile
				items={props.mobileItems}
				activeEntryId={props.mobileActiveEntryId ?? props.activeEntryId}
				onSelectEntry={props.onSelectEntry}
				backLabel={props.mobileBackLabel}
				ariaLabel={props.ariaLabel}
			/>
		);
	}

	return (
		<ToggleButtonRowDesktop
			entries={props.entries}
			activeEntryId={props.activeEntryId}
			onSelectEntry={props.onSelectEntry}
			ariaLabel={props.ariaLabel}
		/>
	);
}
