//src/data/data.js
import { mockExam1 } from "./exams/mockExam1.js";
import { mockExam2 } from "./exams/mockExam2.js";

export const DEFAULT_EXAM_ID = "mock-exam-1";

export const EXAMS = [
  mockExam1,
  mockExam2
];

export function getExamById(examId) {
  return EXAMS.find((exam) => exam.id === examId) ?? EXAMS[0];
}

export function getExamQuestions(examId = DEFAULT_EXAM_ID) {
  return getExamById(examId).questions;
}
