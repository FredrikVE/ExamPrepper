// src/ui/view/components/PageTools/PageToolsIcon.jsx
import { getToolIcon } from "../Shared/toolIcons.js";

export default function PageToolsIcon(props) {
    const Icon = getToolIcon(props.iconKey);

    return <Icon aria-hidden="true" focusable="false" />;
}
