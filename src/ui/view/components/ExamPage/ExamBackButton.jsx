// src/ui/view/components/ExamPage/ExamBackButton.jsx
import { ChevronLeft } from "lucide-react";
import HeaderButton from "../Header/HeaderButton.jsx";

export default function ExamBackButton(props) {
	if (!props.showBackButton) {
		return null;
	}

	return (
		<div className="exam-desktop-back-button">
			<HeaderButton
				className="exam-desktop-back-button__control"
				onClick={props.onBack}
				ariaLabel={props.backLabel}
			>
				<ChevronLeft aria-hidden="true" focusable="false" />
			</HeaderButton>
		</div>
	);
}
