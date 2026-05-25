//src/di/dependencies.js
import ExamQuestionDataSource from "../model/datasource/ExamQuestionDataSource.js";
import SubjectDataSource from "../model/datasource/SubjectDataSource.js";

import ExamRepository from "../model/repositories/ExamRepository.js";
import SubjectRepository from "../model/repositories/SubjectRepository.js";

import GetExamQuestionsUseCase from "../model/domain/GetExamQuestionsUseCase.js";
import GetAvailableExamsUseCase from "../model/domain/GetAvailableExamsUseCase.js";
import GetAvailableSubjectsUseCase from "../model/domain/GetAvailableSubjectsUseCase.js";
import GetSubjectByIdUseCase from "../model/domain/GetSubjectByIdUseCase.js";
import GradeAnswerUseCase from "../model/domain/GradeAnswerUseCase.js";
import CalculateExamScoreUseCase from "../model/domain/CalculateExamScoreUseCase.js";
import GetExamByBaseIdAndLangUseCase from "../model/domain/GetExamByBaseIdAndLangUseCase.js";

// Datasources
const examQuestionDataSource = new ExamQuestionDataSource();
const subjectDataSource = new SubjectDataSource();

// Repositories
const examRepository = new ExamRepository(examQuestionDataSource);
const subjectRepository = new SubjectRepository(subjectDataSource);

// Use cases
const gradeAnswerUseCase = new GradeAnswerUseCase();
const getExamQuestionsUseCase = new GetExamQuestionsUseCase(examRepository);
const getAvailableExamsUseCase = new GetAvailableExamsUseCase(examRepository);
const getAvailableSubjectsUseCase = new GetAvailableSubjectsUseCase(subjectRepository, examRepository);
const getSubjectByIdUseCase = new GetSubjectByIdUseCase(subjectRepository);
const calculateExamScoreUseCase = new CalculateExamScoreUseCase(gradeAnswerUseCase);
const getExamByBaseIdAndLangUseCase = new GetExamByBaseIdAndLangUseCase(examRepository);

// Export
export {
    getExamQuestionsUseCase,
    getAvailableExamsUseCase,
    getAvailableSubjectsUseCase,
    getSubjectByIdUseCase,
    gradeAnswerUseCase,
    calculateExamScoreUseCase,
    getExamByBaseIdAndLangUseCase
};
