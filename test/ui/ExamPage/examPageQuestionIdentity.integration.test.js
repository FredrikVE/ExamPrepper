//test/ui/ExamPage/examPageQuestionIdentity.integration.test.js
import fs from "node:fs";
import path from "node:path";
import { describe, expect, jest, test } from "@jest/globals";
import { parse } from "@babel/parser";
import { QUESTION_TYPES } from "../../../src/constants/QuestionTypes.js";

const EXAM_PAGE_PATH = path.resolve("src/ui/view/pages/ExamPage.jsx");
const stateByRenderKey = new Map();
let activeRenderKey = null;
let stateIndex = 0;

const useState = jest.fn((initialValue) => {
	const stateValues = stateByRenderKey.get(activeRenderKey) ?? [];
	const currentIndex = stateIndex;
	stateIndex += 1;

	if (stateValues.length <= currentIndex) {
		stateValues[currentIndex] = typeof initialValue === "function" ? initialValue() : initialValue;
		stateByRenderKey.set(activeRenderKey, stateValues);
	}

	const setValue = (nextValue) => {
		const previousValue = stateValues[currentIndex];
		stateValues[currentIndex] = typeof nextValue === "function" ? nextValue(previousValue) : nextValue;
	};

	return [stateValues[currentIndex], setValue];
});

jest.unstable_mockModule("react", () => ({ useState }));

const { useCategorySortQuestion } = await import("../../../src/ui/view/components/QuestionCard/QuestionTypes/DragDrop/CategorySort/Question/useCategorySortQuestion.js");

function renderCategorySortQuestion(question) {
	activeRenderKey = question.id;
	stateIndex = 0;

	return useCategorySortQuestion({
		question,
		answer: null,
		answerOptionOrder: null,
		submitted: false,
		showAllFeedback: false,
		onSingleAnswer: jest.fn()
	});
}

function findQuestionCardOpeningElement(ast) {
	let result = null;

	walkAst(ast, (node) => {
		if (node.type !== "JSXOpeningElement") {
			return;
		}

		if (node.name.type === "JSXIdentifier" && node.name.name === "QuestionCard") {
			result = node;
		}
	});

	return result;
}

function walkAst(node, visit) {
	if (!node || typeof node !== "object") {
		return;
	}

	visit(node);

	for (const value of Object.values(node)) {
		if (Array.isArray(value)) {
			for (const child of value) {
				walkAst(child, visit);
			}
			continue;
		}

		walkAst(value, visit);
	}
}

function createCategoryQuestion(id, itemId) {
	return {
		id,
		type: QUESTION_TYPES.DRAG_CATEGORIZE,
		categories: [{ id: `${id}-category`, label: "Kategori" }],
		items: [{ id: itemId, label: "Element", correctCategoryId: `${id}-category` }]
	};
}

describe("ExamPage QuestionCard identity", () => {
	test("binds the ViewModel render key explicitly instead of spreading it as a prop", () => {
		const source = fs.readFileSync(EXAM_PAGE_PATH, "utf8");
		const ast = parse(source, { sourceType: "module", plugins: ["jsx"] });
		const openingElement = findQuestionCardOpeningElement(ast);

		expect(openingElement).not.toBe(null);

		const keyAttribute = openingElement.attributes.find((attribute) => {
			return attribute.type === "JSXAttribute" && attribute.name.name === "key";
		});
		const modelSpread = openingElement.attributes.find((attribute) => {
			return attribute.type === "JSXSpreadAttribute";
		});

		expect(keyAttribute.value.expression.object.name).toBe("viewModel");
		expect(keyAttribute.value.expression.property.name).toBe("currentQuestionRenderKey");
		expect(modelSpread.argument.object.name).toBe("viewModel");
		expect(modelSpread.argument.property.name).toBe("questionCardModel");
	});

	test("starts CategorySort transient state clean for two consecutive questions of the same type", () => {
		stateByRenderKey.clear();
		const questionA = createCategoryQuestion("question-a", "item-a");
		const questionB = createCategoryQuestion("question-b", "item-b");

		let categorySort = renderCategorySortQuestion(questionA);
		categorySort.handleItemSelect("item-a");
		categorySort.toggleExpanded("item-a");
		categorySort = renderCategorySortQuestion(questionA);

		expect(categorySort.selectedItemId).toBe("item-a");
		expect(categorySort.expandedItemId).toBe("item-a");

		categorySort = renderCategorySortQuestion(questionB);

		expect(questionA.type).toBe(questionB.type);
		expect(categorySort.selectedItemId).toBe(null);
		expect(categorySort.expandedItemId).toBe(null);
	});
});
