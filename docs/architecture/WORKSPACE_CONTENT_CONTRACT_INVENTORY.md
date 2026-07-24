# WorkspaceScaffold content contract inventory

## Scope and method

This inventory covers every JSX consumer of `WorkspaceScaffold` in the verified frontend base. The consumer list is derived from JSX AST nodes with `@babel/parser`; similarly named props on `MobileBottomSheet` and `DockedMobileBottomSheet` are outside this contract.

For each `contentClassName`, the matching CSS selectors and declarations were traced to determine whether the value represents shared scaffold behavior, page-owned inner layout, a stable page-to-scaffold contract, or an unjustified override.

## Inventory

| Page | Current value | CSS effect | Classification | Recommended target |
|---|---|---|---|---|
| `ExamPage` | `""` | No selector and no computed class effect beyond a trailing space. | Unjustified override | Remove the prop. |
| `FlipcardsPage` | `""` | No selector and no computed class effect beyond a trailing space. | Unjustified override | Remove the prop. |
| `GlossaryPage` | `""` | No selector and no computed class effect beyond a trailing space. | Unjustified override | Remove the prop. |
| `MatchCardsPage` | `""` | No selector and no computed class effect beyond a trailing space. | Unjustified override | Remove the prop. |
| `StatisticsPage` | `""` | No selector and no computed class effect beyond a trailing space. | Unjustified override | Remove the prop. |
| `SubjectSelectPage` | `"subject-select-scroll"` | Sets page-specific padding and responsive compact-layout padding on `.workspace-scaffold-body`. It does not change shared scaffold mechanics. | Page-specific inner layout | Move the class to a wrapper inside `children`; keep scrollbar policy on the page-scaffold descendant selector. |
| `LearningContentSelectPage` | `"exam-select-scroll"` | Sets page-specific padding and responsive compact-layout padding on `.workspace-scaffold-body`. It does not change shared scaffold mechanics. | Page-specific inner layout | Move the class to a wrapper inside `children`; keep scrollbar policy on the page-scaffold descendant selector. |

## Selector evidence

### SubjectSelectPage

The selectors `.subject-select-scroll` in `workspace.css` and `responsive.css` only set `padding` or `padding-top`. The separate selectors `.subject-select-workspace .workspace-scaffold-body` own page-specific scrollbar visibility and do not depend on `contentClassName`.

### LearningContentSelectPage

The selectors `.exam-select-scroll` in `workspace.css` and `responsive.css` only set `padding`. The separate selectors `.exam-select-workspace .workspace-scaffold-body` own page-specific scrollbar visibility and do not depend on `contentClassName`.

## Conclusion

No consumer proves a reusable scaffold property or a stable semantic content variant. After the two page-owned padding classes move inside `children`, `WorkspaceScaffold` has no remaining reason to expose `contentClassName`. Patch 5B should therefore remove the prop instead of retaining a generic dynamic class escape hatch.

Page-specific descendant rules that target `.workspace-scaffold-body` through the page's outer scaffold class are not part of this prop inventory. They remain explicit page–scaffold contracts and must be evaluated on their own semantics rather than folded into a generic content variant.
