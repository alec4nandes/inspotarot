import { allSuitWords, getRankWords } from "./data";

function getCardSurfacePrompt({ card, vibe, question }) {
    return `How can the Tarot card ${card.name} with its meaning ${card.picked
        .map((p) => `"${p}"`)
        .join(" and ")} provide ${vibe}${
        question ? ` with the queston "${question}"` : ""
    }?`;
}

function getCardBeneathPrompt({ card, matching, opposites, vibe, question }) {
    const result =
        getCardBeneathPromptMatching({ card, matching, vibe, question }) +
        " " +
        getCardBeneathPromptOpposites({ card, opposites, vibe, question });
    return (
        result.trim() ||
        `For the Tarot card ${card.name}, I didn't pick the words "${card.words
            .filter((word) => !card.picked.includes(word))
            .join(
                ", "
            )}". What influence do these unchosen words have beneath the surface, ` +
            `especially when looking for ${vibe}${
                question ? ` with the question ${question}` : ""
            }?`
    );
}

function getCardBeneathPromptMatching({ card, matching, vibe, question }) {
    return Object.values(matching).length
        ? "Respond to this upcoming part with a maximum of 3 sentences: " +
              `The Tarot card ${card.name} shares the meaning ` +
              Object.entries(matching)
                  .map(
                      ([words, cardNames]) =>
                          `"${words}" with ${cardNames
                              .filter((name) => name !== card.name)
                              .join(" and ")}`
                  )
                  .join("; ") +
              ". How do these overlapping meanings with other cards " +
              "expand the scope of this card, " +
              `especially when looking for ${vibe}${
                  question ? ` with the question ${question}` : ""
              }?`
        : "";
}

function getCardBeneathPromptOpposites({ card, opposites, vibe, question }) {
    return Object.values(opposites).length
        ? "Respond to this upcoming part with a maximum of 3 sentences: " +
              `The Tarot card ${card.name} has the meaning ` +
              Object.entries(opposites)
                  .map(([words, value]) => {
                      const isTopLevel = value.cards.includes(card.name);
                      return (
                          (isTopLevel
                              ? `"${words}"`
                              : Object.entries(value)
                                    .filter(([_, cardNames]) =>
                                        cardNames.includes(card.name)
                                    )
                                    .map(([words]) => `"${words}"`)
                                    .join(" and ")) +
                          `, which contrasts with ${(isTopLevel
                              ? Object.entries(value).filter(
                                    ([key]) => key !== "cards"
                                )
                              : [[words, value.cards]]
                          ).map(
                              ([key, cardNames]) =>
                                  `"${key}" in ${cardNames.join(" and ")}`
                          )}`
                      );
                  })
                  .join("; ") +
              ". How do these contrasting meanings in the other cards affect this card, " +
              `especially when looking for ${vibe}${
                  question ? ` with the question ${question}` : ""
              }?`
        : "";
}

function getSummarySurfacePrompt({ cards, vibe, question }) {
    return (
        `I picked the words ${getAllWordsFromCards(cards).join(
            ", "
        )} from the Tarot cards. How can these chosen words ` +
        `provide ${vibe}${question ? ` with the question "${question}"` : ""}?`
    );
}

function getAllWordsFromCards(cards) {
    const words = cards.map(({ picked }) => picked).flat(Infinity);
    return [...new Set(words)].sort();
}

function getSummaryBeneathPrompt(patterns) {
    const { majors, reversed, size, ranks, suits } = patterns,
        hasMoreMajors = majors / size > 0.5,
        hasMoreReversed = reversed / size > 0.5;
    return (
        `For my Tarot spread, make note that there are more ${
            hasMoreMajors ? "Major" : "Minor"
        } ` +
        `Arcana cards than ${
            hasMoreMajors ? "Minor" : "Major"
        } Arcana, which means to focus more on the ${
            hasMoreMajors ? "big picture" : "small details"
        } than the ${hasMoreMajors ? "small details" : "big picture"}. ` +
        (hasMoreReversed
            ? "Make note that there are more reversed cards than upright, " +
              "which recommends approaching issues with a fresh perspective. "
            : "") +
        getRankSuitPrompt(ranks, "rank", getRankWords) +
        getRankSuitPrompt(suits, "suit", null, allSuitWords)
    );

    function getRankSuitPrompt(arr, str, fn, words) {
        return Object.entries(arr).map(
            ([item, num]) =>
                `There are ${num} cards with the ${str} ${item}, which represents ` +
                (fn ? fn(item) : words[item])
                    .map((r) => `"${r}"`)
                    .join(" and ") +
                `. How does this affect this ${size}-card reading? `
        );
    }
}

export {
    getCardSurfacePrompt,
    getCardBeneathPrompt,
    getSummarySurfacePrompt,
    getSummaryBeneathPrompt,
};
