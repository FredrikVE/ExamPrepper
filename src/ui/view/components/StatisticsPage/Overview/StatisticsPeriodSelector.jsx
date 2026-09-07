// src/ui/view/components/StatisticsPage/Overview/StatisticsPeriodSelector.jsx
export default function StatisticsPeriodSelector({ label, options, selectedPeriod, onSelectPeriod }) {
	return (
		<div className="statistics-period-selector" aria-label={label}>
			<span className="statistics-period-selector-label">{label}</span>
			<div className="statistics-period-selector-options">
				{options.map((option) => (
					<button
						key={option.key}
						type="button"
						className="statistics-period-selector-button"
						aria-pressed={selectedPeriod === option.key}
						onClick={() => onSelectPeriod(option.key)}
					>
						{option.label}
					</button>
				))}
			</div>
		</div>
	);
}
