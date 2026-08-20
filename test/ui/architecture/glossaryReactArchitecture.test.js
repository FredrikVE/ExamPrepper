// test/ui/architecture/glossaryReactArchitecture.test.js
import fs from "node:fs";
import path from "node:path";
import { describe, expect, test } from "@jest/globals";

const GLOSSARY_COMPONENT_DIRECTORY = path.resolve("src/ui/view/components/GlossaryPage");
const GLOSSARY_PAGE_PATH = path.resolve("src/ui/view/pages/GlossaryPage.jsx");
const GLOSSARY_VIEWMODEL_PATH = path.resolve("src/ui/viewmodel/GlossaryPageViewModel.js");
const GLOSSARY_PANEL_PATH = path.resolve("src/ui/view/components/GlossaryPage/GlossaryPanel/GlossaryPanel.jsx");
const GLOSSARY_TABLE_PATH = path.resolve("src/ui/view/components/GlossaryPage/GlossaryPanel/GlossaryTable.jsx");
const GLOSSARY_TABLE_ROW_PATH = path.resolve("src/ui/view/components/GlossaryPage/GlossaryPanel/GlossaryTableRow.jsx");
const GLOSSARY_DETAIL_CONTENT_PATH = path.resolve("src/ui/view/components/GlossaryPage/DetailModal/GlossaryDetailContent.jsx");
const GLOSSARY_ENTRY_CARD_LIST_PATH = path.resolve("src/ui/view/components/GlossaryPage/GlossaryPanel/GlossaryEntryCardList.jsx");
const GLOSSARY_MOBILE_CHAPTER_SHEET_PATH = path.resolve("src/ui/view/components/GlossaryPage/MobileChapterSheet/GlossaryMobileChapterSheet.jsx");
const GLOSSARY_FOOTER_PATH = path.resolve("src/ui/view/components/GlossaryPage/GlossaryFooter/GlossaryFooter.jsx");
const GLOSSARY_TOPIC_AREA_BUTTON_PATH = path.resolve("src/ui/view/components/GlossaryPage/TopicAreaPanel/GlossaryTopicAreaButton.jsx");
const CONCEPT_NETWORK_PATH = path.resolve("src/ui/view/components/GlossaryPage/ConceptNetwork/ConceptNetwork.jsx");

const readSource = (filePath) => fs.readFileSync(filePath, "utf8");

function collectJsxFiles(directory) {
	const files = [];

	for (const entry of fs.readdirSync(directory, { withFileTypes: true })) {
		const entryPath = path.join(directory, entry.name);
		if (entry.isDirectory()) {
			files.push(...collectJsxFiles(entryPath));
		} else if (entry.name.endsWith(".jsx")) {
			files.push(entryPath);
		}
	}

	return files;
}

