// src/model/repositories/SubjectRepository.js
export default class SubjectRepository {
    constructor(subjectDataSource, examRepository) {
        this.subjectDataSource = subjectDataSource;
        this.examRepository = examRepository;
    }

    async getSubjects() {
        const subjects = await this.subjectDataSource.fetchSubjects();

        return subjects.map((subject) => this.toSubject(subject));
    }

    async getSubjectById(subjectId) {
        const subjects = await this.getSubjects();

        return subjects.find((subject) => {
            return subject.id === subjectId;
        }) ?? null;
    }

    async getSubjectsWithExamCount({ language } = {}) {
        const [subjects, exams] = await Promise.all([
            this.subjectDataSource.fetchSubjects(),
            this.examRepository.getAllExams()
        ]);

        const examCountsBySubject = this.buildExamCountsBySubject({
            exams,
            language
        });

        return subjects.map((subject) => ({
            ...this.toSubject(subject),
            examCount: examCountsBySubject.get(subject.id) ?? 0
        }));
    }

    async getSubjectByIdWithExamCount({ subjectId, language } = {}) {
        const subjects = await this.getSubjectsWithExamCount({ language });

        return subjects.find((subject) => {
            return subject.id === subjectId;
        }) ?? null;
    }

    buildExamCountsBySubject({ exams, language } = {}) {
        const examKeysBySubject = new Map();

        for (const exam of exams) {
            if (language && exam.lang !== language) {
                continue;
            }

            if (!exam.subjectId) {
                continue;
            }

            const examKey = exam.baseId ?? exam.id;

            if (!examKeysBySubject.has(exam.subjectId)) {
                examKeysBySubject.set(exam.subjectId, new Set());
            }

            examKeysBySubject.get(exam.subjectId).add(examKey);
        }

        const counts = new Map();

        for (const [subjectId, examKeys] of examKeysBySubject.entries()) {
            counts.set(subjectId, examKeys.size);
        }

        return counts;
    }

    toSubject(subject) {
        return {
            id: subject.id,
            code: subject.code,
            name: subject.name,
            appName: subject.appName,
            description: subject.description,
            faculty: subject.faculty,
            icon: subject.icon,
            recommended: subject.recommended ?? false,
            isVisible: subject.isVisible ?? true
        };
    }
}