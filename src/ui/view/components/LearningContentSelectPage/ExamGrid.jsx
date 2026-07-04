import ExamCard from "./ExamCard.jsx";
import LearningContentPlaceholderCard from "./LearningContentPlaceholderCard.jsx";

export default function ExamGrid(props) {
	if (props.exams.length === 0) {
		return (
			<section className="exam-select-empty">
				<h2>{props.emptyTitle}</h2>
				<p>{props.emptyMessage}</p>
			</section>
		);
	}

	return (
		<section className="exam-select-grid">
			{props.exams.map((exam, index) => (
				<ExamCard
					key={exam.id}
					exam={exam}
					index={index}
					practiceExamLabel={props.practiceExamLabel}
					questionLabel={props.questionLabel}
					minuteLabel={props.minuteLabel}
					onSelectExam={props.onSelectExam}
				/>
			))}

			<LearningContentPlaceholderCard
				code={props.addPlaceholderCode}
				title={props.addPlaceholderTitle}
				description={props.addPlaceholderDescription}
				note={props.addPlaceholderNote}
			/>
		</section>
	);
}
