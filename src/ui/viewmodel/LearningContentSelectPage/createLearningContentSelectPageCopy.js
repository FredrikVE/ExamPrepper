// src/ui/viewmodel/LearningContentSelectPage/createLearningContentSelectPageCopy.js
function createLearningContentSelectSubtitle(t, selectedSubject) {
    if (!selectedSubject?.code) {
        return t.selectSubtitleFallback;
    }

    return t.selectSubtitle(selectedSubject.code);
}

export default function createLearningContentSelectPageCopy(t, selectedSubject) {
    return {
        title: t.selectIntroTitle,
        subtitle: createLearningContentSelectSubtitle(t, selectedSubject),
        loadingMessage: t.selectLoadingMessage,
        emptyTitle: t.selectEmptyTitle,
        emptyMessage: t.selectEmptyMessage,
        practiceExamLabel: t.selectPracticeExamLabel,
        questionLabel: t.selectQuestionLabel,
        minuteLabel: t.selectMinuteLabel
    };
}
