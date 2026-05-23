//src/di/dependencies.js
import ExamQuestionDataSource from "../model/datasource/ExamQuestionDataSource.js";
import ExamRepository from "../model/repositories/ExamRepository.js";

import GetExamQuestionsUseCase from "../model/domain/GetExamQuestionsUseCase.js";
import GetAvailableExamsUseCase from "../model/domain/GetAvailableExamsUseCase.js";
import GradeAnswerUseCase from "../model/domain/GradeAnswerUseCase.js";
import CalculateExamScoreUseCase from "../model/domain/CalculateExamScoreUseCase.js";

//Datasource
const examQuestionDataSource = new ExamQuestionDataSource();

//Repository
const examRepository = new ExamRepository(examQuestionDataSource);

//UseCaser
const gradeAnswerUseCase = new GradeAnswerUseCase();
const getExamQuestionsUseCase = new GetExamQuestionsUseCase(examRepository);
const getAvailableExamsUseCase = new GetAvailableExamsUseCase(examRepository);
const calculateExamScoreUseCase = new CalculateExamScoreUseCase(gradeAnswerUseCase);

//Export
export {
    getExamQuestionsUseCase,
    getAvailableExamsUseCase,
    gradeAnswerUseCase,
    calculateExamScoreUseCase
};