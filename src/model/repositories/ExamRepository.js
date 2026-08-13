// src/model/repositories/ExamRepository.js
export default class ExamRepository {
    #testSetDataSource;
    #testSetQuestionDataSource;
    #conceptImageDataSource;
    #examPromisesById = new Map();
    #questionPromisesById = new Map();
    #allExamsPromise = null;

    constructor(testSetDataSource, testSetQuestionDataSource, conceptImageDataSource) {
        this.#testSetDataSource = testSetDataSource;
        this.#testSetQuestionDataSource = testSetQuestionDataSource;
        this.#conceptImageDataSource = conceptImageDataSource;
    }

    async getAllExams() {
        if (!this.#allExamsPromise) {
            this.#allExamsPromise = this.#testSetDataSource.fetchAllTestSets()
                .catch((fetchError) => {
                    this.#allExamsPromise = null;
                    throw fetchError;
                });
        }

        return await this.#allExamsPromise;
    }

    async getAvailableExams({ subjectId, language } = {}) {
        const exams = await this.getAllExams();

        return exams
            .filter((exam) => this.#matchesSubject(exam, subjectId))
            .filter((exam) => this.#matchesLanguage(exam, language))
            .sort((a, b) => this.#compareExamListOrder(a, b))
            .map((exam) => this.#toExamListItem(exam));
    }

    async getExamById(examId) {
        if (!examId) {
            return null;
        }

        if (!this.#examPromisesById.has(examId)) {
            const examPromise = this.#testSetDataSource.fetchTestSetById(examId)
                .catch((fetchError) => {
                    this.#examPromisesById.delete(examId);
                    throw fetchError;
                });

            this.#examPromisesById.set(examId, examPromise);
        }

        return await this.#examPromisesById.get(examId);
    }

    async getExamQuestions(input) {
        const { examId, language } = normalizeGetExamQuestionsInput(input);
        const exam = await this.getExamById(examId);

        if (!exam) {
            return [];
        }

        const questionDtos = await this.#getPracticeQuestionDtos(examId);
        const questions = questionDtos.map(toDomainPracticeQuestion);

        return await this.#enrichQuestionsWithConceptImages(questions, {
            examId: exam.id,
            subjectId: exam.subjectId,
            language: language ?? exam.lang
        });
    }

    async #getPracticeQuestionDtos(examId) {
        if (!this.#questionPromisesById.has(examId)) {
            const questionPromise = this.#testSetQuestionDataSource.fetchPracticeQuestions(examId)
                .catch((fetchError) => {
                    this.#questionPromisesById.delete(examId);
                    throw fetchError;
                });

            this.#questionPromisesById.set(examId, questionPromise);
        }

        return await this.#questionPromisesById.get(examId);
    }

    async getExamByBaseIdAndLang(baseId, language) {
        const exams = await this.getAllExams();

        return exams.find((exam) => {
            return exam.baseId === baseId && exam.lang === language;
        }) ?? null;
    }

    async #enrichQuestionsWithConceptImages(questions, examContext) {
        return await Promise.all(
            questions.map((question) => {
                return this.#enrichQuestionWithConceptImages(question, examContext);
            })
        );
    }

    async #enrichQuestionWithConceptImages(question, examContext) {
        const questionContext = {
            ...examContext,
            subjectId: question.subjectId ?? examContext.subjectId,
            moduleId: question.moduleId,
            groupId: question.groupId
        };
        const questionImageRefs = getQuestionConceptImageRefs(question);

        const enrichedQuestion = await this.#enrichFeedbackEntryWithConceptImages(
            question,
            questionContext,
            questionImageRefs
        );

        if (Array.isArray(question.options)) {
            enrichedQuestion.options = await this.#enrichAnswerOptionsWithConceptImages(
                question.options,
                questionContext,
                questionImageRefs
            );
        }

        if (Array.isArray(question.targets)) {
            enrichedQuestion.targets = await this.#enrichFeedbackListWithConceptImages(
                question.targets,
                questionContext,
                questionImageRefs
            );
        }

        if (isPlainObject(question.itemFeedback)) {
            enrichedQuestion.itemFeedback = await this.#enrichFeedbackMapWithConceptImages(
                question.itemFeedback,
                questionContext,
                questionImageRefs
            );
        }

        return enrichedQuestion;
    }

    async #enrichAnswerOptionsWithConceptImages(options, context, fallbackImageRefs) {
        if (!Array.isArray(options)) {
            return options;
        }

        return await Promise.all(
            options.map((option) => {
                return this.#enrichFeedbackEntryWithConceptImages(
                    option,
                    context,
                    fallbackImageRefs
                );
            })
        );
    }

    async #enrichFeedbackListWithConceptImages(entries, context, fallbackImageRefs) {
        if (!Array.isArray(entries)) {
            return entries;
        }

        return await Promise.all(
            entries.map((entry) => {
                return this.#enrichFeedbackEntryWithConceptImages(
                    entry,
                    context,
                    fallbackImageRefs
                );
            })
        );
    }

    async #enrichFeedbackMapWithConceptImages(feedbackMap, context, fallbackImageRefs) {
        if (!isPlainObject(feedbackMap)) {
            return feedbackMap;
        }

        const entries = await Promise.all(
            Object.entries(feedbackMap).map(async ([key, entry]) => [
                key,
                await this.#enrichFeedbackEntryWithConceptImages(
                    entry,
                    context,
                    fallbackImageRefs
                )
            ])
        );

        return Object.fromEntries(entries);
    }

    async #enrichFeedbackEntryWithConceptImages(entry, context, fallbackImageRefs = []) {
        const imageRefs = getConceptImageRefs(entry, fallbackImageRefs);

        if (!this.#conceptImageDataSource || imageRefs.length === 0) {
            return { ...entry };
        }

        const whyExtendedImages = await this.#conceptImageDataSource.getConceptImages(
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
            testType: exam.testType ?? null,
            estimatedMinutes: exam.estimatedMinutes,
            duration: exam.duration,
            durationMinutes: exam.durationMinutes,
            sortOrder: exam.sortOrder,
            questionCount: exam.questionCount ?? exam.questions?.length ?? 0,
            topicAreaKeys: Array.isArray(exam.topicAreaKeys) ? exam.topicAreaKeys : []
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

function toDomainPracticeQuestion(question) {
    const domainQuestion = { ...question };

    if (question.type === "fill") {
        if (!Array.isArray(question.acceptedAnswers)) {
            throw new Error(`Invalid canonical practice question ${String(question.id)}: fill requires acceptedAnswers`);
        }

        domainQuestion.answers = [...question.acceptedAnswers];
    }

    if (question.type === "single" || question.type === "multi") {
        if (!Array.isArray(question.options)) {
            throw new Error(`Invalid canonical practice question ${String(question.id)}: ${question.type} requires options`);
        }

        domainQuestion.options = question.options.map((option) => toDomainAnswerOption(question, option));
    }

    return domainQuestion;
}

function toDomainAnswerOption(question, option) {
    if (typeof option.isCorrect !== "boolean") {
        throw new Error(`Invalid canonical practice question ${String(question.id)}: option ${String(option.id)} requires isCorrect`);
    }

    const domainOption = {
        ...option,
        correct: option.isCorrect
    };

    if (Object.hasOwn(option, "feedback")) {
        domainOption.why = option.feedback;
    }

    return domainOption;
}
