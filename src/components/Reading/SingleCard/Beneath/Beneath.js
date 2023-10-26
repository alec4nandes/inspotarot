import { compareCards } from "../../../../scripts/compare.js";
import { getCardBeneathPrompt } from "../../../../scripts/prompts.js";
import Matching from "./Matching.js";
import Opposites from "./Opposites.js";

export default function Beneath({ card, cards, vibe, question }) {
    const { matching, opposites } = compareCards(cards),
        compare = getRelations({ card, matching, opposites }),
        prompt = getCardBeneathPrompt({
            card,
            matching: matchingHelper({ matching, card }),
            opposites: compare.opposites,
            vibe,
            question,
        });

    return (
        <div className="beneath">
            <p>Beneath the Surface</p>
            <p>
                <em>
                    <strong>all words:</strong> {card.words.join(", ")}
                </em>
            </p>
            <div className="compare">
                <Matching matching={compare.matching} />
                <Opposites opposites={compare.opposites} />
            </div>
            <p>{prompt}</p>
        </div>
    );
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
