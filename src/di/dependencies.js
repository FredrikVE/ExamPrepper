// src/di/dependencies.js
import ApiSubjectDataSource from "../model/datasource/ApiSubjectDataSource.js";
import ApiExamQuestionDataSource from "../model/datasource/ApiExamQuestionDataSource.js";
import ApiConceptImageDataSource from "../model/datasource/ApiConceptImageDataSource.js";
import ApiConceptDataSource from "../model/datasource/ApiConceptDataSource.js";
import ApiExamAttemptDataSource from "../model/datasource/ApiExamAttemptDataSource.js";

import ExamRepository from "../model/repositories/ExamRepository.js";
import ExamAttemptRepository from "../model/repositories/ExamAttemptRepository.js";
import SubjectRepository from "../model/repositories/SubjectRepository.js";
import FlashcardRepository from "../model/repositories/FlashcardRepository.js";
import ConceptRepository from "../model/repositories/ConceptRepository.js";

import GetExamQuestionsUseCase from "../model/domain/GetExamQuestionsUseCase.js";
import GetAvailableExamsUseCase from "../model/domain/GetAvailableExamsUseCase.js";
import GetAvailableSubjectsUseCase from "../model/domain/GetAvailableSubjectsUseCase.js";
import GetSubjectByIdUseCase from "../model/domain/GetSubjectByIdUseCase.js";
import GetExamByIdUseCase from "../model/domain/GetExamByIdUseCase.js";
import GetExamByBaseIdAndLangUseCase from "../model/domain/GetExamByBaseIdAndLangUseCase.js";
import GetFlashcardsUseCase from "../model/domain/GetFlashcardsUseCase.js";
import GetConceptsForSubjectUseCase from "../model/domain/GetConceptsForSubjectUseCase.js";
import GetTopicAreasUseCase from "../model/domain/GetTopicAreasUseCase.js";
import GetFlashcardDeckSummariesUseCase from "../model/domain/GetFlashcardDeckSummariesUseCase.js";

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
const subjectDataSource = new ApiSubjectDataSource({ baseUrl: apiBaseUrl, getToken: getActiveAuthToken });
const examQuestionDataSource = new ApiExamQuestionDataSource({ baseUrl: apiBaseUrl, getToken: getActiveAuthToken });
const conceptImageDataSource = new ApiConceptImageDataSource({
    baseUrl: apiBaseUrl,
    imageBaseUrl,
    getToken: getActiveAuthToken
});
const conceptDataSource = new ApiConceptDataSource({
    baseUrl: apiBaseUrl,
    getToken: getActiveAuthToken
});
const examAttemptDataSource = new ApiExamAttemptDataSource({
    baseUrl: apiBaseUrl,
    getToken: getActiveAuthToken
});

// Repositories
const examRepository = new ExamRepository(examQuestionDataSource, conceptImageDataSource);
const examAttemptRepository = new ExamAttemptRepository(examAttemptDataSource);
const subjectRepository = new SubjectRepository(subjectDataSource, examRepository);
const conceptRepository = new ConceptRepository(conceptDataSource);
const flashcardRepository = new FlashcardRepository(conceptRepository);

// Use cases
const gradeAnswerUseCase = new GradeAnswerUseCase();
const getExamQuestionsUseCase = new GetExamQuestionsUseCase(examRepository);
const getAvailableExamsUseCase = new GetAvailableExamsUseCase(examRepository);
const getAvailableSubjectsUseCase = new GetAvailableSubjectsUseCase(subjectRepository);
const getSubjectByIdUseCase = new GetSubjectByIdUseCase(subjectRepository);
const getExamByBaseIdAndLangUseCase = new GetExamByBaseIdAndLangUseCase(examRepository);
const getExamByIdUseCase = new GetExamByIdUseCase(examRepository);
const calculateExamScoreUseCase = new CalculateExamScoreUseCase(gradeAnswerUseCase);
const submitExamAttemptUseCase = new SubmitExamAttemptUseCase(examAttemptRepository);
const getMyStatisticsUseCase = new GetMyStatisticsUseCase(examAttemptRepository);
const getFlashcardsUseCase = new GetFlashcardsUseCase(flashcardRepository);
const getConceptsForSubjectUseCase = new GetConceptsForSubjectUseCase(conceptRepository);
const getTopicAreasUseCase = new GetTopicAreasUseCase(subjectRepository);
const getFlashcardDeckSummariesUseCase = new GetFlashcardDeckSummariesUseCase(flashcardRepository, subjectRepository);

// Export
export {
    getExamQuestionsUseCase,
    getAvailableExamsUseCase,
    getAvailableSubjectsUseCase,
    getSubjectByIdUseCase,
    getExamByIdUseCase,
    getExamByBaseIdAndLangUseCase,
    gradeAnswerUseCase,
    calculateExamScoreUseCase,
    submitExamAttemptUseCase,
    getMyStatisticsUseCase,
    getFlashcardsUseCase,
    getConceptsForSubjectUseCase,
    getTopicAreasUseCase,
    getFlashcardDeckSummariesUseCase
};
