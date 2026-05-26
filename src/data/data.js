//src/data/data.js
import { mockExam1_no } from "./exams/mockExam1_no.js";
import { mockExam1_en } from "./exams/mockExam1_en.js";
import { mockExam2_no } from "./exams/mockExam2_no.js";
import { mockExam2_en } from "./exams/mockExam2_en.js";
import { mockExam3_no } from "./exams/mockExam3_no.js";
import { mockExam3_en } from "./exams/mockExam3_en.js";
import { mockExam4_no } from "./exams/mockExam4_no.js";
import { mockExam4_en } from "./exams/mockExam4_en.js";

import { DEFAULT_SUBJECT_ID, SUBJECTS } from "./subjects.js";

export const DEFAULT_EXAM_ID = "mock-exam-1-no";

export const EXAMS = [
    mockExam1_no,
    mockExam1_en,
    mockExam2_no,
    mockExam2_en,
    mockExam3_no,
    mockExam3_en,
    mockExam4_no,
    mockExam4_en,
];

export {
    DEFAULT_SUBJECT_ID,
    SUBJECTS
};

export function getExamsByLanguage(lang, subjectId = DEFAULT_SUBJECT_ID) {
    return EXAMS.filter((exam) => {
        const languageMatches = !lang || exam.lang === lang;
        const subjectMatches = !subjectId || exam.subjectId === subjectId;

        return languageMatches && subjectMatches;
    });
}

export function getExamById(examId) {
    return EXAMS.find((exam) => exam.id === examId) ?? EXAMS[0];
}

export function getExamQuestions(examId = DEFAULT_EXAM_ID) {
    return getExamById(examId).questions;
}