// src/ui/view/components/StatisticsPage/StatisticsWeeklyActivity.jsx
export default function StatisticsWeeklyActivity(props) {
	return (
		<section className="statistics-panel statistics-weekly-activity" aria-labelledby="statistics-weekly-activity-title">
			<div className="statistics-weekly-activity-header">
				<h2 id="statistics-weekly-activity-title">{props.activity.title}</h2>
				<span className={`statistics-weekly-activity-change statistics-weekly-activity-change--${props.activity.changeTone}`}>
					{props.activity.changeLabel}
				</span>
			</div>

			<strong className="statistics-weekly-activity-total">{props.activity.totalTimeLabel}</strong>
			<p className="statistics-weekly-activity-caption">{props.activity.totalTimeCaption}</p>

			<ul className="statistics-weekly-activity-bars" aria-label={props.activity.title}>
				{props.activity.days.map((day) => (
					<li key={day.key} className="statistics-weekly-activity-day">
						<span className="statistics-weekly-activity-bar-track" aria-hidden="true">
							<span
								className={`statistics-weekly-activity-bar statistics-weekly-activity-bar--${day.tone}`}
								style={{ height: day.barHeight }}
							/>
						</span>
						<span className="statistics-weekly-activity-day-label">{day.label}</span>
					</li>
				))}
			</ul>

			<p className="statistics-weekly-activity-note">{props.activity.note}</p>
		</section>
	);
}
