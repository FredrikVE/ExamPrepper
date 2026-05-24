//src/ui/view/components/Footer/Footer.jsx
import { ChevronLeft, ChevronRight } from "lucide-react";
import FooterNavigationButton from "./FooterNavigationButton.jsx";
import { useLanguage } from "../../../../i18n/LanguageContext.jsx";

export default function ExamFooter({ viewModel }) {
	const { t } = useLanguage();

	return (
		<footer className="exam-footer">
			<div className="exam-footer-container">
				<FooterNavigationButton
					onClick={viewModel.previousQuestion}
					disabled={!viewModel.canGoPrevious}
					variant="previous"
					icon={<ChevronLeft className="exam-footer-icon" />}
				>
					{t.footerPrevious}
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
					{t.footerNext}
				</FooterNavigationButton>
			</div>
		</footer>
	);
}