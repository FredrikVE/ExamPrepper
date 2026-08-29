// src/ui/view/components/GlossaryPage/TopicAreaPanel/topicAreaIcons.js
import {
	Book,
	BookOpen,
	Bug,
	Fingerprint,
	KeyRound,
	Leaf,
	List,
	LockKeyhole,
	Network,
	PanelsTopLeft,
	RefreshCw,
	Shield,
	ShieldCheck,
	Sparkles,
	UserCog,
	Wrench
} from "lucide-react";

const TOPIC_AREA_ICONS_BY_KEY = {
	book: Book,
	"book-open": BookOpen,
	bug: Bug,
	fingerprint: Fingerprint,
	key: KeyRound,
	leaf: Leaf,
	list: List,
	"lock-keyhole": LockKeyhole,
	network: Network,
	"panels-top-left": PanelsTopLeft,
	"refresh-cw": RefreshCw,
	shield: Shield,
	"shield-check": ShieldCheck,
	sparkles: Sparkles,
	toolbox: Wrench,
	"user-cog": UserCog
};

export function getTopicAreaIcon(iconKey) {
	const Icon = TOPIC_AREA_ICONS_BY_KEY[iconKey];

	if (Icon === undefined) {
		throw new Error(`Unknown topic area icon key: ${String(iconKey)}`);
	}

	return Icon;
}
