//src/data/data.js
import { mockExam1_no } from "./exams/mockExam1_no.js";
import { mockExam1_en } from "./exams/mockExam1_en.js";
import { mockExam2_no } from "./exams/mockExam2_no.js";
import { mockExam2_en } from "./exams/mockExam2_en.js";

export const DEFAULT_EXAM_ID = "mock-exam-1";

export const EXAMS = [
  mockExam1_no,
  mockExam1_en,
  mockExam2_no,
  mockExam2_en
];

export function getExamsByLanguage(lang) {
  return EXAMS.filter((exam) => exam.lang === lang);
}

export function getExamById(examId) {
  return EXAMS.find((exam) => exam.id === examId) ?? EXAMS[0];
}

export function getExamQuestions(examId = DEFAULT_EXAM_ID) {
  return getExamById(examId).questions;
}
