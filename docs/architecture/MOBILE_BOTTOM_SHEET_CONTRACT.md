# Mobile bottom sheet-kontrakt

Oppdatert: 2026-07-25
Verifisert patch-base: `examprepper-frontend-safe-20260725-100551.zip`
Base-SHA-256: `c8a0abfc9f24267ffe26d3417ff9b193b21905da4b588d78d4996c7ceb9f2e47`

## Canonical eier

`DockedMobileBottomSheet` er eneste canonical UI-primitive for mobile bottom
sheets i dagens produkt. Den tidligere ukonsumerte `MobileBottomSheet.jsx` er
fjernet, slik at prosjektet ikke har en konkurrerende implementasjon.

Komponenten eier mekanikken og geometrien:

```text
DockedMobileBottomSheet
├── viewportplassering og globalt lag
├── grip, drag og snap mellom docked og åpen
├── safe-area
├── canonical peek-høyde
├── canonical grip-høyde
├── peek- og expanded-slots
├── expanded synlighet og inert-state
├── expanded scrollområde
└── reduced-motion
```

Feature-komponentene forblir separate:

```text
PageToolsMobileFooterSheet
GlossaryMobileChapterSheet
FlipcardsMobileFooterSheet
```

De eier innhold, feature-handlinger og lokal åpen-state. De eier ikke sheetets
transform, collapsed-height, grip-geometri, scroll-policy eller skjulemekanisme.

## Slot-kontrakt

```jsx
<DockedMobileBottomSheet
	isOpen={isOpen}
	onOpenChange={onOpenChange}
	contentId={contentId}
	title={title}
	subtitle={subtitle}
	openLabel={openLabel}
	closeLabel={closeLabel}
	peekLabel={peekLabel}
	peekContent={peekContent}
	expandedContent={expandedContent}
/>
```

`peekContent` er synlig både når sheetet er docked og når det er åpent.

`expandedContent` forblir montert for stabil geometri. Når sheetet er docked,
er slotten visuelt skjult, uten pointer-events, `aria-hidden` og `inert`. Når
sheetet åpnes, blir slotten synlig, interaktiv og den eneste vertikale
scrollflaten for expanded innhold.

## CSS- og token-eierskap

Bare `src/ui/style/MobileBottomSheet/` kan eie selectors med prefikset
`.mobile-bottom-sheet-`.

Feature-CSS kan style eget innhold. En feature kan sette den dokumenterte
custom property-en `--mobile-bottom-sheet-background` på sin wrapper når den
trenger en egen overflate. Den kan ikke overstyre popup, grip, transform,
overflow eller collapsed-height gjennom descendant-selectors.

Canonical dimensjoner ligger i `Tokens.css`:

```text
--mobile-sheet-peek-height
--mobile-sheet-grip-height
--mobile-sheet-content-max-width
--mobile-sheet-content-end-clearance
--mobile-sheet-top-clearance
--mobile-sheet-scroll-clearance
--mobile-sheet-scroll-reserve
```

`--mobile-sheet-top-clearance` avledes fra den canonical mobile topbaren og
et lite design-tokenisert mellomrom. Et åpent sheet begynner derfor under
headeren i stedet for å fortsette skjult bak den.

`--mobile-sheet-scroll-reserve` avledes fra canonical peek-høyde og
scroll-clearance. Lokale `--mobile-bottom-sheet-collapsed-visible-height`
overrides er ikke tillatt.

## Tilgjengelighet

Grip-knappen eksponerer `aria-expanded` og peker med `aria-controls` til
expanded-slotten. Expanded-slotten følger alltid `isOpen` med både
`aria-hidden` og `inert`. Feature-komponentene dupliserer ikke denne
mekanikken.
