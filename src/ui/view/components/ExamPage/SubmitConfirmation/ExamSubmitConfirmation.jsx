// src/ui/view/components/ExamPage/SubmitConfirmation/ExamSubmitConfirmation.jsx
import { useEffect, useRef } from "react";
import useKeyboardShortcuts from "../../../KeyboardNavigation/useKeyboardShortcuts.js";

export default function ExamSubmitConfirmation({
	title,
	body,
	cancelLabel,
	confirmLabel,
	onCancel,
	onConfirm
}) {
	const cancelButtonRef = useRef(null);

	function cancelOnEscape(event) {
		if (event.key === "Escape") {
			onCancel();
		}
	}

	useKeyboardShortcuts({
		isEnabled: true,
		onKeyDown: cancelOnEscape
	});

	useEffect(() => {
		window.requestAnimationFrame(() => {
			cancelButtonRef.current?.focus();
		});
	}, [onCancel]);

	return (
		<div className="exam-submit-confirmation-overlay">
			<button
				type="button"
				className="exam-submit-confirmation-backdrop"
				onClick={onCancel}
				aria-label={cancelLabel}
			/>

			<section
				className="exam-submit-confirmation"
				role="dialog"
				aria-modal="true"
				aria-labelledby="exam-submit-confirmation-title"
				aria-describedby="exam-submit-confirmation-body"
			>
				<h2
					id="exam-submit-confirmation-title"
					className="exam-submit-confirmation-title"
				>
					{title}
				</h2>

				<p
					id="exam-submit-confirmation-body"
					className="exam-submit-confirmation-body"
				>
					{body}
				</p>

				<div className="exam-submit-confirmation-actions">
					<button
						type="button"
						className="exam-submit-confirmation-cancel"
						onClick={onCancel}
						ref={cancelButtonRef}
					>
						{cancelLabel}
					</button>

					<button
						type="button"
						className="exam-submit-confirmation-confirm"
						onClick={onConfirm}
					>
						{confirmLabel}
					</button>
				</div>
			</section>
		</div>
	);
}
