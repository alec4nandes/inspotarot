import { getOppositeWords } from "./data.js";

function compareCards(cards) {
    const matching = {},
        opposites = {},
        cardsWords = cards.map(({ words }) => words).flat(Infinity);
    cardsWords.forEach((word) => processWord(word, cards, matching, opposites));
    // group matching keys
    condense(matching);
    // group opposites values
    Object.values(opposites).forEach(condense);
    // group opposites keys
    condense(opposites);
    return { matching, opposites };
}

function processWord(word, cards, matching, opposites) {
    if (!matching[word]) {
        // matching
        const matchCards = getRelated(word, cards);
        matchCards.length > 1 && (matching[word] = matchCards);
        // opposites
        const oppoWords = getOppositeWords(word);
        oppoWords.forEach((oppo) => {
            const oppoCards = getRelated(oppo, cards);
            if (oppoCards.length) {
                if (opposites[oppo]) {
                    opposites[oppo][word] = matchCards;
                } else {
                    !opposites[word] &&
                        (opposites[word] = {
                            cards: matchCards,
                        });
                    opposites[word][oppo] = oppoCards;
                }
            }
        });
    }
}

function getRelated(word, cards) {
    return cards
        .filter(({ words }) => words.includes(word))
        .map(({ name }) => name);
}

function condense(obj) {
    let entries = Object.entries(obj).filter(([key]) => key !== "cards");
    entries.forEach(([outerKey, outerVal]) => {
        const keys = entries
            .filter(
                ([innerKey, innerVal]) =>
                    JSON.stringify(innerVal) === JSON.stringify(outerVal)
            )
            .map(([innerKey]) => innerKey);
        if (keys.length > 1) {
            obj[keys.sort().join(", ")] = outerVal;
            keys.forEach((key) => delete obj[key]);
        }
    });
}

export { compareCards };
