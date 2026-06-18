// src/ui/view/components/Sidebar/MobileExamSubmitAction.jsx
import { Check } from "lucide-react";

export default function MobileExamSubmitAction({ label, onOpenSubmitConfirm, buttonRef }) {
	return (
		<button
			type="button"
			className="mobile-exam-submit-action"
			onClick={onOpenSubmitConfirm}
			ref={buttonRef}
		>
			<Check className="mobile-exam-submit-action-icon" aria-hidden="true" />
			<span>{label}</span>
		</button>
	);
}
