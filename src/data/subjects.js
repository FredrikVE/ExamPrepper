// src/data/subjects.js
export const SUBJECTS = [
    {
        id: "in5431",
        code: "IN5431",
        name: {
            no: "Exam Emulator",
            en: "Exam Emulator"
        },
        description: {
            no: "Øv deg til eksamen med realistiske mock-eksamener og umiddelbar tilbakemelding.",
            en: "Prepare for the exam with realistic mock exams and immediate feedback."
        },
        faculty: "IFI",
        icon: "clipboard",
        recommended: true
    },
    {
        id: "it4600",
        code: "IT4600",
        name: {
            no: "Digital Strategy",
            en: "Digital Strategy"
        },
        description: {
            no: "Strategi, forretningsmodeller og digital transformasjon i praksis.",
            en: "Strategy, business models and digital transformation in practice."
        },
        faculty: "IFI",
        icon: "target"
    },
    {
        id: "tdt4252",
        code: "TDT4252",
        name: {
            no: "Data Engineering",
            en: "Data Engineering"
        },
        description: {
            no: "Datainnhenting, dataplattformer og skalerbare data pipelines.",
            en: "Data ingestion, data platforms and scalable data pipelines."
        },
        faculty: "IDI",
        icon: "database"
    },
    {
        id: "in2000",
        code: "IN2000",
        name: {
            no: "Software Engineering",
            en: "Software Engineering"
        },
        description: {
            no: "Programvareutviklingsprosesser, arkitektur og kvalitetssikring.",
            en: "Software development processes, architecture and quality assurance."
        },
        faculty: "IFI",
        icon: "code"
    },
    {
        id: "in1000",
        code: "IN1000",
        name: {
            no: "Introduksjon til programmering",
            en: "Introduction to Programming"
        },
        description: {
            no: "Grunnleggende programmeringskonsepter og problemløsning.",
            en: "Basic programming concepts and problem solving."
        },
        faculty: "IFI",
        icon: "monitor"
    },
    {
        id: "in3030",
        code: "IN3030",
        name: {
            no: "Databaser",
            en: "Databases"
        },
        description: {
            no: "Relasjonsdatabaser, SQL og datamodellering.",
            en: "Relational databases, SQL and data modelling."
        },
        faculty: "IFI",
        icon: "database-blue"
    }
];

export const DEFAULT_SUBJECT_ID = "in5431";

export function getSubjects() {
    return SUBJECTS;
}

export function getSubjectById(subjectId = DEFAULT_SUBJECT_ID) {
    return SUBJECTS.find((subject) => subject.id === subjectId) ?? SUBJECTS[0];
}
