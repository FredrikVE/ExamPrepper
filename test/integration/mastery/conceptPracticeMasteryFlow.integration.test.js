// test/integration/mastery/conceptPracticeMasteryFlow.integration.test.js
import { afterEach, describe, expect, jest, test } from "@jest/globals";
import { CONCEPT_MASTERY_STATUS } from "../../../src/constants/ConceptMasteryStatus.js";
import ConceptPracticeDataSource from "../../../src/model/datasource/ConceptPracticeDataSource.js";
import GlossaryDataSource from "../../../src/model/datasource/GlossaryDataSource.js";
import RecordFlipcardAssessmentUseCase from "../../../src/model/domain/mastery/RecordFlipcardAssessmentUseCase.js";
import RecordMatchCardResultUseCase from "../../../src/model/domain/mastery/RecordMatchCardResultUseCase.js";
import GetGlossaryOverviewUseCase from "../../../src/model/domain/glossary/GetGlossaryOverviewUseCase.js";
import ConceptPracticeRepository from "../../../src/model/repositories/ConceptPracticeRepository.js";
import GlossaryRepository from "../../../src/model/repositories/GlossaryRepository.js";
import { createGlossaryMasteryPresentation } from "../../../src/ui/viewmodel/GlossaryPage/glossaryMasteryModel.js";

const API_BASE_URL = "https://api.example.test";
const SUBJECT_ID = "in2120";
const GLOSSARY_ENTRY_KEY = "kap1-konfidensialitet";

const masteryTranslations = Object.freeze({
	glossaryPageMasteryNotAssessedLabel: "Ikke vurdert",
	glossaryPageMasteryPracticeLabel: "Øv mer",
	glossaryPageMasteryProgressLabel: "På vei",
	glossaryPageMasteryUnderstoodLabel: "Forstått",
	glossaryPageMasteryAriaLabel: (statusLabel) => `Vurdering: ${statusLabel}`
});

afterEach(() => jest.restoreAllMocks());

