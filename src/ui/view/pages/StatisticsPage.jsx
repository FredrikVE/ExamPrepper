// src/ui/view/pages/StatisticsPage.jsx
import Header from "../components/Header/Header.jsx";
import HeaderTitle from "../components/Header/HeaderTitle.jsx";
import { HEADER_APPEARANCES, HEADER_LAYOUTS } from "../components/Header/headerVariants.js";
import StatisticsKpiGrid from "../components/StatisticsPage/StatisticsKpiGrid.jsx";
import StatisticsRecentAttempts from "../components/StatisticsPage/StatisticsRecentAttempts.jsx";
import StatisticsRecommendedExam from "../components/StatisticsPage/StatisticsRecommendedExam.jsx";
import StatisticsScoreTrendChart from "../components/StatisticsPage/StatisticsScoreTrendChart.jsx";
import StatisticsWeeklyActivity from "../components/StatisticsPage/StatisticsWeeklyActivity.jsx";
import WorkspaceState from "../components/WorkspaceState/WorkspaceState.jsx";
import WorkspaceScaffold from "../components/WorkspaceScaffold/WorkspaceScaffold.jsx";

export default function StatisticsPage({ viewModel }) {
	const desktopStartButton = (
		<button type="button" className="statistics-start-button statistics-start-button--desktop" onClick={viewModel.onStartNewExam}>
			{viewModel.startNewExamLabel}
		</button>
	);

	const header = (
		<Header
			appearance={HEADER_APPEARANCES.DEFAULT}
			layout={HEADER_LAYOUTS.PAGE_TITLE}
			backContract={viewModel.backContract}
			heading={<HeaderTitle title={viewModel.pageTitle} subtitle={viewModel.pageSubtitle} />}
			tools={null}
			trailing={desktopStartButton}
		/>
	);

	return (
		<WorkspaceScaffold
			className="statistics-page-workspace"
			header={header}
			footer={null}
			overlay={null}
			scrollToTopRequestId={null}
		>
			<WorkspaceState state={viewModel.workspaceState}>
				<>
					<button type="button" className="statistics-start-button statistics-start-button--mobile" onClick={viewModel.onStartNewExam}>
						{viewModel.startNewExamLabel}
					</button>
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
									aria-label={viewModel.hero.progressLabel}
								/>
							</div>
						</div>

						<div className={viewModel.hero.meterClassName}>
							<strong>{viewModel.hero.meterValueLabel}</strong>
							<span>{viewModel.hero.meterDescription}</span>
						</div>
					</section>

					<StatisticsKpiGrid cards={viewModel.kpiCards} ariaLabel={viewModel.kpiGridLabel} />

					<div className="statistics-dashboard-grid">
						<StatisticsScoreTrendChart chart={viewModel.scoreTrendChart} />

						<div className="statistics-side-stack">
							<StatisticsRecommendedExam
								title={viewModel.recommendedExamTitle}
								recommendation={viewModel.recommendedExam}
							/>
							<StatisticsWeeklyActivity activity={viewModel.weeklyActivity} />
						</div>
					</div>

					<StatisticsRecentAttempts
						title={viewModel.recentAttemptsTitle}
						subtitle={viewModel.recentAttemptsSubtitle}
						emptyMessage={viewModel.recentAttemptsEmpty}
						attempts={viewModel.recentAttempts}
					/>
				</>
			</WorkspaceState>
		</WorkspaceScaffold>
	);
}
