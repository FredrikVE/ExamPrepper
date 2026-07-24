// src/ui/view/components/ToolCard/toolIcons.js
import { BarChart3, BookOpen, Bug, ChevronLeft, ChevronRight, Clock3, FileText, Fingerprint, GalleryHorizontalEnd, KeyRound, Leaf, List, Network, PanelsTopLeft, PieChart, Plus, RefreshCw, RotateCcw, Send, ShieldCheck, Shuffle, Sparkles, UserCog, Wrench } from "lucide-react";

const TOOL_ICONS_BY_KEY = {
	"bar-chart-3": BarChart3,
	"book-open": BookOpen,
	bug: Bug,
	"chevron-left": ChevronLeft,
	"chevron-right": ChevronRight,
	"clock-3": Clock3,
	"file-text": FileText,
	fingerprint: Fingerprint,
	"gallery-horizontal-end": GalleryHorizontalEnd,
	key: KeyRound,
	leaf: Leaf,
	list: List,
	network: Network,
	"panels-top-left": PanelsTopLeft,
	"pie-chart": PieChart,
	plus: Plus,
	"refresh-cw": RefreshCw,
	"rotate-ccw": RotateCcw,
	send: Send,
	"shield-check": ShieldCheck,
	shuffle: Shuffle,
	sparkles: Sparkles,
	toolbox: Wrench,
	"user-cog": UserCog
};

export function getToolIcon(iconKey) {
	return TOOL_ICONS_BY_KEY[iconKey] ?? List;
}
