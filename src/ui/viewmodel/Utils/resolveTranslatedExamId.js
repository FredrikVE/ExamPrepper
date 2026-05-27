//src/ui/viewmodel/Utils/resolveTranslatedExamId.js

/**
 * Resolves the translated exam id when the user switches language
 * while an exam is open.
 *
 * Returns { examId, subjectId } for the translated exam,
 * or null if no translation exists.
 */
export default async function resolveTranslatedExamId(currentExamId, targetLanguage, getExamByIdUseCase, getExamByBaseIdAndLangUseCase) {
    const currentExam = await getExamByIdUseCase.execute(currentExamId);

    if (!currentExam?.baseId) {
        return null;
    }

    const translatedExam = await getExamByBaseIdAndLangUseCase.execute({
        baseId: currentExam.baseId,
        lang: targetLanguage
    });

    if (!translatedExam) {
        return null;
    }

    return {
        examId: translatedExam.id,
        subjectId: translatedExam.subjectId
    };
}
