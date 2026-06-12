// src/ui/view/pages/StatisticsPage.jsx
import StatisticsKpiGrid from "../components/StatisticsPage/StatisticsKpiGrid.jsx";
import StatisticsRecentAttempts from "../components/StatisticsPage/StatisticsRecentAttempts.jsx";
import StatisticsScoreTrendChart from "../components/StatisticsPage/StatisticsScoreTrendChart.jsx";
import StatisticsState from "../components/StatisticsPage/StatisticsState.jsx";

export default function StatisticsPage({ viewModel }) {
	if (viewModel.isAuthLoading) {
		return (
			<StatisticsShell viewModel={viewModel}>
				<StatisticsState
					title={viewModel.loadingTitle}
					body={viewModel.loadingBody}
				/>
			</StatisticsShell>
		);
	}

	if (viewModel.isSignedOut) {
		return (
			<StatisticsShell viewModel={viewModel}>
				<StatisticsState
					title={viewModel.signedOutTitle}
					body={viewModel.signedOutBody}
					actionLabel={viewModel.startNewExamLabel}
					onAction={viewModel.onStartNewExam}
				/>
			</StatisticsShell>
		);
	}

	if (viewModel.statisticsLoading) {
		return (
			<StatisticsShell viewModel={viewModel}>
				<StatisticsState
					title={viewModel.loadingTitle}
					body={viewModel.loadingBody}
				/>
			</StatisticsShell>
		);
	}

	if (viewModel.statisticsLoadError) {
		return (
			<StatisticsShell viewModel={viewModel}>
				<StatisticsState
					title={viewModel.errorTitle}
					body={viewModel.statisticsLoadError}
					actionLabel={viewModel.retryButtonLabel}
					onAction={viewModel.onRetryLoadStatistics}
				/>
			</StatisticsShell>
		);
	}

	return (
		<StatisticsShell viewModel={viewModel}>
			<section className="statistics-hero" aria-labelledby="statistics-hero-title">
				<div className="statistics-hero-copy">
					<p className="statistics-eyebrow">{viewModel.pageTitle}</p>
					<h2 id="statistics-hero-title">{viewModel.hero.title}</h2>
					<p>{viewModel.hero.body}</p>

					<div className="statistics-hero-progress">
						<progress
							className="statistics-progress-bar"
							value={viewModel.hero.progressPercentage}
							max={100}
							aria-label={viewModel.kpiCards[0]?.label}
						/>
					</div>
				</div>

				{viewModel.hero.improvement ? (
					<div className={`statistics-hero-meter ${viewModel.hero.improvement.isPositive ? "is-positive" : "is-negative"}`}>
						<strong>{viewModel.hero.improvement.label}</strong>
						<span>{viewModel.hero.improvement.suffix}</span>
					</div>
				) : (
					<div className="statistics-hero-meter">
						<strong>{viewModel.kpiCards[0]?.value}</strong>
						<span>{viewModel.hero.trendLabel ?? ""}</span>
					</div>
				)}
			</section>

			{viewModel.isStatisticsEmpty ? (
				<StatisticsState
					title={viewModel.emptyTitle}
					body={viewModel.emptyBody}
					actionLabel={viewModel.startNewExamLabel}
					onAction={viewModel.onStartNewExam}
				/>
			) : (
				<>
					<StatisticsKpiGrid cards={viewModel.kpiCards} />

					<div className="statistics-dashboard-grid">
						<StatisticsScoreTrendChart chart={viewModel.scoreTrendChart} />
						<StatisticsRecentAttempts
							title={viewModel.recentAttemptsTitle}
							subtitle={viewModel.recentAttemptsSubtitle}
							emptyMessage={viewModel.recentAttemptsEmpty}
							attempts={viewModel.recentAttempts}
						/>
					</div>
				</>
			)}
		</StatisticsShell>
	);
}

function StatisticsShell({ viewModel, children }) {
	return (
		<main className="statistics-page-workspace">
			<div className="statistics-page-ambient-light" aria-hidden="true" />

			<header className="statistics-page-header">
				<div>
					<h1>{viewModel.pageTitle}</h1>
					<p>{viewModel.pageSubtitle}</p>
				</div>

				<button
					type="button"
					className="statistics-start-button"
					onClick={viewModel.onStartNewExam}
				>
					{viewModel.startNewExamLabel}
				</button>
			</header>

			{children}
		</main>
	);
}
