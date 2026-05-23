//src/ui/view/components/Instructions/ResultSummary.jsx
import { Award } from "lucide-react";

export default function ResultSummary({ score, totalPoints, percentage }) {
	return (
		<div className="exam-instructions-result-summary">
			<Award className="exam-instructions-result-icon" />

			<div>
				<div className="exam-instructions-result-title">
					Resultat: {score} av {totalPoints} poeng
				</div>

				<div className="exam-instructions-result-subtitle">
					{percentage}% riktig
				</div>
			</div>
		</div>
	);
}