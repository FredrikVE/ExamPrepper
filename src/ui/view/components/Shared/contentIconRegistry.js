// src/ui/view/components/Shared/contentIconRegistry.js
import { BarChart3, Book, BookOpen, Bug, ChevronLeft, ChevronRight, Clock3, FileText, Fingerprint, GalleryHorizontalEnd, KeyRound, Leaf, List, LockKeyhole, Network, PanelsTopLeft, PieChart, Plus, RefreshCw, RotateCcw, Send, Shield, ShieldCheck, Shuffle, Sparkles, UserCog, Wrench } from "lucide-react";
import { CONTENT_ICON_FALLBACK_KEY, CONTENT_ICON_KEYS } from "../../../../constants/ContentIconKeys.js";

const CONTENT_ICONS_BY_KEY = Object.freeze({
	[CONTENT_ICON_KEYS.BAR_CHART_3]: BarChart3,
	[CONTENT_ICON_KEYS.BOOK]: Book,
	[CONTENT_ICON_KEYS.BOOK_OPEN]: BookOpen,
	[CONTENT_ICON_KEYS.BUG]: Bug,
	[CONTENT_ICON_KEYS.CHEVRON_LEFT]: ChevronLeft,
	[CONTENT_ICON_KEYS.CHEVRON_RIGHT]: ChevronRight,
	[CONTENT_ICON_KEYS.CLOCK_3]: Clock3,
	[CONTENT_ICON_KEYS.FILE_TEXT]: FileText,
	[CONTENT_ICON_KEYS.FINGERPRINT]: Fingerprint,
	[CONTENT_ICON_KEYS.GALLERY_HORIZONTAL_END]: GalleryHorizontalEnd,
	[CONTENT_ICON_KEYS.KEY]: KeyRound,
	[CONTENT_ICON_KEYS.LEAF]: Leaf,
	[CONTENT_ICON_KEYS.LIST]: List,
	[CONTENT_ICON_KEYS.LOCK_KEYHOLE]: LockKeyhole,
	[CONTENT_ICON_KEYS.NETWORK]: Network,
	[CONTENT_ICON_KEYS.PANELS_TOP_LEFT]: PanelsTopLeft,
	[CONTENT_ICON_KEYS.PIE_CHART]: PieChart,
	[CONTENT_ICON_KEYS.PLUS]: Plus,
	[CONTENT_ICON_KEYS.REFRESH_CW]: RefreshCw,
	[CONTENT_ICON_KEYS.ROTATE_CCW]: RotateCcw,
	[CONTENT_ICON_KEYS.SEND]: Send,
	[CONTENT_ICON_KEYS.SHIELD]: Shield,
	[CONTENT_ICON_KEYS.SHIELD_CHECK]: ShieldCheck,
	[CONTENT_ICON_KEYS.SHUFFLE]: Shuffle,
	[CONTENT_ICON_KEYS.SPARKLES]: Sparkles,
	[CONTENT_ICON_KEYS.TOOLBOX]: Wrench,
	[CONTENT_ICON_KEYS.USER_COG]: UserCog
});

export function getContentIcon(iconKey) {
	return CONTENT_ICONS_BY_KEY[iconKey] ?? CONTENT_ICONS_BY_KEY[CONTENT_ICON_FALLBACK_KEY];
}
