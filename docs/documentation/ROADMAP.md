<a href="../../README.md">← Tilbake til README</a>

---

# Videre arbeid

## Rapport: forklaringsbilder som bør legges inn i ExamPrepper i morgen

### 1. Anbefaling

Du bør ikke legge inn forklaringsbilder på absolutt alle oppgaver. Det viktigste er å legge inn bilder der modellen faktisk hjelper studenten å forstå hvorfor fasiten er riktig.

Prioriter derfor:

1. Bilder som allerede matcher `imageRef` i datasettet.
2. Bilder som forklarer sentrale modeller som ofte går igjen i eksamen.
3. Bilder som støtter casebaserte oppgaver, særlig der studenten må anvende en modell.
4. Bilder som forklarer forskjeller mellom nærliggende begreper.

---

### 2. Førsteprioritet: bilder som bør legges inn først

Dette er bildene jeg ville lagt inn først i morgen.

#### A. Sustainability — må legges inn først

Disse tre er viktigst fordi de allerede matcher datasettet og dekker sentrale eksamensmodeller.

| Prioritet | Modell | Brukes i oppgaver | Filsti |
|---:|---|---|---|
| 1 | Tre dimensjoner av bærekraft / triple bottom line | Oppgave 4 | `public/subjects/in5431/sustainability/three-dimensions/sustainability_three_dimensions.svg` |
| 2 | Dobbel vesentlighet / double materiality | Oppgave 15 og 16 | `public/subjects/in5431/sustainability/reporting/double_materiality.svg` |
| 3 | Scope 1, 2 og 3 | Oppgave 17 og 18 | `public/subjects/in5431/sustainability/reporting/scope_1_2_3.svg` |

Disse tre bør være ferdige før du lager flere sustainability-bilder.

---

#### B. Sustainability — anbefalt ekstra pakke

Hvis du rekker flere sustainability-bilder, bør du legge inn disse seks. De gir mye læring per bilde.

| Prioritet | Modell | Hvorfor den er viktig | Filsti |
|---:|---|---|---|
| 4 | Circular economy loop | Forklarer sirkulærøkonomi visuelt, ikke bare som definisjon | `public/subjects/in5431/sustainability/circular-economy/circular_economy_loop.svg` |
| 5 | Shipping: three levels | Forklarer shipping-caset som nivåmodell | `public/subjects/in5431/sustainability/shipping/shipping_three_levels.svg` |
| 6 | Shipping infrastructure layers | God modell for å forstå infrastruktur og governance i shipping-caset | `public/subjects/in5431/sustainability/shipping/shipping_infrastructure_layers.svg` |
| 7 | Regulation to governance | Binder regulering, data, systemkontroll og IT governance sammen | `public/subjects/in5431/sustainability/reporting/regulation_to_governance.svg` |
| 8 | Twin transitions | Binder digital transformasjon og bærekraft sammen | `public/subjects/in5431/sustainability/twin-transitions/twin_transitions.svg` |
| 9 | Digital Product Passport | Veldig god case-modell for sirkulærøkonomi, materialdata og livsløp | `public/subjects/in5431/sustainability/circular-economy/digital_product_passport.svg` |

---

### 3. Digital strategy — bilder som bør legges inn

Bildene for digital strategy skal ligge her:

```txt
public/subjects/in5431/strategy/digital-strategy/
```

Bruk samme navn som `imageId` + `.png`.

Eksempel:

```txt
imageId: "digital_strategy_definition"
fil:     digital_strategy_definition.png
```

---

#### A. Digital strategy — minimumspakke

Dette er bildene jeg ville prioritert først for Digital Strategy-settet.