describe("Glossary React architecture", () => {
	test("keeps glossary rendering declarative without manual DOM mutation", () => {
		for (const filePath of [GLOSSARY_PAGE_PATH, ...collectJsxFiles(GLOSSARY_COMPONENT_DIRECTORY)]) {
			const source = readSource(filePath);
			expect(source).not.toMatch(/document\.|querySelector|innerHTML|insertAdjacentHTML|dangerouslySetInnerHTML/);
		}
	});

	test("keeps GlossaryPage-specific UI mechanics out of the View layer", () => {
		const pageSource = readSource(GLOSSARY_PAGE_PATH);

		for (const filePath of collectJsxFiles(GLOSSARY_COMPONENT_DIRECTORY)) {
			const source = readSource(filePath);
			expect(source).not.toMatch(/\buseState\b|\buseEffect\b|\buseRef\b|\buseMemo\b|\buseCallback\b/);
			expect(source).not.toMatch(/stopPropagation|preventDefault|scrollIntoView|addEventListener/);
		}

		expect(pageSource).not.toContain("usePresentationMode");
		expect(pageSource).not.toContain("useAppShellMode");
		expect(pageSource).not.toMatch(/stopPropagation|preventDefault|scrollIntoView|addEventListener/);
	});

	test("renders table rows from prepared callbacks instead of local interaction policy", () => {
		const tableSource = readSource(GLOSSARY_TABLE_PATH);
		const rowSource = readSource(GLOSSARY_TABLE_ROW_PATH);
		const cardSource = readSource(GLOSSARY_ENTRY_CARD_LIST_PATH);
		const topicAreaButtonSource = readSource(GLOSSARY_TOPIC_AREA_BUTTON_PATH);

		expect(tableSource).not.toContain("GLOSSARY_TABLE_SORT_DIRECTIONS");
		expect(tableSource).not.toContain("onSort(");
		expect(rowSource).toContain("onClick={row.onActivate}");
		expect(rowSource).toContain("onClick={row.detailTrigger.onActivate}");
		expect(rowSource).toContain("ref={row.detailTrigger.ref}");
		expect(rowSource).toContain('aria-haspopup="dialog"');
		expect(rowSource).not.toContain("row.disclosure");
		expect(rowSource).not.toMatch(/stopPropagation|preventDefault|event\.key|toggleNetwork/);
		expect(cardSource).toContain("onClick={row.mobileDisclosure.onActivate}");
		expect(cardSource).toContain("onKeyDown={row.mobileDisclosure.onKeyDown}");
		expect(cardSource).toContain("ref={row.mobileDisclosure.ref}");
		expect(cardSource).not.toContain("onOpenNetwork(row.glossaryEntryKey)");
		expect(topicAreaButtonSource).toContain("onClick={item.onActivate}");
		expect(topicAreaButtonSource).not.toContain("onSelectTopicArea");
	});

	test("uses one detail presentation pipeline while keeping the mobile expanded card", () => {
		const panelSource = readSource(GLOSSARY_PANEL_PATH);
		const detailContentSource = readSource(GLOSSARY_DETAIL_CONTENT_PATH);
		const cardSource = readSource(GLOSSARY_ENTRY_CARD_LIST_PATH);

		expect(fs.existsSync(path.resolve("src/ui/view/components/GlossaryPage/GlossaryPanel/GlossaryEntryDetails.jsx"))).toBe(false);
		expect(cardSource).toContain("<GlossaryDetailContent model={detailPresentation} isInteractive={false} />");
		expect(cardSource).toContain("aria-controls={row.mobileDisclosure.controlsId}");
		expect(cardSource).toContain("id={row.detailsId}");
		expect(cardSource).not.toMatch(/\brow\.details\b/);
		expect(detailContentSource).toContain("<GlossaryDetailNetworkSection");
		expect(panelSource).not.toContain("networkDisplay");
	});

	test("cuts desktop detail rendering over from inline rows to the modal sheet", () => {
		const pageSource = readSource(GLOSSARY_PAGE_PATH);
		const tableSource = readSource(GLOSSARY_TABLE_PATH);
		const rowSource = readSource(GLOSSARY_TABLE_ROW_PATH);

		expect(pageSource).toContain("<GlossaryDetailModal model={viewModel.glossaryDetailModal} />");
		expect(tableSource).not.toContain("GlossaryTableDetails");
		expect(tableSource).not.toMatch(/\brow\.details\b/);
		expect(rowSource).toContain('className="glossary-table__detail-trigger"');
		expect(rowSource).not.toContain("aria-expanded");
		expect(rowSource).not.toContain("aria-controls");
	});

	test("locks the desktop modal cutover without Search or visualization-library creep", () => {
		const pageSource = readSource(GLOSSARY_PAGE_PATH);
		const viewModelSource = readSource(GLOSSARY_VIEWMODEL_PATH);
		const glossarySources = [pageSource, viewModelSource];

		for (const filePath of collectJsxFiles(GLOSSARY_COMPONENT_DIRECTORY)) {
			glossarySources.push(readSource(filePath));
		}

		const combinedSource = glossarySources.join("\n");
		expect(pageSource).toContain("<GlossaryDetailModal model={viewModel.glossaryDetailModal} />");
		expect(viewModelSource).not.toMatch(/useState\([^\n]*isModalOpen|setIsModalOpen|ModalManager|GlossaryModalContext|ModalService/);
		expect(combinedSource).not.toMatch(/ReactFlow|react-flow|reactflow|Recharts|recharts/);
	});

	test("keeps graph-node activation prepared by the ViewModel", () => {
		const source = readSource(CONCEPT_NETWORK_PATH);

		expect(source).toContain("onClick={node.onActivate}");
		expect(source).not.toContain("onSelectConcept");
		expect(source).not.toMatch(/onClick=\{\(\) =>/);
	});

	test("uses the app-shell contract to switch Glossary footer chrome without switching feature presentation", () => {
		const pageSource = readSource(GLOSSARY_PAGE_PATH);
		const footerSource = readSource(GLOSSARY_FOOTER_PATH);

		expect(pageSource).toContain("usesCompactShell={viewModel.usesCompactShell}");
		expect(pageSource).toContain("!viewModel.usesCompactShell");
		expect(pageSource).toContain("isMobile={isMobile}");
		expect(footerSource).toContain("usesCompactShell ? (");
		expect(footerSource).toContain("<GlossaryMobileChapterSheet");
		expect(footerSource).toContain("<Footer");
	});

	test("keeps mobile chapter-sheet open state out of the component", () => {
		const source = readSource(GLOSSARY_MOBILE_CHAPTER_SHEET_PATH);

		expect(source).toContain("isOpen={isOpen}");
		expect(source).toContain("onOpenChange={onOpenChange}");
		expect(source).not.toContain("useState");
		expect(source).not.toContain("setIsOpen");
	});

	test("keeps SVG visual edges aria-hidden while graph nodes remain React controls", () => {
		const source = readSource(CONCEPT_NETWORK_PATH);

		expect(source).toContain('className="concept-network__edges"');
		expect(source).toContain('aria-hidden="true"');
		expect(source).toContain("<button");
		expect(source).not.toMatch(/ReactFlow|react-flow|reactflow/);
	});
});
