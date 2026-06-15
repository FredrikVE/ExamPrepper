import ExamSelectCard from "./ExamSelectCard.jsx";

export default function ExamSelectGrid(props) {
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
				<ExamSelectCard
					key={exam.id}
					exam={exam}
					index={index}
					practiceExamLabel={props.practiceExamLabel}
					questionLabel={props.questionLabel}
					minuteLabel={props.minuteLabel}
					onSelectExam={props.onSelectExam}
				/>
			))}
		</section>
	);
}