# Stacking-context inventory

## Verified base and method

The inventory is based on the verified zip snapshot and covers all 93 `z-index` declarations in `src/ui/style`, the React composition tree, positioning/stacking-context declarations, and root mounting.

Static verification found one React root (`#root`) and no `createPortal` use. Overlays are composed inline. The desktop settings surface is a native `<dialog>` opened through its dialog interaction hook and therefore participates in the browser top layer rather than competing only through document `z-index`.

Browser DevTools verification remains a final-QA item because dependency installation is currently blocked by the package gateway. No relationship below is claimed solely from numeric magnitude; each centralized candidate has a source/tree relationship.

## Root and sibling tree

```text
#root
└── ClerkAppProvider
    └── ThemeProvider
        └── LanguageProvider
            └── SettingsProvider
                └── AppContent
                    └── page shell
                        ├── DesktopSideBar
                        ├── MobileDropDownTopBar
                        │   ├── mobile topbar
                        │   ├── mobile dropdown backdrop
                        │   └── mobile dropdown panel
                        ├── active Page
                        │   └── WorkspaceScaffold
                        │       ├── header slot
                        │       ├── body
                        │       ├── footer-overlay slot
                        │       └── overlay slot
                        └── SettingsPresentation
                            └── native dialog (desktop only)
```

No overlay is mounted directly under `document.body` by application code.

## Proven cross-component relationships

| Participant | Current value | Parent/context | Proven relationship | 7B decision |
|---|---:|---|---|---|
| `.workspace-scaffold` | `1` | page shell | Establishes the content context below fixed app navigation. | Centralize as app-content token. |
| `.scaffold-header` | `30` | WorkspaceScaffold | Must stay above scaffold body, but below scaffold overlays. Header is canonical app-shell UI. | Centralize as scaffold-header token. |
| `.search-backdrop` | `40` | scaffold overlay slot | Must cover body/header interaction while remaining below the footer sheet and its controls. | Keep centralized shared token. |
| `.workspace-scaffold-footer-overlay` / `.footer-open` | `50` | WorkspaceScaffold | Shared footer-overlay owner for select, exam, glossary and flipcard surfaces. | Keep centralized shared token. |
| select search controls | `60` | footer overlay | Must remain interactive above the search backdrop and footer surface. | Keep centralized shared token. |
| `.mobile-bottom-sheet-root` | `71` | shared DockedMobileBottomSheet | Docked sheet remains above footer/search surfaces and below app navigation. | Centralize as docked-sheet token. |
| `.mobile-dropdown-backdrop` | `80` | AppNavigation root siblings | Must cover app content and remain below the dropdown panel/topbar. | Centralize as navigation-backdrop token. |
| `.mobile-dropdown` | `90` | AppNavigation root siblings | Must cover app content/backdrop and remain below the persistent topbar. | Centralize as navigation-panel token. |
| `.mobile-topbar` | `100` | AppNavigation root sibling | Must remain above mobile navigation panel and page overlays. | Centralize as mobile-topbar token. |
| `.exam-submit-confirmation-overlay` | `110` | WorkspaceScaffold overlay | Must cover all exam interaction surfaces during explicit submit confirmation. | Keep centralized action-confirmation token. |
| `.settings-sidebar` | `130` | native dialog/top layer | Native dialog is the top recovery/settings surface. The token documents the participant but is not relied on to escape the top layer. | Centralize as settings-dialog token. |

## Deliberately local stacking contexts

The remaining declarations are local to component internals and retain local numbers. Examples include card pseudo-elements (`-2` through `4`), drag-and-drop internals, flipcard edge actions and preview layers, subject/exam card action layers, sticky table headings, and the three-layer `DesktopPopOutMenu` contract (`81`, `82`, `83`).

`DesktopPopOutMenu` uses three values to order trigger, backdrop and panel inside the component. Its values are not promoted merely because they numerically overlap app-navigation values. Likewise, local component internals such as feedback toast (`14`) remain local because their effective order is constrained by their component stacking context. Docked-sheet feature wrappers no longer own competing app-layer values.

## Defect assessment

Static source/tree inspection did not prove an ordering defect. Patch 7C is therefore not created unless browser QA later demonstrates a reproducible failure. Numeric inconsistency alone is not a defect.
