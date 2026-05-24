//src/ui/view/components/Header/HeaderActions.jsx
import StatCard from "./StatCard.jsx";
import HeaderButtons from "./HeaderButtons.jsx";
import { useLanguage } from "../../../../i18n/LanguageContext.jsx";

export default function ExamHeaderActions({ viewModel }) {
	const { t } = useLanguage();

	return (
		<div className="exam-header-actions">
			<StatCard
				value={viewModel.answeredCountLabel}
				label={t.headerStatAnswered}
			/>

			<StatCard
				value={viewModel.scoreLabel}
				label={t.headerStatScore}
			/>

			<HeaderButtons viewModel={viewModel} />
		</div>
	);
}
