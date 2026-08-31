// src/ui/view/components/LearningPathPage/LearningPathRoadmap.jsx
import { useCallback, useLayoutEffect, useRef } from "react";
import { ArrowRight, Check, ChevronRight, ClipboardCheck, Lock, LockKeyhole, Play, Repeat2, RotateCcw, TrendingUp } from "lucide-react";

const SCORE_RING_RADIUS = 15.9155;
const REDUCED_MOTION_QUERY = "(prefers-reduced-motion: reduce)";

const STATUS_ICONS = Object.freeze({
	check: Check,
	lock: LockKeyhole,
	play: Play,
	repeat: Repeat2,
	trending: TrendingUp
});

export default function LearningPathRoadmap(props) {
	const registerModuleElement = useModuleScroll(props.scrollToModuleId);

	return (
		<section
			className="learning-path-roadmap"
			aria-label={props.model.accessibleLabel}
		>
			{props.model.entries.map((entry) => (
				entry.kind === "examGate"
					? (
						<ExamGate
							key={entry.id}
							model={entry}
						/>
					)
					: (
						<ModuleStep
							key={entry.id}
							model={entry}
							onModuleToggle={props.onModuleToggle}
							onActionPressed={props.onActionPressed}
							registerModuleElement={registerModuleElement}
						/>
					)
			))}
		</section>
	);
}

function ModuleStep(props) {
	const registerElement = useCallback((element) => {
		props.registerModuleElement(props.model.id, element);
	}, [props.model.id, props.registerModuleElement]);

	return (
		<div
			ref={registerElement}
			className={`learning-path-step learning-path-step--${props.model.appearance}`}
			data-learning-path-module-id={props.model.id}
		>
			<div className="learning-path-step__node">
				<RoadmapNode model={props.model.nodeModel} />
			</div>

			<ModuleCard
				model={props.model.cardModel}
				onPressed={() => props.onModuleToggle(props.model.id)}
			/>

			{props.model.detailModel === null
				? null
				: (
					<ModuleDetail
						model={props.model.detailModel}
						onActionPressed={props.onActionPressed}
					/>
				)}
		</div>
	);
}

function ExamGate({ model }) {
	return (
		<div
			className={`learning-path-step learning-path-step--exam learning-path-step--${model.appearance}`}
		>
			<div className="learning-path-step__node">
				<RoadmapNode model={model.nodeModel} />
			</div>

			<div
				className={`learning-path-exam-gate learning-path-exam-gate--${model.appearance}`}
			>
				<span>
					<span className="learning-path-module-card__eyebrow">
						{model.cardModel.eyebrow}
					</span>
					<strong className="learning-path-module-card__title">
						{model.cardModel.title}
					</strong>
					<span className="learning-path-module-card__status">
						{model.cardModel.statusLabel}
					</span>
				</span>
			</div>
		</div>
	);
}

function RoadmapNode({ model }) {
	const Icon = resolveStatusIcon(model.iconKey);

	return (
		<div
			className={`learning-path-node learning-path-node--${model.appearance}`}
			role="img"
			aria-label={model.label}
			aria-current={model.isCurrentStep ? "step" : undefined}
		>
			{Icon === null
				? <span aria-hidden="true">{model.value}</span>
				: <Icon aria-hidden="true" />}
		</div>
	);
}

function resolveStatusIcon(iconKey) {
	if (iconKey === null) {
		return null;
	}

	const Icon = STATUS_ICONS[iconKey];

	if (Icon === undefined) {
		throw new Error(
			`Unknown LearningPath icon '${String(iconKey)}'`
		);
	}

	return Icon;
}

function ModuleCard({ model, onPressed }) {
	return (
		<button
			type="button"
			className={`learning-path-module-card learning-path-module-card--${model.appearance}`}
			aria-expanded={model.isExpanded}
			aria-current={model.isCurrentStep ? "step" : undefined}
			aria-label={model.chevronLabel}
			disabled={model.isDisabled}
			onClick={onPressed}
		>
			<span className="learning-path-module-card__copy">
				<span className="learning-path-module-card__eyebrow">
					{model.eyebrow}
				</span>
				<span className="learning-path-module-card__title">
					{model.title}
				</span>
				<span className="learning-path-module-card__status">
					{model.progressSummaryLabel}
				</span>
			</span>

			<span className="learning-path-module-card__trailing">
				<MasteryRing model={model.masteryRingModel} />
				<ChevronRight
					className="learning-path-module-card__chevron"
					aria-hidden="true"
				/>
			</span>
		</button>
	);
}

