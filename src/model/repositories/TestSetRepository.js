// src/model/repositories/TestSetRepository.js
export default class TestSetRepository {
    #testSetDataSource;
    #testSetQuestionDataSource;
    #conceptImageDataSource;
    #testSetPromisesById = new Map();
    #questionPromisesById = new Map();
    #testSetListPromisesByScope = new Map();

    constructor(testSetDataSource, testSetQuestionDataSource, conceptImageDataSource) {
        this.#testSetDataSource = testSetDataSource;
        this.#testSetQuestionDataSource = testSetQuestionDataSource;
        this.#conceptImageDataSource = conceptImageDataSource;
    }

    async getAvailableTestSets({ subjectId, language } = {}) {
        if (!subjectId) {
            return [];
        }

        const testSets = await this.#getTestSetsBySubject({ subjectId, language });

        return [...testSets]
            .sort((a, b) => this.#compareTestSetListOrder(a, b))
            .map((testSet) => this.#toTestSetListItem(testSet));
    }

    async #getTestSetsBySubject({ subjectId, language }) {
        const cacheKey = `${subjectId}:${language ?? ""}`;

        if (!this.#testSetListPromisesByScope.has(cacheKey)) {
            const testSetListPromise = this.#testSetDataSource.fetchTestSetsBySubject({
                subjectId,
                language
            }).catch((fetchError) => {
                this.#testSetListPromisesByScope.delete(cacheKey);
                throw fetchError;
            });

            this.#testSetListPromisesByScope.set(cacheKey, testSetListPromise);
        }

        return await this.#testSetListPromisesByScope.get(cacheKey);
    }

    async getTestSetById(testSetId) {
        if (!testSetId) {
            return null;
        }

        if (!this.#testSetPromisesById.has(testSetId)) {
            const testSetPromise = this.#testSetDataSource.fetchTestSetById(testSetId)
                .catch((fetchError) => {
                    this.#testSetPromisesById.delete(testSetId);
                    throw fetchError;
                });

            this.#testSetPromisesById.set(testSetId, testSetPromise);
        }

        return await this.#testSetPromisesById.get(testSetId);
    }

    async getTestSetQuestions(input) {
        const { testSetId, language } = normalizeGetTestSetQuestionsInput(input);
        const testSet = await this.getTestSetById(testSetId);

        if (!testSet) {
            return [];
        }

        const questionDtos = await this.#getPracticeQuestionDtos(testSetId);
        const questions = questionDtos.map(toDomainPracticeQuestion);

        return await this.#enrichQuestionsWithConceptImages(questions, {
            testSetId: testSet.id,
            subjectId: testSet.subjectId,
            language: language ?? testSet.lang
        });
    }

    async #getPracticeQuestionDtos(testSetId) {
        if (!this.#questionPromisesById.has(testSetId)) {
            const questionPromise = this.#testSetQuestionDataSource.fetchPracticeQuestions(testSetId)
                .catch((fetchError) => {
                    this.#questionPromisesById.delete(testSetId);
                    throw fetchError;
                });

            this.#questionPromisesById.set(testSetId, questionPromise);
        }

        return await this.#questionPromisesById.get(testSetId);
    }

    async getTestSetByBaseIdAndLang({ baseId, language, subjectId } = {}) {
        if (!baseId || !language || !subjectId) {
            return null;
        }

        const testSets = await this.#getTestSetsBySubject({ subjectId, language });

        return testSets.find((testSet) => {
            return testSet.baseId === baseId && testSet.lang === language;
        }) ?? null;
    }

    async #enrichQuestionsWithConceptImages(questions, testSetContext) {
        return await Promise.all(
            questions.map((question) => {
                return this.#enrichQuestionWithConceptImages(question, testSetContext);
            })
        );
    }

    async #enrichQuestionWithConceptImages(question, testSetContext) {
        const questionContext = {
            ...testSetContext,
            subjectId: question.subjectId ?? testSetContext.subjectId,
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

    #compareTestSetListOrder(a, b) {
        const sortOrderA = a.sortOrder ?? Number.MAX_SAFE_INTEGER;
        const sortOrderB = b.sortOrder ?? Number.MAX_SAFE_INTEGER;

        if (sortOrderA !== sortOrderB) {
            return sortOrderA - sortOrderB;
        }

        return String(a.title ?? "").localeCompare(String(b.title ?? ""));
    }

    #toTestSetListItem(testSet) {
        return {
            id: testSet.id,
            subjectId: testSet.subjectId,
            baseId: testSet.baseId,
            lang: testSet.lang,
            title: testSet.title,
            description: testSet.description,
            modeLabel: testSet.modeLabel,
            testType: testSet.testType ?? null,
            estimatedMinutes: testSet.estimatedMinutes,
            sortOrder: testSet.sortOrder,
            questionCount: testSet.questionCount,
            topicAreaKeys: [...testSet.topicAreaKeys]
        };
    }
}

function normalizeGetTestSetQuestionsInput(input) {
    if (typeof input === "string") {
        return {
            testSetId: input,
            language: undefined
        };
    }

    return {
        testSetId: input?.testSetId,
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
