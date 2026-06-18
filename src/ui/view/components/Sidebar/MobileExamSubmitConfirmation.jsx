// src/ui/view/components/Sidebar/MobileExamSubmitConfirmation.jsx
export default function MobileExamSubmitConfirmation({
	title,
	body,
	cancelLabel,
	confirmLabel,
	onCancel,
	onConfirm,
	cancelButtonRef
}) {
	return (
		<section
			className="mobile-exam-submit-confirmation"
			role="dialog"
			aria-modal="true"
			aria-labelledby="mobile-exam-submit-confirmation-title"
			aria-describedby="mobile-exam-submit-confirmation-body"
		>
			<h2
				id="mobile-exam-submit-confirmation-title"
				className="mobile-exam-submit-confirmation-title"
			>
				{title}
			</h2>

			<p
				id="mobile-exam-submit-confirmation-body"
				className="mobile-exam-submit-confirmation-body"
			>
				{body}
			</p>

			<div className="mobile-exam-submit-confirmation-actions">
				<button
					type="button"
					className="mobile-exam-submit-confirmation-cancel"
					onClick={onCancel}
					ref={cancelButtonRef}
				>
					{cancelLabel}
				</button>

				<button
					type="button"
					className="mobile-exam-submit-confirmation-confirm"
					onClick={onConfirm}
				>
					{confirmLabel}
				</button>
			</div>
		</section>
	);
}
