//src/model/repositories/SubjectRepository.js
export default class SubjectRepository {
    constructor(subjectDataSource) {
        this.subjectDataSource = subjectDataSource;
    }

    getAvailableSubjects(lang) {
        return this.subjectDataSource
            .fetchAllSubjects()
            .map((subject) => this.toLocalizedSubject(subject, lang));
    }

    getSubjectById(subjectId, lang) {
        const subjects = this.getAvailableSubjects(lang);
        return subjects.find((subject) => subject.id === subjectId) ?? subjects[0] ?? null;
    }

    toLocalizedSubject(subject, lang) {
        return {
            ...subject,
            name: getLocalizedValue(subject.name, lang),
            description: getLocalizedValue(subject.description, lang)
        };
    }
}

function getLocalizedValue(value, lang) {
    if (typeof value === "string") {
        return value;
    }

    if (!value || typeof value !== "object") {
        return "";
    }

    return value[lang] ?? value.no ?? value.en ?? "";
}
