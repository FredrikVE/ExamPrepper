// src/ui/viewmodel/GlossaryPage/glossaryDetailGraphModel.js
import { GLOSSARY_NETWORK_EDGE_ROLE } from "../../../constants/GlossaryNetworkEdgeRole.js";

const LAYOUT_ITERATION_COUNT = 260;
const DIRECT_LINK_LENGTH = 31;
const DIRECT_LINK_STRENGTH = 0.018;
const SECONDARY_LINK_LENGTH = 22;
const SECONDARY_LINK_STRENGTH = 0.034;
const NODE_REPULSION = 330;
const VELOCITY_DAMPING = 0.79;

export function createGlossaryDetailGraphPresentation(networkModel) {
	const layout = createOrganicLayout(networkModel);
	const positionByGlossaryEntryKey = new Map();

	positionByGlossaryEntryKey.set(
		networkModel.center.glossaryEntryKey,
		layout.center
	);

	for (let index = 0; index < networkModel.nodes.length; index += 1) {
		positionByGlossaryEntryKey.set(
			networkModel.nodes[index].glossaryEntryKey,
			layout.nodes[index]
		);
	}

	const nodes = networkModel.nodes.map((node) => {
		const position = requirePosition(
			positionByGlossaryEntryKey,
			node.glossaryEntryKey
		);

		return {
			glossaryEntryKey: node.glossaryEntryKey,
			term: node.term,
			chapterLabel: node.chapterLabel,
			position,
			style: createPositionStyle(position)
		};
	});

	const edges = networkModel.edges.map((edge) => ({
		key: edge.key,
		edgeRole: edge.edgeRole,
		relationType: edge.relationType,
		sourcePosition: requirePosition(
			positionByGlossaryEntryKey,
			edge.sourceGlossaryEntryKey
		),
		targetPosition: requirePosition(
			positionByGlossaryEntryKey,
			edge.targetGlossaryEntryKey
		)
	}));

	return {
		center: {
			glossaryEntryKey: networkModel.center.glossaryEntryKey,
			term: networkModel.center.term,
			chapterLabel: networkModel.center.chapterLabel,
			position: layout.center,
			style: createPositionStyle(layout.center)
		},
		nodes,
		edges,
		relationItems: networkModel.relationItems
	};
}

function createOrganicLayout(networkModel) {
	const center = {
		key: networkModel.center.glossaryEntryKey,
		x: 47 + seededNetworkUnit(`${networkModel.center.glossaryEntryKey}:center-x`) * 6,
		y: 47 + seededNetworkUnit(`${networkModel.center.glossaryEntryKey}:center-y`) * 6,
		vx: 0,
		vy: 0,
		isCenter: true
	};
	const simulationNodes = [center];

	for (let index = 0; index < networkModel.nodes.length; index += 1) {
		const node = networkModel.nodes[index];
		const baseAngle = (Math.PI * 2 * index) / Math.max(networkModel.nodes.length, 1);
		const angleJitter = (seededNetworkUnit(`${node.glossaryEntryKey}:angle`) - 0.5) * 0.9;
		const radius = 28 + seededNetworkUnit(`${node.glossaryEntryKey}:radius`) * 10;
		const horizontalScale = 1.08 + seededNetworkUnit(`${node.glossaryEntryKey}:x-scale`) * 0.18;

		simulationNodes.push({
			key: node.glossaryEntryKey,
			x: 50 + Math.cos(baseAngle + angleJitter) * radius * horizontalScale,
			y: 50 + Math.sin(baseAngle + angleJitter) * radius,
			vx: 0,
			vy: 0,
			isCenter: false
		});
	}

	const nodeIndexByKey = new Map();

	for (let index = 0; index < simulationNodes.length; index += 1) {
		nodeIndexByKey.set(simulationNodes[index].key, index);
	}

	const links = [];

	for (const node of networkModel.nodes) {
		links.push({
			source: 0,
			target: requireNodeIndex(nodeIndexByKey, node.glossaryEntryKey),
			length: DIRECT_LINK_LENGTH,
			strength: DIRECT_LINK_STRENGTH
		});
	}

	for (const edge of networkModel.edges) {
		if (edge.edgeRole !== GLOSSARY_NETWORK_EDGE_ROLE.SECONDARY) {
			continue;
		}

		links.push({
			source: requireNodeIndex(nodeIndexByKey, edge.sourceGlossaryEntryKey),
			target: requireNodeIndex(nodeIndexByKey, edge.targetGlossaryEntryKey),
			length: SECONDARY_LINK_LENGTH,
			strength: SECONDARY_LINK_STRENGTH
		});
	}

	for (let iteration = 0; iteration < LAYOUT_ITERATION_COUNT; iteration += 1) {
		applyLayoutIteration(simulationNodes, links);
	}

	return {
		center: toPosition(simulationNodes[0]),
		nodes: simulationNodes.slice(1).map(toPosition)
	};
}