describe("concept practice mastery frontend integration", () => {
	test("sends FlipCards and MatchCards through UseCase, Repository and DataSource with canonical authenticated requests", async () => {
		const fetchMock = jest.spyOn(globalThis, "fetch")
			.mockResolvedValue(createEmptyResponse(204));
		const getToken = jest.fn().mockResolvedValue("session-token");
		const dataSource = new ConceptPracticeDataSource({ baseUrl: API_BASE_URL, getToken });
		const repository = new ConceptPracticeRepository(dataSource);
		const recordFlipcardAssessmentUseCase = new RecordFlipcardAssessmentUseCase(repository);
		const recordMatchCardResultUseCase = new RecordMatchCardResultUseCase(repository);

		await recordFlipcardAssessmentUseCase.execute({
			eventId: "flip-event-1",
			subjectId: SUBJECT_ID,
			glossaryEntryKey: GLOSSARY_ENTRY_KEY,
			assessment: CONCEPT_MASTERY_STATUS.UNDERSTOOD
		});
		await recordMatchCardResultUseCase.execute({
			eventId: "match-event-1",
			subjectId: SUBJECT_ID,
			glossaryEntryKey: GLOSSARY_ENTRY_KEY,
			wrongAttemptCount: 2
		});

		expect(fetchMock).toHaveBeenNthCalledWith(1, `${API_BASE_URL}/subjects/${SUBJECT_ID}/concept-practice/flipcards`, {
			method: "POST",
			headers: {
				Accept: "application/json",
				Authorization: "Bearer session-token",
				"Content-Type": "application/json"
			},
			body: JSON.stringify({
				eventId: "flip-event-1",
				glossaryEntryKey: GLOSSARY_ENTRY_KEY,
				assessment: CONCEPT_MASTERY_STATUS.UNDERSTOOD
			})
		});
		expect(fetchMock).toHaveBeenNthCalledWith(2, `${API_BASE_URL}/subjects/${SUBJECT_ID}/concept-practice/match-cards`, {
			method: "POST",
			headers: {
				Accept: "application/json",
				Authorization: "Bearer session-token",
				"Content-Type": "application/json"
			},
			body: JSON.stringify({
				eventId: "match-event-1",
				glossaryEntryKey: GLOSSARY_ENTRY_KEY,
				wrongAttemptCount: 2
			})
		});
		expect(getToken).toHaveBeenCalledTimes(2);
	});

	test("keeps backend mastery status authoritative when Glossary reads the overview", async () => {
		const backendMastery = {
			status: CONCEPT_MASTERY_STATUS.PRACTICE,
			score: 1,
			evidenceCount: 99,
			correctCount: 99,
			incorrectCount: 0,
			easyCorrect: 99,
			easyIncorrect: 0,
			mediumCorrect: 99,
			mediumIncorrect: 0,
			hardCorrect: 99,
			hardIncorrect: 0,
			lastEvidenceAt: "2026-08-30T07:00:00.000Z",
			policyVersion: 1
		};
		const fetchMock = jest.spyOn(globalThis, "fetch").mockResolvedValue(createJsonResponse({
			subjectId: SUBJECT_ID,
			concepts: [createOverviewConcept(backendMastery)]
		}));
		const dataSource = new GlossaryDataSource({ baseUrl: API_BASE_URL });
		const repository = new GlossaryRepository(dataSource);
		const getGlossaryOverviewUseCase = new GetGlossaryOverviewUseCase(repository);

		const concepts = await getGlossaryOverviewUseCase.execute({ subjectId: SUBJECT_ID });
		const masteryPresentation = createGlossaryMasteryPresentation(concepts[0].mastery, masteryTranslations);

		expect(fetchMock).toHaveBeenCalledWith(`${API_BASE_URL}/subjects/${SUBJECT_ID}/glossary/overview`, {
			method: "GET",
			headers: {
				Accept: "application/json"
			}
		});
		expect(concepts[0].mastery).toEqual(backendMastery);
		expect(masteryPresentation.status).toBe(CONCEPT_MASTERY_STATUS.PRACTICE);
		expect(masteryPresentation.statusLabel).toBe("Øv mer");
		expect(masteryPresentation.scaleItems).toEqual([
			{ status: CONCEPT_MASTERY_STATUS.PRACTICE, label: "Øv mer", isActive: true },
			{ status: CONCEPT_MASTERY_STATUS.PROGRESS, label: "På vei", isActive: false },
			{ status: CONCEPT_MASTERY_STATUS.UNDERSTOOD, label: "Forstått", isActive: false }
		]);
	});

	test("propagates backend concept-practice errors through the full model stack", async () => {
		const errorPayload = {
			error: "glossary_entry_not_found",
			message: "Glossary entry not found"
		};
		jest.spyOn(globalThis, "fetch").mockResolvedValue(createJsonResponse(errorPayload, {
			ok: false,
			status: 404
		}));
		const dataSource = new ConceptPracticeDataSource({ baseUrl: API_BASE_URL, getToken: async () => "session-token" });
		const repository = new ConceptPracticeRepository(dataSource);
		const useCase = new RecordFlipcardAssessmentUseCase(repository);

		await expect(useCase.execute({
			eventId: "flip-event-missing",
			subjectId: SUBJECT_ID,
			glossaryEntryKey: "missing-concept",
			assessment: CONCEPT_MASTERY_STATUS.PRACTICE
		})).rejects.toMatchObject({
			message: "Glossary entry not found",
			status: 404,
			code: "glossary_entry_not_found",
			payload: errorPayload
		});
	});
});

function createOverviewConcept(mastery) {
	return {
		glossaryEntryKey: GLOSSARY_ENTRY_KEY,
		topicAreaKey: "begreper",
		term: { no: "Konfidensialitet", en: "Confidentiality" },
		explanation: { no: "Norsk", en: "English" },
		position: 1,
		directNeighborCount: 0,
		directNeighborGlossaryKeys: [],
		mastery
	};
}

function createEmptyResponse(status) {
	return {
		ok: status >= 200 && status < 300,
		status,
		text: async () => ""
	};
}

function createJsonResponse(payload, overrides = {}) {
	return {
		ok: true,
		status: 200,
		text: async () => JSON.stringify(payload),
		...overrides
	};
}
