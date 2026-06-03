// src/data/data.js
import { mockExam1_no } from "./exams/mockExam1_no.js";
import { mockExam1_en } from "./exams/mockExam1_en.js";
import { mockExam2_no } from "./exams/mockExam2_no.js";
import { mockExam2_en } from "./exams/mockExam2_en.js";
import { mockExam3_no } from "./exams/mockExam3_no.js";
import { mockExam3_en } from "./exams/mockExam3_en.js";
import { mockExam4a_no } from "./exams/mockExam4a_no.js";
import { mockExam4a_en } from "./exams/mockExam4a_en.js";
import { mockExam4b_no } from "./exams/mockExam4b_no.js";
import { mockExam4b_en } from "./exams/mockExam4b_en.js";
import { mockExam5_no } from "./exams/mockExam5_no.js";
import { mockExam5_en } from "./exams/mockExam5_en.js";
import { mockExamDefinitions_no } from "./exams/mockExamDefinitions_no.js";
import { mockExamDefinitions_en } from "./exams/mockExamDefinitions_en.js";
import { mockExamDragCategorize_no } from "./exams/mockExamDragCategorize_no.js";
import { mockExamDragCategorize_en } from "./exams/mockExamDragCategorize_en.js";
import { mockExamSustainability_no } from "./exams/mockExamSustainability_no.js";
import { mockExamSustainability_en } from "./exams/mockExamSustainability_en.js";
import { mockExamDigitalStrategy_no } from "./exams/mockExamDigitalStrategy_no.js";
import { mockExamDigitalStrategy_en } from "./exams/mockExamDigitalStrategy_en.js";
import { mockExamDigitalTransformation_no } from "./exams/mockExamDigitalTransformation_no.js";
import { mockExamDigitalTransformation_en } from "./exams/mockExamDigitalTransformation_en.js";

import { DEFAULT_SUBJECT_ID, SUBJECTS } from "./subjects.js";

export const DEFAULT_EXAM_ID = "mock-exam-1-no";

export const EXAMS = [
    mockExam1_no,
    mockExam1_en,
    mockExam2_no,
    mockExam2_en,
    mockExam3_no,
    mockExam3_en,
    mockExam4a_no,
    mockExam4a_en,
    mockExam4b_no,
    mockExam4b_en,
    mockExam5_no,
    mockExam5_en,
    mockExamDefinitions_no,
    mockExamDefinitions_en,
    mockExamDragCategorize_no,
    mockExamDragCategorize_en,
    mockExamSustainability_no,
    mockExamSustainability_en,
    mockExamDigitalStrategy_no,
    mockExamDigitalStrategy_en,
    mockExamDigitalTransformation_no,
    mockExamDigitalTransformation_en,
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