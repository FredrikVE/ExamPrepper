//src/model/datasource/SubjectDataSource.js
import { SUBJECTS } from "../../data/subjects.js";

export default class SubjectDataSource {
    async fetchSubjects() {
        return SUBJECTS;
    }
}