| Prioritet | Modell / forklaringsbilde | Brukes i oppgaver | Filnavn |
|---:|---|---:|---|
| 1 | Digital strategy definition | 1 og 3 | `digital_strategy_definition.png` |
| 2 | Content of a digital strategy | 4 | `digital_strategy_content.png` |
| 3 | Macro–meso–micro impact model | 5 | `macro_meso_micro_impact.png` |
| 4 | Digital transformation definition | 7 | `digital_transformation_definition.png` |
| 5 | Digital transformation is not only technology | 7 | `digital_transformation_not_only_technology.png` |
| 6 | Digital transformation process | 8 | `digital_transformation_process.png` |
| 7 | Barriers to digital transformation | 11 og 12 | `digital_transformation_barriers.png` |
| 8 | Culture for digitalization | 12 | `culture_for_digitalization.png` |
| 9 | Organizational inertia definition | 14 | `organizational_inertia_definition.png` |
| 10 | Organizational inertia levels | 15 | `organizational_inertia_levels.png` |
| 11 | Addressing inertia | 16 | `addressing_inertia.png` |
| 12 | Leadership role in digital transformation | 17 | `leadership_role_digital_transformation.png` |
| 13 | CDO roles | 18 og 20 | `cdo_roles.png` |
| 14 | CDO contribution | 18 og 20 | `cdo_contribution.png` |
| 15 | Whole organization involvement | 19 | `whole_organization_involvement.png` |
| 16 | Organization as network of groups | 19 | `organization_as_network_groups.png` |

Dette er den viktigste pakken fordi den dekker definisjon, transformasjon, barrierer, kultur, inertia, leadership og CDO.

---

#### B. Digital strategy — andreprioritet

Disse er nyttige, men ikke like kritiske som minimumspakken.

| Prioritet | Modell / forklaringsbilde | Brukes i oppgaver | Filnavn |
|---:|---|---:|---|
| 17 | Business strategy vs IT-strategy vs Digital strategy | 2 | `business_it_digital_strategy_example.png` |
| 18 | Leader questions about digital technology | 6 | `digital_technology_leader_questions.png` |
| 19 | Nordic Choice / Strawberry chronology | 9 | `nordic_choice_chronology.png` |
| 20 | Digital guest journey | 9 | `digital_guest_journey.png` |
| 21 | Digital transformation conclusions | 10 | `digital_transformation_conclusions.png` |
| 22 | Culture as barrier | 13 | `culture_as_barrier.png` |
| 23 | Individual inertia | 15 | `individual_inertia.png` |

Merk: Den tidligere oversikten sa “18 unike forklaringsbilder”, men listen inneholder egentlig 23 unike filnavn. For morgendagens arbeid bør du derfor ikke prøve å lage alle hvis tiden er knapp. Start med minimumspakken på 16.

---

### 4. Samlet anbefalt arbeidsplan for i morgen

#### Fase 1 — Må være på plass først

Legg inn disse bildene først:

```txt
public/subjects/in5431/sustainability/three-dimensions/sustainability_three_dimensions.svg
public/subjects/in5431/sustainability/reporting/double_materiality.svg
public/subjects/in5431/sustainability/reporting/scope_1_2_3.svg
```

Deretter:

```txt
public/subjects/in5431/strategy/digital-strategy/digital_strategy_definition.png
public/subjects/in5431/strategy/digital-strategy/digital_strategy_content.png
public/subjects/in5431/strategy/digital-strategy/macro_meso_micro_impact.png
public/subjects/in5431/strategy/digital-strategy/digital_transformation_definition.png
public/subjects/in5431/strategy/digital-strategy/digital_transformation_not_only_technology.png
public/subjects/in5431/strategy/digital-strategy/digital_transformation_process.png
public/subjects/in5431/strategy/digital-strategy/digital_transformation_barriers.png
public/subjects/in5431/strategy/digital-strategy/culture_for_digitalization.png
public/subjects/in5431/strategy/digital-strategy/organizational_inertia_definition.png
public/subjects/in5431/strategy/digital-strategy/organizational_inertia_levels.png
public/subjects/in5431/strategy/digital-strategy/addressing_inertia.png
public/subjects/in5431/strategy/digital-strategy/leadership_role_digital_transformation.png
public/subjects/in5431/strategy/digital-strategy/cdo_roles.png
public/subjects/in5431/strategy/digital-strategy/cdo_contribution.png
public/subjects/in5431/strategy/digital-strategy/whole_organization_involvement.png
public/subjects/in5431/strategy/digital-strategy/organization_as_network_groups.png
```

Dette gir deg en solid første versjon.

---

#### Fase 2 — Bør legges inn hvis du rekker mer