function MasteryRing({ model }) {
	return (
		<div
			className={`learning-path-mastery-ring learning-path-mastery-ring--${model.appearance}`}
			role="img"
			aria-label={model.accessibleLabel}
		>
			<svg viewBox="0 0 36 36" aria-hidden="true">
				<circle
					className="learning-path-mastery-ring__background"
					cx="18"
					cy="18"
					r={SCORE_RING_RADIUS}
				/>
				<circle
					className="learning-path-mastery-ring__value"
					cx="18"
					cy="18"
					r={SCORE_RING_RADIUS}
					strokeDasharray={`${model.percentage} 100`}
				/>
			</svg>
			<span>{model.compactDisplayValue}</span>
		</div>
	);
}

function ModuleDetail({ model, onActionPressed }) {
	return (
		<section
			className="learning-path-module-detail"
			aria-labelledby={model.headingId}
		>
			<h3 id={model.headingId}>{model.sectionsHeading}</h3>

			{model.description === null
				? null
				: (
					<p className="learning-path-module-detail__description">
						{model.description}
					</p>
				)}

			<div className="learning-path-module-detail__sections">
				{model.sections.map((section) => (
					<Section
						key={section.id}
						model={section}
						onActionPressed={onActionPressed}
					/>
				))}
			</div>

			<div className="learning-path-module-detail__mastery">
				<ProgressRow model={model.progressModel} />
			</div>

			{model.actionModel === null
				? null
				: (
					<div className="learning-path-module-detail__actions">
						<button
							type="button"
							className="learning-path-module-detail__start"
							disabled={model.actionModel.isDisabled}
							onClick={() => onActionPressed(model.actionModel)}
						>
							<span>
								{model.actionModel.isPending
									? "…"
									: model.actionModel.label}
							</span>
							<ArrowRight aria-hidden="true" />
						</button>
					</div>
				)}
		</section>
	);
}

function Section({ model, onActionPressed }) {
	return (
		<section
			className="learning-path-section"
			aria-labelledby={`learning-path-section-${model.id}`}
		>
			<div className="learning-path-section__heading">
				<div>
					<span>{model.eyebrow}</span>
					<h4 id={`learning-path-section-${model.id}`}>
						{model.label}
					</h4>
				</div>
				<small>{model.progressLabel}</small>
			</div>

			<ul className="learning-path-section__sessions">
				{model.sessions.map((session) => (
					<SessionNode
						key={session.planKey}
						model={session}
						onActionPressed={onActionPressed}
					/>
				))}
			</ul>

			{model.chapterTests.length === 0
				? null
				: (
					<div className="learning-path-section__tests">
						<h5 className="learning-path-section__tests-heading">
							{model.chapterTestsHeading}
						</h5>

						<div className="learning-path-section__tests-grid">
							{model.chapterTests.map((chapterTest) => (
								<ChapterTestNode
									key={chapterTest.id}
									model={chapterTest}
									onActionPressed={onActionPressed}
								/>
							))}
						</div>
					</div>
				)}
		</section>
	);
}

function SessionNode({ model, onActionPressed }) {
	const content = <SessionContent model={model} />;

	return (
		<li
			className={
				`learning-path-session-node learning-path-session-node--${model.appearance}`
				+ (model.isSelectable
					? " learning-path-session-node--selectable"
					: "")
			}
		>
			{model.isSelectable
				? (
					<button
						type="button"
						className="learning-path-session-node__button"
						disabled={model.actionModel.isDisabled}
						onClick={() => onActionPressed(model.actionModel)}
						aria-label={model.actionModel.label}
					>
						{content}
					</button>
				)
				: (
					<div className="learning-path-session-node__content">
						{content}
					</div>
				)}
		</li>
	);
}

