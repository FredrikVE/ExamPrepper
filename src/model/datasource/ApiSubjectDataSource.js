// src/model/datasource/ApiSubjectDataSource.js
import ApiDataSource from "./ApiDataSource.js";

export default class ApiSubjectDataSource extends ApiDataSource {
	async fetchSubjects() {
		return await this.get("/subjects");
	}
}
