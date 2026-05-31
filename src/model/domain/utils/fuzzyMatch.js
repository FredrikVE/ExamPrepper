// src/model/domain/utils/fuzzyMatch.js

/**
 * Beregner Levenshtein-avstand mellom to strenger.
 * Teller minimum antall innsettinger, slettinger og
 * erstatninger som trengs for å gjøre a om til b.
 */
export function levenshteinDistance(a, b) {
    if (a === b) return 0;
    if (a.length === 0) return b.length;
    if (b.length === 0) return a.length;

    const rows = a.length + 1;
    const cols = b.length + 1;
    let previousRow = new Array(cols);

    for (let j = 0; j < cols; j++) {
        previousRow[j] = j;
    }

    for (let i = 1; i < rows; i++) {
        const currentRow = new Array(cols);
        currentRow[0] = i;

        for (let j = 1; j < cols; j++) {
            const cost = a[i - 1] === b[j - 1] ? 0 : 1;

            currentRow[j] = Math.min(
                previousRow[j] + 1,
                currentRow[j - 1] + 1,
                previousRow[j - 1] + cost
            );
        }

        previousRow = currentRow;
    }

    return previousRow[cols - 1];
}

/**
 * Maksimalt antall tillatte redigeringer basert på ordlengde.
 *
 * Korte ord (≤ 3 tegn) krever eksakt match — for lite
 * innhold til å skille en skrivefeil fra et helt feil svar.
 *
 * Lengre ord tillater 1–2 redigeringer, nok til å dekke
 * vanlige dysleksifeil (bokstavbytte, manglende bokstav,
 * ekstra bokstav, feil bokstav).
 */
export function getAllowedDistance(wordLength) {
    if (wordLength <= 3) return 0;
    if (wordLength <= 7) return 1;
    return 2;
}

/**
 * Sjekker om userAnswer er en fuzzy match mot acceptedAnswer.
 * Begge skal være normaliserte (lowercase, trimmet, uten tegnsetting).
 *
 * Returnerer true bare når svaret er nært nok til å representere
 * en skrivefeil — ikke et helt feil svar.
 */
export function isFuzzyMatch(normalizedUserAnswer, normalizedAcceptedAnswer) {
    if (!normalizedUserAnswer || !normalizedAcceptedAnswer) {
        return false;
    }

    if (normalizedUserAnswer === normalizedAcceptedAnswer) {
        return false;
    }

    const maxDistance = getAllowedDistance(normalizedAcceptedAnswer.length);

    if (maxDistance === 0) {
        return false;
    }

    const distance = levenshteinDistance(normalizedUserAnswer, normalizedAcceptedAnswer);

    return distance > 0 && distance <= maxDistance;
}
