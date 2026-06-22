// src/ui/view/components/ExamPage/SubmitConfirmation/ExamSubmitConfirmation.jsx
import { useEffect, useRef } from "react";

export default function ExamSubmitConfirmation({
	title,
	body,
	cancelLabel,
	confirmLabel,
	onCancel,
	onConfirm
}) {
	const cancelButtonRef = useRef(null);

	useEffect(() => {
		const handleEscape = (event) => {
			if (event.key === "Escape") {
				onCancel?.();
			}
		};

		window.addEventListener("keydown", handleEscape);
		window.requestAnimationFrame(() => {
			cancelButtonRef.current?.focus();
		});

		return () => {
			window.removeEventListener("keydown", handleEscape);
		};
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
