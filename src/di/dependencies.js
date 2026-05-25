//src/di/dependencies.js
import ExamQuestionDataSource from "../model/datasource/ExamQuestionDataSource.js";
import SubjectDataSource from "../model/datasource/SubjectDataSource.js";

import ExamRepository from "../model/repositories/ExamRepository.js";
import SubjectRepository from "../model/repositories/SubjectRepository.js";

import GetExamQuestionsUseCase from "../model/domain/GetExamQuestionsUseCase.js";
import GetAvailableExamsUseCase from "../model/domain/GetAvailableExamsUseCase.js";
import GetAvailableSubjectsUseCase from "../model/domain/GetAvailableSubjectsUseCase.js";
import GetSubjectByIdUseCase from "../model/domain/GetSubjectByIdUseCase.js";
import GetExamByBaseIdAndLangUseCase from "../model/domain/GetExamByBaseIdAndLangUseCase.js";

import GradeAnswerUseCase from "../model/domain/GradeAnswerUseCase.js";
import CalculateExamScoreUseCase from "../model/domain/CalculateExamScoreUseCase.js";

// Datasources
const examQuestionDataSource = new ExamQuestionDataSource();
const subjectDataSource = new SubjectDataSource();

// Repositories
const examRepository = new ExamRepository(examQuestionDataSource);
const subjectRepository = new SubjectRepository(subjectDataSource, examRepository);

// Use cases
const gradeAnswerUseCase = new GradeAnswerUseCase();
const getExamQuestionsUseCase = new GetExamQuestionsUseCase(examRepository);
const getAvailableExamsUseCase = new GetAvailableExamsUseCase(examRepository);
const getAvailableSubjectsUseCase = new GetAvailableSubjectsUseCase(subjectRepository);
const getSubjectByIdUseCase = new GetSubjectByIdUseCase(subjectRepository);
const getExamByBaseIdAndLangUseCase = new GetExamByBaseIdAndLangUseCase(examRepository);
const calculateExamScoreUseCase = new CalculateExamScoreUseCase(gradeAnswerUseCase);

// Export
export {
    getExamQuestionsUseCase,
    getAvailableExamsUseCase,
    getAvailableSubjectsUseCase,
    getSubjectByIdUseCase,
    getExamByBaseIdAndLangUseCase,
    gradeAnswerUseCase,
    calculateExamScoreUseCase
};