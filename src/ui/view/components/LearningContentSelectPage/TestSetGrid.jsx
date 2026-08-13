// src/ui/view/components/LearningContentSelectPage/TestSetGrid.jsx
import TestSetCard from "./TestSetCard.jsx";
import LearningContentPlaceholderCard from "./LearningContentPlaceholderCard.jsx";

export default function TestSetGrid({ testSets, practiceExamLabel, questionLabel, minuteLabel, addPlaceholderCode, addPlaceholderTitle, addPlaceholderDescription, addPlaceholderNote, onSelectTestSet }) {
	return (
		<section className="exam-select-grid">
			{testSets.map((testSet, index) => (
				<TestSetCard
					key={testSet.id}
					testSet={testSet}
					index={index}
					practiceExamLabel={practiceExamLabel}
					questionLabel={questionLabel}
					minuteLabel={minuteLabel}
					onSelectTestSet={onSelectTestSet}
				/>
			))}

			<LearningContentPlaceholderCard
				code={addPlaceholderCode}
				title={addPlaceholderTitle}
				description={addPlaceholderDescription}
				note={addPlaceholderNote}
			/>
		</section>
	);
}
