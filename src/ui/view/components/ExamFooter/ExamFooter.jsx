//src/ui/view/components/ExamFooter/ExamFooter.jsx
import { ChevronLeft, ChevronRight } from "lucide-react";
import FooterNavigationButton from "./FooterNavigationButton.jsx";

export default function ExamFooter({ viewModel }) {
	return (
		<footer className="exam-footer">
			<div className="exam-footer-container">
				<FooterNavigationButton
					onClick={viewModel.previousQuestion}
					disabled={!viewModel.canGoPrevious}
					variant="previous"
					icon={<ChevronLeft className="exam-footer-icon" />}
				>
					Previous
				</FooterNavigationButton>

				<div className="exam-footer-counter">
					{viewModel.questionProgressLabel}
				</div>

				<FooterNavigationButton
					onClick={viewModel.nextQuestion}
					disabled={!viewModel.canGoNext}
					variant="next"
					icon={<ChevronRight className="exam-footer-icon" />}
				>
					Next
				</FooterNavigationButton>
			</div>
		</footer>
	);
}