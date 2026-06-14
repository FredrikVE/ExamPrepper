// src/ui/view/components/StatisticsPage/ScoreTrendChart/ScoreTrendGradient.jsx
import { SCORE_TREND_GRADIENT_STOPS } from "./scoreTrendChartConfig";

export default function ScoreTrendGradient() {
	return (
		<defs>
			<linearGradient id="scoreTrendGradient" x1="0" y1="0" x2="1" y2="0">
				{SCORE_TREND_GRADIENT_STOPS.map((gradientStop) => (
					<stop key={gradientStop.offset} offset={gradientStop.offset} stopColor={gradientStop.color} />
				))}
			</linearGradient>
		</defs>
	);
}
