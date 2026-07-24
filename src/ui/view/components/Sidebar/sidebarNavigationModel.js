import { BarChart3, Home } from "lucide-react";

const SIDEBAR_ICONS = {
	"bar-chart-3": BarChart3,
	home: Home
};

export function getSidebarIcon(iconKey) {
	const Icon = SIDEBAR_ICONS[iconKey];

	if (Icon === undefined) {
		throw new Error(`Unknown sidebar icon key: ${iconKey}`);
	}

	return Icon;
}

export function shouldShowNavigationItem(item, activeScreen) {
	return item.hiddenOnScreens.includes(activeScreen) === false;
}
