//src/di/dependencies.js
import SubjectDataSource from "../model/datasource/SubjectDataSource.js";
import ExamDataSource from "../model/datasource/ExamDataSource.js";
import ChapterTestDataSource from "../model/datasource/ChapterTestDataSource.js";
import ExamQuestionDataSource from "../model/datasource/ExamQuestionDataSource.js";
import ChapterTestQuestionDataSource from "../model/datasource/ChapterTestQuestionDataSource.js";
import ConceptImageDataSource from "../model/datasource/ConceptImageDataSource.js";
import GlossaryDataSource from "../model/datasource/GlossaryDataSource.js";
import ExamAttemptDataSource from "../model/datasource/ExamAttemptDataSource.js";
import LearningPathDataSource from "../model/datasource/LearningPathDataSource.js";

import TestSetRepository from "../model/repositories/TestSetRepository.js";
import ExamAttemptRepository from "../model/repositories/ExamAttemptRepository.js";
import SubjectRepository from "../model/repositories/SubjectRepository.js";
import GlossaryRepository from "../model/repositories/GlossaryRepository.js";
import LearningPathRepository from "../model/repositories/LearningPathRepository.js";

import GetTestSetQuestionsUseCase from "../model/domain/GetTestSetQuestionsUseCase.js";
import GetAvailableTestSetsUseCase from "../model/domain/GetAvailableTestSetsUseCase.js";
import GetAvailableSubjectsUseCase from "../model/domain/GetAvailableSubjectsUseCase.js";
import GetSubjectByIdUseCase from "../model/domain/GetSubjectByIdUseCase.js";
import GetTestSetByIdUseCase from "../model/domain/GetTestSetByIdUseCase.js";
import GetTestSetByBaseIdAndLangUseCase from "../model/domain/GetTestSetByBaseIdAndLangUseCase.js";
import GetGlossaryEntriesForSubjectUseCase from "../model/domain/GetGlossaryEntriesForSubjectUseCase.js";
import GetGlossaryOverviewUseCase from "../model/domain/GetGlossaryOverviewUseCase.js";
import GetGlossaryNetworkUseCase from "../model/domain/GetGlossaryNetworkUseCase.js";
import GetTopicAreasUseCase from "../model/domain/GetTopicAreasUseCase.js";
import GetFlipcardDeckSummariesUseCase from "../model/domain/GetFlipcardDeckSummariesUseCase.js";
import GetLearningPathUseCase from "../model/domain/GetLearningPathUseCase.js";
import StartLearningSessionUseCase from "../model/domain/StartLearningSessionUseCase.js";
import GetLearningSessionUseCase from "../model/domain/GetLearningSessionUseCase.js";
import SubmitLearningSessionUseCase from "../model/domain/SubmitLearningSessionUseCase.js";

import GradeAnswerUseCase from "../model/domain/GradeAnswerUseCase.js";
import CalculateExamScoreUseCase from "../model/domain/CalculateExamScoreUseCase.js";
import SubmitExamAttemptUseCase from "../model/domain/SubmitExamAttemptUseCase.js";
import GetMyStatisticsUseCase from "../model/domain/GetMyStatisticsUseCase.js";
import { getActiveAuthToken } from "../auth/AuthTokenProvider.js";

function requiredEnv(name) {
    const viteEnv = import.meta.env?.[name];
    const nodeEnv = typeof process !== "undefined" ? process.env?.[name] : undefined;
    const value = viteEnv ?? nodeEnv;

    if (!value) {
        throw new Error(`Missing required environment variable: ${name}`);
    }

    return value;
}

// Configuration
const apiBaseUrl = requiredEnv("VITE_API_BASE_URL");
const imageBaseUrl = requiredEnv("VITE_IMAGE_BASE_URL");

// Datasources
const subjectDataSource = new SubjectDataSource({ baseUrl: apiBaseUrl, getToken: getActiveAuthToken });
const examDataSource = new ExamDataSource({
    baseUrl: apiBaseUrl,
    getToken: getActiveAuthToken
});
const examQuestionDataSource = new ExamQuestionDataSource({
    baseUrl: apiBaseUrl,
    getToken: getActiveAuthToken
});
const chapterTestDataSource = new ChapterTestDataSource({
    baseUrl: apiBaseUrl,
    getToken: getActiveAuthToken
});
const chapterTestQuestionDataSource = new ChapterTestQuestionDataSource({
    baseUrl: apiBaseUrl,
    getToken: getActiveAuthToken
});
const conceptImageDataSource = new ConceptImageDataSource({
    baseUrl: apiBaseUrl,
    imageBaseUrl,
    getToken: getActiveAuthToken
});
const glossaryDataSource = new GlossaryDataSource({
    baseUrl: apiBaseUrl,
    getToken: getActiveAuthToken
});
const examAttemptDataSource = new ExamAttemptDataSource({
    baseUrl: apiBaseUrl,
    getToken: getActiveAuthToken
});
const learningPathDataSource = new LearningPathDataSource({ baseUrl: apiBaseUrl, getToken: getActiveAuthToken });

