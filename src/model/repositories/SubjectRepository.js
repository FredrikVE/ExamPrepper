// src/model/repositories/SubjectRepository.js
export default class SubjectRepository {
    constructor(subjectDataSource) {
        this.subjectDataSource = subjectDataSource;
    }

    async getSubjectsWithPracticeTestCount({ language } = {}) {
        const subjects = await this.subjectDataSource.fetchSubjects({ language });

        return subjects.map((subject) => this.toSubject(subject));
    }

    async getSubjectByIdWithPracticeTestCount({ subjectId, language } = {}) {
        const subject = await this.subjectDataSource.fetchSubjectById({
            subjectId,
            language
        });

        return subject === null
            ? null
            : this.toSubject(subject);
    }

    async getTopicAreasBySubject(subjectId) {
        const dtos = await this.subjectDataSource.fetchTopicAreasBySubject(subjectId);
        const topicAreas = [];

        for (const dto of dtos) {
            topicAreas.push({
                key: dto.areaKey,
                label: {
                    no: dto.labelNo,
                    en: dto.labelEn
                },
                iconKey: dto.iconKey,
                position: dto.position
            });
        }

        return topicAreas;
    }

    toSubject(subject) {
        return {
            id: subject.id,
            code: subject.code,
            name: subject.name,
            appName: subject.appName,
            description: subject.description,
            faculty: subject.faculty,
            icon: subject.icon ?? subject.iconKey,
            recommended: subject.recommended ?? false,
            isVisible: subject.isVisible ?? true,
            practiceTestCount: subject.practiceTestCount
        };
    }
}
