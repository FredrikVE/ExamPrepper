// src/ui/viewmodel/ExamSelectPage/createExamSelectPageCopy.js
export function createExamSelectSubtitle(t, selectedSubject) {
    if (!selectedSubject?.code) {
        return t.selectSubtitleFallback;
    }

    return t.selectSubtitle(selectedSubject.code);
}

export default function createExamSelectPageCopy(t, selectedSubject) {
    return {
        title: t.selectIntroTitle,
        subtitle: createExamSelectSubtitle(t, selectedSubject),
        statisticsLabel: t.selectStatistics,
        loadingMessage: t.selectLoadingMessage,
        emptyTitle: t.selectEmptyTitle,
        emptyMessage: t.selectEmptyMessage,
        practiceExamLabel: t.selectPracticeExamLabel,
        questionLabel: t.selectQuestionLabel,
        minuteLabel: t.selectMinuteLabel
    };
}
