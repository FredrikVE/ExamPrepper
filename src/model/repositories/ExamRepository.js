//src/model/repositories/ExamRepository.js
export default class ExamRepository {
    constructor(examQuestionDataSource, conceptImageDataSource) {
        this.examQuestionDataSource = examQuestionDataSource;
        this.conceptImageDataSource = conceptImageDataSource;
    }

    async getAllExams() {
        return await this.examQuestionDataSource.fetchAllExams();
    }

    async getAvailableExams({ subjectId, language } = {}) {
        const exams = await this.examQuestionDataSource.fetchAllExams();

        return exams
            .filter((exam) => this.matchesSubject(exam, subjectId))
            .filter((exam) => this.matchesLanguage(exam, language))
            .map((exam) => this.toExamListItem(exam));
    }

    async getExamById(examId) {
        return await this.examQuestionDataSource.fetchExamById(examId);
    }

    async getExamQuestions(input) {
        const { examId, language } = normalizeGetExamQuestionsInput(input);
        const exam = await this.getExamById(examId);

        if (!exam) {
            return [];
        }

        return this.enrichQuestionsWithConceptImages(exam.questions ?? [], {
            subjectId: exam.subjectId,
            language: language ?? exam.lang
        });
    }

    async getExamByBaseIdAndLang(baseId, language) {
        return await this.examQuestionDataSource.fetchExamByBaseIdAndLang(
            baseId,
            language
        );
    }

    enrichQuestionsWithConceptImages(questions, examContext) {
        return questions.map((question) => {
            return this.enrichQuestionWithConceptImages(question, examContext);
        });
    }

    enrichQuestionWithConceptImages(question, examContext) {
        if (!Array.isArray(question.options)) {
            return { ...question };
        }

        const questionContext = {
            ...examContext,
            subjectId: question.subjectId ?? examContext.subjectId,
            moduleId: question.moduleId,
            groupId: question.groupId
        };

        return {
            ...question,
            options: question.options.map((option) => {
                return this.enrichAnswerOptionWithConceptImages(option, questionContext);
            })
        };
    }

    enrichAnswerOptionWithConceptImages(option, context) {
        const imageRefs = getAnswerOptionConceptImageRefs(option);

        if (!this.conceptImageDataSource || imageRefs.length === 0) {
            return { ...option };
        }

        const whyExtendedImages = this.conceptImageDataSource.getConceptImages(
            imageRefs,
            context
        );

        if (whyExtendedImages.length === 0) {
            return { ...option };
        }

        return {
            ...option,
            whyExtendedImages
        };
    }

    matchesSubject(exam, subjectId) {
        if (!subjectId) {
            return true;
        }

        return exam.subjectId === subjectId;
    }

    matchesLanguage(exam, language) {
        if (!language) {
            return true;
        }

        return exam.lang === language;
    }

    toExamListItem(exam) {
        return {
            id: exam.id,
            subjectId: exam.subjectId,
            baseId: exam.baseId,
            lang: exam.lang,
            title: exam.title,
            description: exam.description,
            duration: exam.duration,
            durationMinutes: exam.durationMinutes,
            questionCount: exam.questionCount ?? exam.questions?.length ?? 0
        };
    }
}

function normalizeGetExamQuestionsInput(input) {
    if (typeof input === "string") {
        return {
            examId: input,
            language: undefined
        };
    }

    return {
        examId: input?.examId,
        language: input?.language
    };
}

function getAnswerOptionConceptImageRefs(option) {
    return Array.isArray(option?.whyExtendedImageRefs)
        ? option.whyExtendedImageRefs
        : [];
}
