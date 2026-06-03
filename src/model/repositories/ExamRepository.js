// src/model/repositories/ExamRepository.js
export default class ExamRepository {
    #examQuestionDataSource;
    #conceptImageDataSource;

    constructor(examQuestionDataSource, conceptImageDataSource) {
        this.#examQuestionDataSource = examQuestionDataSource;
        this.#conceptImageDataSource = conceptImageDataSource;
    }

    async getAllExams() {
        return await this.#examQuestionDataSource.fetchAllExams();
    }

    async getAvailableExams({ subjectId, language } = {}) {
        const exams = await this.#examQuestionDataSource.fetchAllExams();

        return exams
            .filter((exam) => this.#matchesSubject(exam, subjectId))
            .filter((exam) => this.#matchesLanguage(exam, language))
            .sort((a, b) => this.#compareExamListOrder(a, b))
            .map((exam) => this.#toExamListItem(exam));
    }

    async getExamById(examId) {
        return await this.#examQuestionDataSource.fetchExamById(examId);
    }

    async getExamQuestions(input) {
        const { examId, language } = normalizeGetExamQuestionsInput(input);
        const exam = await this.getExamById(examId);

        if (!exam) {
            return [];
        }

        return this.#enrichQuestionsWithConceptImages(exam.questions ?? [], {
            examId: exam.id,
            subjectId: exam.subjectId,
            language: language ?? exam.lang
        });
    }

    async getExamByBaseIdAndLang(baseId, language) {
        return await this.#examQuestionDataSource.fetchExamByBaseIdAndLang(
            baseId,
            language
        );
    }

    #enrichQuestionsWithConceptImages(questions, examContext) {
        return questions.map((question) => {
            return this.#enrichQuestionWithConceptImages(question, examContext);
        });
    }

    #enrichQuestionWithConceptImages(question, examContext) {
        const questionContext = {
            ...examContext,
            subjectId: question.subjectId ?? examContext.subjectId,
            moduleId: question.moduleId,
            groupId: question.groupId
        };
        const questionImageRefs = getQuestionConceptImageRefs(question);

        const enrichedQuestion = this.#enrichFeedbackEntryWithConceptImages(
            question,
            questionContext,
            questionImageRefs
        );

        if (Array.isArray(question.options)) {
            enrichedQuestion.options = this.#enrichAnswerOptionsWithConceptImages(
                question.options,
                questionContext,
                questionImageRefs
            );
        }

        if (Array.isArray(question.targets)) {
            enrichedQuestion.targets = this.#enrichFeedbackListWithConceptImages(
                question.targets,
                questionContext,
                questionImageRefs
            );
        }

        if (isPlainObject(question.itemFeedback)) {
            enrichedQuestion.itemFeedback = this.#enrichFeedbackMapWithConceptImages(
                question.itemFeedback,
                questionContext,
                questionImageRefs
            );
        }

        return enrichedQuestion;
    }

    #enrichAnswerOptionsWithConceptImages(options, context, fallbackImageRefs) {
        if (!Array.isArray(options)) {
            return options;
        }

        return options.map((option) => {
            return this.#enrichFeedbackEntryWithConceptImages(
                option,
                context,
                fallbackImageRefs
            );
        });
    }

    #enrichFeedbackListWithConceptImages(entries, context, fallbackImageRefs) {
        if (!Array.isArray(entries)) {
            return entries;
        }

        return entries.map((entry) => {
            return this.#enrichFeedbackEntryWithConceptImages(
                entry,
                context,
                fallbackImageRefs
            );
        });
    }

    #enrichFeedbackMapWithConceptImages(feedbackMap, context, fallbackImageRefs) {
        if (!isPlainObject(feedbackMap)) {
            return feedbackMap;
        }

        return Object.fromEntries(
            Object.entries(feedbackMap).map(([key, entry]) => [
                key,
                this.#enrichFeedbackEntryWithConceptImages(
                    entry,
                    context,
                    fallbackImageRefs
                )
            ])
        );
    }

    #enrichFeedbackEntryWithConceptImages(entry, context, fallbackImageRefs = []) {
        const imageRefs = getConceptImageRefs(entry, fallbackImageRefs);

        if (!this.#conceptImageDataSource || imageRefs.length === 0) {
            return { ...entry };
        }

        const whyExtendedImages = this.#conceptImageDataSource.getConceptImages(
            imageRefs,
            getImageLookupContext(context)
        );

        if (whyExtendedImages.length === 0) {
            return { ...entry };
        }

        return {
            ...entry,
            whyExtendedImages
        };
    }

    #matchesSubject(exam, subjectId) {
        if (!subjectId) {
            return true;
        }

        return exam.subjectId === subjectId;
    }

    #matchesLanguage(exam, language) {
        if (!language) {
            return true;
        }

        return exam.lang === language;
    }

    #compareExamListOrder(a, b) {
        const sortOrderA = a.sortOrder ?? Number.MAX_SAFE_INTEGER;
        const sortOrderB = b.sortOrder ?? Number.MAX_SAFE_INTEGER;

        if (sortOrderA !== sortOrderB) {
            return sortOrderA - sortOrderB;
        }

        return String(a.title ?? "").localeCompare(String(b.title ?? ""));
    }

    #toExamListItem(exam) {
        return {
            id: exam.id,
            subjectId: exam.subjectId,
            baseId: exam.baseId,
            lang: exam.lang,
            title: exam.title,
            description: exam.description,
            modeLabel: exam.modeLabel,
            estimatedMinutes: exam.estimatedMinutes,
            duration: exam.duration,
            durationMinutes: exam.durationMinutes,
            sortOrder: exam.sortOrder,
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

function getImageLookupContext(context) {
    return {
        subjectId: context.subjectId,
        moduleId: context.moduleId,
        groupId: context.groupId,
        language: context.language
    };
}

function getQuestionConceptImageRefs(question) {
    return getExplicitConceptImageRefs(question);
}

function getConceptImageRefs(entry, fallbackImageRefs = []) {
    const explicitImageRefs = getExplicitConceptImageRefs(entry);

    return explicitImageRefs.length > 0
        ? explicitImageRefs
        : fallbackImageRefs;
}

function getExplicitConceptImageRefs(entry) {
    return Array.isArray(entry?.whyExtendedImageRefs)
        ? entry.whyExtendedImageRefs
        : [];
}

function isPlainObject(value) {
    return Boolean(value)
        && typeof value === "object"
        && !Array.isArray(value);
}
