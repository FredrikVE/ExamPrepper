// src/ui/view/components/StatisticsPage/Overview/StatisticsChapterCard.jsx
import SubjectIcon from "../../SubjectIcon.jsx";
import { getContentIcon } from "../../Shared/contentIconRegistry.js";

export default function StatisticsChapterCard({ model, onSelect }) {
	let icon = null;

	if (model.isSubject) {
		icon = <SubjectIcon icon={model.subjectIcon} className="statistics-chapter-card-subject-icon" />;
	}
	else {
		const ChapterIcon = getContentIcon(model.iconKey);
		icon = <ChapterIcon />;
	}

	return (
		<button type="button" className="statistics-chapter-card" data-performance-tone={model.performanceTone} aria-pressed={model.isSelected} onClick={() => onSelect(model.scope)}>
			<span className="statistics-chapter-card-icon" aria-hidden="true">
				{icon}
			</span>
			<span className="statistics-chapter-card-copy">
				<span className="statistics-chapter-card-title">{model.label}</span>
				<strong className="statistics-chapter-card-score">{model.masteryPercentageLabel}</strong>
				<span className="statistics-chapter-card-label">{model.masteryLabel}</span>
			</span>
		</button>
	);
}