function applyLayoutIteration(nodes, links) {
	const forces = nodes.map(() => ({ x: 0, y: 0 }));

	for (let first = 0; first < nodes.length; first += 1) {
		for (let second = first + 1; second < nodes.length; second += 1) {
			const left = nodes[first];
			const right = nodes[second];
			const visualDx = (right.x - left.x) * 1.34;
			const dy = right.y - left.y;
			const distanceSquared = Math.max(visualDx * visualDx + dy * dy, 18);
			const distance = Math.sqrt(distanceSquared);
			const magnitude = NODE_REPULSION / distanceSquared;
			const forceX = (visualDx / distance) * magnitude;
			const forceY = (dy / distance) * magnitude;

			forces[first].x -= forceX / 1.34;
			forces[first].y -= forceY;
			forces[second].x += forceX / 1.34;
			forces[second].y += forceY;
		}
	}

	for (const link of links) {
		const source = nodes[link.source];
		const target = nodes[link.target];
		const visualDx = (target.x - source.x) * 1.34;
		const dy = target.y - source.y;
		const distance = Math.max(Math.sqrt(visualDx * visualDx + dy * dy), 0.001);
		const stretch = distance - link.length;
		const magnitude = stretch * link.strength;
		const forceX = (visualDx / distance) * magnitude;
		const forceY = (dy / distance) * magnitude;

		forces[link.source].x += forceX / 1.34;
		forces[link.source].y += forceY;
		forces[link.target].x -= forceX / 1.34;
		forces[link.target].y -= forceY;
	}

	for (let index = 0; index < nodes.length; index += 1) {
		const node = nodes[index];
		const centerStrength = node.isCenter ? 0.022 : 0.0028;

		forces[index].x += (50 - node.x) * centerStrength;
		forces[index].y += (50 - node.y) * centerStrength;

		node.vx = (node.vx + forces[index].x) * VELOCITY_DAMPING;
		node.vy = (node.vy + forces[index].y) * VELOCITY_DAMPING;
		node.x += node.vx;
		node.y += node.vy;

		const minX = node.isCenter ? 27 : 13;
		const maxX = node.isCenter ? 73 : 87;
		const minY = node.isCenter ? 25 : 14;
		const maxY = node.isCenter ? 75 : 86;

		node.x = Math.min(maxX, Math.max(minX, node.x));
		node.y = Math.min(maxY, Math.max(minY, node.y));
	}
}

function hashNetworkSeed(value) {
	let hash = 2166136261;

	for (let index = 0; index < value.length; index += 1) {
		hash ^= value.charCodeAt(index);
		hash = Math.imul(hash, 16777619);
	}

	return hash >>> 0;
}

function seededNetworkUnit(seed) {
	let value = hashNetworkSeed(seed) || 1;

	value ^= value << 13;
	value ^= value >>> 17;
	value ^= value << 5;

	return (value >>> 0) / 4294967295;
}

function createPositionStyle(position) {
	return {
		left: `${position.x}%`,
		top: `${position.y}%`
	};
}

function toPosition(node) {
	return {
		x: Number(node.x.toFixed(2)),
		y: Number(node.y.toFixed(2))
	};
}

function requireNodeIndex(nodeIndexByKey, glossaryEntryKey) {
	const index = nodeIndexByKey.get(glossaryEntryKey);

	if (index === undefined) {
		throw new Error(`Missing glossary detail graph node: ${glossaryEntryKey}`);
	}

	return index;
}

function requirePosition(positionByGlossaryEntryKey, glossaryEntryKey) {
	const position = positionByGlossaryEntryKey.get(glossaryEntryKey);

	if (position === undefined) {
		throw new Error(`Missing glossary detail graph position: ${glossaryEntryKey}`);
	}

	return position;
}