```txt
public/subjects/in5431/sustainability/circular-economy/circular_economy_loop.svg
public/subjects/in5431/sustainability/shipping/shipping_three_levels.svg
public/subjects/in5431/sustainability/shipping/shipping_infrastructure_layers.svg
public/subjects/in5431/sustainability/reporting/regulation_to_governance.svg
public/subjects/in5431/sustainability/twin-transitions/twin_transitions.svg
public/subjects/in5431/sustainability/circular-economy/digital_product_passport.svg
```

Og for digital strategy:

```txt
public/subjects/in5431/strategy/digital-strategy/business_it_digital_strategy_example.png
public/subjects/in5431/strategy/digital-strategy/digital_technology_leader_questions.png
public/subjects/in5431/strategy/digital-strategy/nordic_choice_chronology.png
public/subjects/in5431/strategy/digital-strategy/digital_guest_journey.png
public/subjects/in5431/strategy/digital-strategy/digital_transformation_conclusions.png
public/subjects/in5431/strategy/digital-strategy/culture_as_barrier.png
public/subjects/in5431/strategy/digital-strategy/individual_inertia.png
```

---

### 5. Forslått mappestruktur

Etter i morgen bør du minst ha dette:

```txt
public/
└── subjects/
    └── in5431/
        ├── sustainability/
        │   ├── three-dimensions/
        │   │   └── sustainability_three_dimensions.svg
        │   ├── reporting/
        │   │   ├── double_materiality.svg
        │   │   ├── scope_1_2_3.svg
        │   │   └── regulation_to_governance.svg
        │   ├── circular-economy/
        │   │   ├── circular_economy_loop.svg
        │   │   └── digital_product_passport.svg
        │   ├── shipping/
        │   │   ├── shipping_three_levels.svg
        │   │   └── shipping_infrastructure_layers.svg
        │   └── twin-transitions/
        │       └── twin_transitions.svg
        │
        └── strategy/
            └── digital-strategy/
                ├── digital_strategy_definition.png
                ├── digital_strategy_content.png
                ├── macro_meso_micro_impact.png
                ├── digital_transformation_definition.png
                ├── digital_transformation_not_only_technology.png
                ├── digital_transformation_process.png
                ├── digital_transformation_barriers.png
                ├── culture_for_digitalization.png
                ├── organizational_inertia_definition.png
                ├── organizational_inertia_levels.png
                ├── addressing_inertia.png
                ├── leadership_role_digital_transformation.png
                ├── cdo_roles.png
                ├── cdo_contribution.png
                ├── whole_organization_involvement.png
                └── organization_as_network_groups.png
```

---

### 6. Praktiske regler når bildene legges inn

Bruk disse reglene konsekvent:

1. Filnavn skal være identisk med `imageId`, bare med filendelse.
2. Bruk `snake_case`, ikke mellomrom.
3. Ikke bruk norske æ/ø/å i filnavn.
4. Ikke bland store og små bokstaver.
5. Bruk `.svg` for enkle egenlagde modeller.
6. Bruk `.png` hvis bildet er eksportert fra slide/PDF eller tegneverktøy.
7. Hvis appens bilde-loader bare støtter én filtype, eksporter alle til samme type.
8. Test i UI etterpå at forklaringsbildet faktisk dukker opp i feedback/whyExtended-visningen.

---

### 7. Konklusjon

Morgendagens beste plan er:

1. Legg inn de tre viktigste sustainability-bildene:
   - `sustainability_three_dimensions.svg`
   - `double_materiality.svg`
   - `scope_1_2_3.svg`

2. Legg inn digital strategy minimumspakken på 16 bilder.

3. Legg deretter inn de seks ekstra sustainability-bildene hvis du rekker det.

4. Ikke bruk tid på alle valgfrie bilder først. De gir mindre læringseffekt enn modellene som forklarer sentrale eksamensbegreper.

Hvis du bare rekker 10 bilder totalt, velg disse:

```txt
sustainability_three_dimensions.svg
double_materiality.svg
scope_1_2_3.svg
digital_strategy_definition.png
digital_strategy_content.png
macro_meso_micro_impact.png
digital_transformation_definition.png
digital_transformation_process.png
digital_transformation_barriers.png
cdo_roles.png
```


