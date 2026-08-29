import { describe, expect, test } from "@jest/globals";
import { GLOSSARY_NETWORK_EDGE_ROLE, GLOSSARY_RELATION_TYPE } from "../../../src/constants/GlossaryContracts.js";
import { createGlossaryDetailGraphPresentation } from "../../../src/ui/viewmodel/GlossaryPage/glossaryDetailGraphModel.js";

describe("glossaryDetailGraphModel", () => {
	test("creates a deterministic layout for the same stable glossary identities", () => {
		const networkModel = createNetworkModel();

		expect(createGlossaryDetailGraphPresentation(networkModel)).toEqual(
			createGlossaryDetailGraphPresentation(networkModel)
		);
	});

	test("keeps node geometry stable when localized labels change", () => {
		const networkModel = createNetworkModel();
		const localizedNetworkModel = {
			...networkModel,
			center: {
				...networkModel.center,
				term: "Localized center"
			},
			nodes: networkModel.nodes.map((node) => ({
				...node,
				term: `Localized ${node.glossaryEntryKey}`
			}))
		};
		const first = createGlossaryDetailGraphPresentation(networkModel);
		const second = createGlossaryDetailGraphPresentation(localizedNetworkModel);

		expect(second.center.position).toEqual(first.center.position);
		expect(second.nodes.map((node) => node.position)).toEqual(
			first.nodes.map((node) => node.position)
		);
	});

	test("maps every edge to the positions of its stable source and target keys", () => {
		const presentation = createGlossaryDetailGraphPresentation(createNetworkModel());
		const positionByKey = new Map([
			[presentation.center.glossaryEntryKey, presentation.center.position],
			...presentation.nodes.map((node) => [node.glossaryEntryKey, node.position])
		]);

		expect(presentation.edges).toEqual([
			expect.objectContaining({
				key: "center:related:left",
				edgeRole: GLOSSARY_NETWORK_EDGE_ROLE.DIRECT,
				sourcePosition: positionByKey.get("center"),
				targetPosition: positionByKey.get("left")
			}),
			expect.objectContaining({
				key: "left:related:right",
				edgeRole: GLOSSARY_NETWORK_EDGE_ROLE.SECONDARY,
				sourcePosition: positionByKey.get("left"),
				targetPosition: positionByKey.get("right")
			})
		]);
	});
});

function createNetworkModel() {
	return {
		center: {
			glossaryEntryKey: "center",
			term: "Center",
			chapterLabel: "Kapittel 1"
		},
		nodes: [
			{
				glossaryEntryKey: "left",
				term: "Left",
				chapterLabel: "Kapittel 1"
			},
			{
				glossaryEntryKey: "right",
				term: "Right",
				chapterLabel: "Kapittel 2"
			}
		],
		edges: [
			{
				key: "center:related:left",
				sourceGlossaryEntryKey: "center",
				targetGlossaryEntryKey: "left",
				edgeRole: GLOSSARY_NETWORK_EDGE_ROLE.DIRECT,
				relationType: GLOSSARY_RELATION_TYPE.RELATED
			},
			{
				key: "left:related:right",
				sourceGlossaryEntryKey: "left",
				targetGlossaryEntryKey: "right",
				edgeRole: GLOSSARY_NETWORK_EDGE_ROLE.SECONDARY,
				relationType: GLOSSARY_RELATION_TYPE.RELATED
			}
		],
		relationItems: []
	};
}