// Repositories
const examRepository = new TestSetRepository(examDataSource, examQuestionDataSource, conceptImageDataSource);
const chapterTestRepository = new TestSetRepository(chapterTestDataSource, chapterTestQuestionDataSource, conceptImageDataSource);
const examAttemptRepository = new ExamAttemptRepository(examAttemptDataSource);
const subjectRepository = new SubjectRepository(subjectDataSource);
const glossaryRepository = new GlossaryRepository(glossaryDataSource);
const learningPathRepository = new LearningPathRepository(learningPathDataSource);

// Use cases
const gradeAnswerUseCase = new GradeAnswerUseCase();
const getExamQuestionsUseCase = new GetTestSetQuestionsUseCase(examRepository);
const getChapterTestQuestionsUseCase = new GetTestSetQuestionsUseCase(chapterTestRepository);
const getAvailableExamsUseCase = new GetAvailableTestSetsUseCase(examRepository);
const getAvailableChapterTestsUseCase = new GetAvailableTestSetsUseCase(chapterTestRepository);
const getAvailableSubjectsUseCase = new GetAvailableSubjectsUseCase(subjectRepository);
const getSubjectByIdUseCase = new GetSubjectByIdUseCase(subjectRepository);
const getExamByBaseIdAndLangUseCase = new GetTestSetByBaseIdAndLangUseCase(examRepository);
const getExamByIdUseCase = new GetTestSetByIdUseCase(examRepository);
const getChapterTestByBaseIdAndLangUseCase = new GetTestSetByBaseIdAndLangUseCase(chapterTestRepository);
const getChapterTestByIdUseCase = new GetTestSetByIdUseCase(chapterTestRepository);
const calculateExamScoreUseCase = new CalculateExamScoreUseCase(gradeAnswerUseCase);
const submitExamAttemptUseCase = new SubmitExamAttemptUseCase(examAttemptRepository);
const getMyStatisticsUseCase = new GetMyStatisticsUseCase(examAttemptRepository);
const getGlossaryEntriesForSubjectUseCase = new GetGlossaryEntriesForSubjectUseCase(glossaryRepository);
const getGlossaryOverviewUseCase = new GetGlossaryOverviewUseCase(glossaryRepository);
const getGlossaryNetworkUseCase = new GetGlossaryNetworkUseCase(glossaryRepository);
const getTopicAreasUseCase = new GetTopicAreasUseCase(subjectRepository);
const getFlipcardDeckSummariesUseCase = new GetFlipcardDeckSummariesUseCase(glossaryRepository, subjectRepository);
const getLearningPathUseCase = new GetLearningPathUseCase(learningPathRepository);
const startLearningSessionUseCase = new StartLearningSessionUseCase(learningPathRepository);
const getLearningSessionUseCase = new GetLearningSessionUseCase(learningPathRepository);
const submitLearningSessionUseCase = new SubmitLearningSessionUseCase(learningPathRepository);

// Export
export {
    getExamQuestionsUseCase,
    getChapterTestQuestionsUseCase,
    getAvailableExamsUseCase,
    getAvailableChapterTestsUseCase,
    getAvailableSubjectsUseCase,
    getSubjectByIdUseCase,
    getExamByIdUseCase,
    getExamByBaseIdAndLangUseCase,
    getChapterTestByIdUseCase,
    getChapterTestByBaseIdAndLangUseCase,
    gradeAnswerUseCase,
    calculateExamScoreUseCase,
    submitExamAttemptUseCase,
    getMyStatisticsUseCase,
    getGlossaryEntriesForSubjectUseCase,
    getGlossaryOverviewUseCase,
    getGlossaryNetworkUseCase,
    getTopicAreasUseCase,
    getFlipcardDeckSummariesUseCase,
    getLearningPathUseCase,
    startLearningSessionUseCase,
    getLearningSessionUseCase,
    submitLearningSessionUseCase
};
