// src/ui/view/components/Sidebar/useSubmitConfirmFocus.js
import { useEffect, useRef } from "react";

export default function useSubmitConfirmFocus(isSubmitConfirmOpen) {
	const submitActionButtonRef = useRef(null);
	const submitConfirmCancelButtonRef = useRef(null);
	const hasOpenedSubmitConfirmRef = useRef(false);

	useEffect(() => {
		if (isSubmitConfirmOpen) {
			hasOpenedSubmitConfirmRef.current = true;
			window.requestAnimationFrame(() => {
				submitConfirmCancelButtonRef.current?.focus();
			});
			return;
		}

		if (!hasOpenedSubmitConfirmRef.current) {
			return;
		}

		hasOpenedSubmitConfirmRef.current = false;
		window.requestAnimationFrame(() => {
			submitActionButtonRef.current?.focus();
		});
	}, [isSubmitConfirmOpen]);

	return {
		submitActionButtonRef,
		submitConfirmCancelButtonRef
	};
}
