import { useRef } from "react";
import { compareCards } from "../../../../scripts/compare.js";
import { getCardBeneathPrompt } from "../../../../scripts/prompts.js";
import { streamOpenAiResponse } from "../../../../scripts/openai.js";
import Matching from "./Matching.js";
import Opposites from "./Opposites.js";

export default function Beneath({ card, cards, vibe, question }) {
    const ref = useRef(),
        { matching, opposites } = compareCards(cards),
        compare = getRelations({ card, matching, opposites }),
        uuid = crypto.randomUUID();

    return (
        <div className="beneath">
            <p>Beneath the Surface</p>
            <p>
                These words are also attached to this card, lurking in your
                psychological shadow:
            </p>
            <p>
                <strong>
                    <em>{getShadowWords()}</em>
                </strong>
            </p>
            <div className="compare">
                <Matching matching={compare.matching} />
                <Opposites opposites={compare.opposites} />
            </div>
            <p ref={ref} data-id={uuid}>
                <button onClick={handleGetReading}>GET READING</button>
            </p>
        </div>
    );

    function handleGetReading() {
        const prompt = getCardBeneathPrompt({
            card,
            matching: matchingHelper({ matching, card }),
            opposites: compare.opposites,
            vibe,
            question,
        });
        streamOpenAiResponse({ uuid, prompt, ref });
    }

    function getShadowWords() {
        const { picked, words } = cards.find(({ name }) => name === card.name);
        return words.filter((word) => !picked.includes(word)).join(", ");
    }
}

function getRelations({ card, matching, opposites }) {
    const match = matchingHelper({ matching, card });
    opposites = Object.fromEntries(
        Object.entries(opposites)
            .filter(([, value]) =>
                Object.values(value).find((cards) => cards.includes(card.name))
            )
            .map(([words, value]) => {
                delete match[words];
                Object.keys(value).forEach((w) => delete match[w]);
                return [words, value];
            })
    );
    return { matching: match, opposites };
}

function matchingHelper({ matching, card }) {
    return Object.fromEntries(
        Object.entries(matching).filter(([_, cards]) =>
            cards.includes(card.name)
        )
    );
}
