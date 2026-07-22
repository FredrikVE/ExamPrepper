import ExamCard from "./ExamCard.jsx";
import LearningContentPlaceholderCard from "./LearningContentPlaceholderCard.jsx";

export default function ExamGrid(props) {
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
