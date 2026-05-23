//src/di/dependencies.js
import ExamQuestionDataSource from "../model/datasource/ExamQuestionDataSource.js";
import ExamRepository from "../model/repositories/ExamRepository.js";

import GetExamQuestionsUseCase from "../model/domain/GetExamQuestionsUseCase.js";
import GradeAnswerUseCase from "../model/domain/GradeAnswerUseCase.js";
import CalculateExamScoreUseCase from "../model/domain/CalculateExamScoreUseCase.js";

const examQuestionDataSource = new ExamQuestionDataSource();
const examRepository = new ExamRepository(examQuestionDataSource);

const gradeAnswerUseCase = new GradeAnswerUseCase();
const getExamQuestionsUseCase = new GetExamQuestionsUseCase(examRepository);
const calculateExamScoreUseCase = new CalculateExamScoreUseCase(gradeAnswerUseCase);

export {
    getExamQuestionsUseCase,
    gradeAnswerUseCase,
    calculateExamScoreUseCase
};