function SessionContent({ model }) {
	return (
		<>
			<span className="learning-path-session-node__visual">
				{model.iconKey === "score"
					? <SessionScore model={model.scoreModel} />
					: (
						<span className="learning-path-session-node__icon">
							{createSessionNodeIcon(model.iconKey)}
						</span>
					)}

				{model.isSelectable
					? (
						<span
							className="learning-path-session-node__hover-play"
							aria-hidden="true"
						>
							<Play />
						</span>
					)
					: null}
			</span>

			<span className="learning-path-session-node__copy">
				<strong>{model.label}</strong>
				<small>{model.metaLabel}</small>
			</span>

			<span
				className={
					"learning-path-session-node__status-slot"
					+ (model.replayHoverLabel === null
						? ""
						: " learning-path-session-node__status-slot--replay")
				}
			>
				<span className="learning-path-session-node__status">
					{model.statusLabel}
				</span>

				{model.replayHoverLabel === null
					? null
					: (
						<span
							className="learning-path-session-node__replay-label"
							aria-hidden="true"
						>
							<span>{model.replayHoverLabel}</span>
							<RotateCcw />
						</span>
					)}
			</span>
		</>
	);
}

function createSessionNodeIcon(iconKey) {
	switch (iconKey) {
		case "lock":
			return <Lock aria-hidden="true" />;

		case "play":
			return <Play aria-hidden="true" />;

		default:
			throw new Error(
				`Unknown LearningPath session node icon '${String(iconKey)}'`
			);
	}
}

function ChapterTestNode({ model, onActionPressed }) {
	const isDisabled = model.actionModel.isDisabled;
	const Icon = isDisabled ? Lock : ClipboardCheck;

	return (
		<button
			type="button"
			className={`learning-path-chapter-test-node learning-path-chapter-test-node--${model.status}`}
			disabled={isDisabled}
			onClick={() => onActionPressed(model.actionModel)}
		>
			{model.scoreModel === null
				? (
					<span className="learning-path-chapter-test-node__icon">
						<Icon aria-hidden="true" />
					</span>
				)
				: <SessionScore model={model.scoreModel} />}

			<span className="learning-path-chapter-test-node__content">
				<strong>{model.label}</strong>
				<small>{model.statusLabel}</small>
			</span>

			<ChevronRight
				className="learning-path-chapter-test-node__chevron"
				aria-hidden="true"
			/>
		</button>
	);
}

function SessionScore({ model }) {
	if (model === null) {
		throw new Error("LearningPath score icon requires scoreModel");
	}

	return (
		<span
			className={`learning-path-session-score learning-path-session-score--${model.appearance}`}
			role="img"
			aria-label={model.accessibleLabel}
		>
			<svg
				className="learning-path-session-score__ring"
				viewBox="0 0 36 36"
				aria-hidden="true"
			>
				<circle
					className="learning-path-session-score__background"
					cx="18"
					cy="18"
					r={SCORE_RING_RADIUS}
				/>
				<circle
					className="learning-path-session-score__value"
					cx="18"
					cy="18"
					r={SCORE_RING_RADIUS}
					strokeDasharray={`${model.percentage} 100`}
				/>
			</svg>
			<span>{model.displayValue}</span>
		</span>
	);
}

function ProgressRow({ model }) {
	return (
		<span
			className={`learning-path-progress-row learning-path-progress-row--${model.appearance}`}
		>
			<span
				className="learning-path-progress-row__marker"
				aria-hidden="true"
			/>
			<span className="learning-path-progress-row__label">
				{model.label}
			</span>
			<span
				className="learning-path-progress-row__track"
				aria-hidden="true"
			>
				<span style={{ width: `${model.percentage}%` }} />
			</span>
			<span className="learning-path-progress-row__value">
				{model.displayValue}
			</span>
		</span>
	);
}

function useModuleScroll(scrollToModuleId) {
	const elementsByIdRef = useRef(new Map());

	const registerModuleElement = useCallback((moduleId, element) => {
		if (element === null) {
			elementsByIdRef.current.delete(moduleId);
			return;
		}

		elementsByIdRef.current.set(moduleId, element);
	}, []);

	useLayoutEffect(() => {
		if (scrollToModuleId === null) {
			return;
		}

		const targetElement =
			elementsByIdRef.current.get(scrollToModuleId);

		if (targetElement === undefined) {
			// Resource identity can change while an expanded module id still belongs
			// to the previous LearningPath render. There is then nothing to scroll.
			return;
		}

		const prefersReducedMotion =
			typeof window.matchMedia === "function"
			&& window.matchMedia(REDUCED_MOTION_QUERY).matches === true;

		targetElement.scrollIntoView({
			block: "nearest",
			inline: "nearest",
			behavior: prefersReducedMotion ? "auto" : "smooth"
		});
	}, [scrollToModuleId]);

	return registerModuleElement;
}
