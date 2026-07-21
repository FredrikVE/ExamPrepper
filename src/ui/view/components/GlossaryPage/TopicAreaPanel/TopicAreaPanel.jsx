// src/ui/view/components/GlossaryPage/TopicAreaPanel/TopicAreaPanel.jsx
import GlossarySearchField from "./GlossarySearchField.jsx";
import GlossaryTopicAreaNavigationList from "./GlossaryTopicAreaNavigationList.jsx";
import GlossaryTopicAreaSearchList from "./GlossaryTopicAreaSearchList.jsx";

export default function TopicAreaPanel({ model, actions }) {
	return (
		<aside className="glossary-topic-area-panel" aria-label={model.search.placeholder}>
			<GlossarySearchField model={model.search} actions={actions} />

			{model.navigation.kind === "search-results" ? (
				<GlossaryTopicAreaSearchList model={model.navigation} actions={actions} />
			) : (
				<GlossaryTopicAreaNavigationList model={model.navigation} actions={actions} />
			)}
		</aside>
	);
}
