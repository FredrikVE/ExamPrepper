// src/di/dependencies.js
import { conceptImageCatalogsBySubjectId } from "../data/conceptImageCatalogRegistry.js";

import ConceptImageDataSource from "../model/datasource/ConceptImageDataSource.js";
import ExamQuestionDataSource from "../model/datasource/ExamQuestionDataSource.js";
import SubjectDataSource from "../model/datasource/SubjectDataSource.js";
import ApiSubjectDataSource from "../model/datasource/ApiSubjectDataSource.js";
import ApiExamQuestionDataSource from "../model/datasource/ApiExamQuestionDataSource.js";
import ApiConceptImageDataSource from "../model/datasource/ApiConceptImageDataSource.js";

import ExamRepository from "../model/repositories/ExamRepository.js";
import SubjectRepository from "../model/repositories/SubjectRepository.js";

import GetExamQuestionsUseCase from "../model/domain/GetExamQuestionsUseCase.js";
import GetAvailableExamsUseCase from "../model/domain/GetAvailableExamsUseCase.js";
import GetAvailableSubjectsUseCase from "../model/domain/GetAvailableSubjectsUseCase.js";
import GetSubjectByIdUseCase from "../model/domain/GetSubjectByIdUseCase.js";
import GetExamByIdUseCase from "../model/domain/GetExamByIdUseCase.js";
import GetExamByBaseIdAndLangUseCase from "../model/domain/GetExamByBaseIdAndLangUseCase.js";

import GradeAnswerUseCase from "../model/domain/GradeAnswerUseCase.js";
import CalculateExamScoreUseCase from "../model/domain/CalculateExamScoreUseCase.js";

// Configuration
const useApi = import.meta.env.VITE_USE_API === "true";
const apiBaseUrl = import.meta.env.VITE_API_BASE_URL;
const imageBaseUrl = import.meta.env.VITE_IMAGE_BASE_URL;

// Datasources
const conceptImageDataSource = useApi
    ? new ApiConceptImageDataSource({ baseUrl: apiBaseUrl, imageBaseUrl })
    : new ConceptImageDataSource(conceptImageCatalogsBySubjectId);

const subjectDataSource = useApi
    ? new ApiSubjectDataSource({ baseUrl: apiBaseUrl })
    : new SubjectDataSource();

const examQuestionDataSource = useApi
    ? new ApiExamQuestionDataSource({ baseUrl: apiBaseUrl })
    : new ExamQuestionDataSource();

// Repositories
const examRepository = new ExamRepository(examQuestionDataSource, conceptImageDataSource);
const subjectRepository = new SubjectRepository(subjectDataSource, examRepository);

// Use cases
const gradeAnswerUseCase = new GradeAnswerUseCase();
const getExamQuestionsUseCase = new GetExamQuestionsUseCase(examRepository);
const getAvailableExamsUseCase = new GetAvailableExamsUseCase(examRepository);
const getAvailableSubjectsUseCase = new GetAvailableSubjectsUseCase(subjectRepository);
const getSubjectByIdUseCase = new GetSubjectByIdUseCase(subjectRepository);
const getExamByBaseIdAndLangUseCase = new GetExamByBaseIdAndLangUseCase(examRepository);
const getExamByIdUseCase = new GetExamByIdUseCase(examRepository);
const calculateExamScoreUseCase = new CalculateExamScoreUseCase(gradeAnswerUseCase);

// Export
export {
    getExamQuestionsUseCase,
    getAvailableExamsUseCase,
    getAvailableSubjectsUseCase,
    getSubjectByIdUseCase,
    getExamByIdUseCase,
    getExamByBaseIdAndLangUseCase,
    gradeAnswerUseCase,
    calculateExamScoreUseCase
};
