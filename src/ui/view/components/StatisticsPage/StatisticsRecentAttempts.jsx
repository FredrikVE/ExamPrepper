// src/ui/view/components/StatisticsPage/StatisticsRecentAttempts.jsx
import { BookOpen, ClipboardList, FileText } from "lucide-react";

export default function StatisticsRecentAttempts(props) {
	if (props.attempts.length === 0) {
		return (
			<section className="statistics-panel statistics-recent-panel" aria-labelledby="statistics-recent-attempts-title">
				<StatisticsRecentAttemptsHeader
					title={props.title}
					subtitle={props.subtitle}
				/>
				<p className="statistics-empty-text">{props.emptyMessage}</p>
			</section>
		);
	}

	return (
		<section className="statistics-panel statistics-recent-panel" aria-labelledby="statistics-recent-attempts-title">
			<StatisticsRecentAttemptsHeader
				title={props.title}
				subtitle={props.subtitle}
			/>

			<ul className="statistics-attempt-list">
				{props.attempts.map((attempt) => (
					<li key={attempt.id} className={`statistics-attempt-item statistics-attempt-item--${attempt.tone}`}>
						<span className="statistics-attempt-icon" aria-hidden="true">
							<RecentAttemptIcon iconKey={attempt.iconKey} />
						</span>

						<div className="statistics-attempt-copy">
							<span className="statistics-attempt-meta">{attempt.submittedAtLabel}</span>
							<strong>{attempt.examTitle}</strong>
							<span>{attempt.pointsLabel}</span>
						</div>

						<div className="statistics-attempt-score">
							<strong>{attempt.percentageLabel}</strong>
							<span>{attempt.scoreLabel}</span>
						</div>
					</li>
				))}
			</ul>
		</section>
	);
}

function RecentAttemptIcon(props) {
	if (props.iconKey === "clipboardList") {
		return <ClipboardList size={24} />;
	}

	if (props.iconKey === "fileText") {
		return <FileText size={24} />;
	}

	return <BookOpen size={24} />;
}

function StatisticsRecentAttemptsHeader(props) {
	return (
		<div className="statistics-recent-header">
			<span className="statistics-recent-clock" aria-hidden="true" />
			<h2 id="statistics-recent-attempts-title">{props.title}</h2>
			<span>{props.subtitle}</span>
		</div>
	);
}
