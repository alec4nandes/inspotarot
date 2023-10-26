import { useRef } from "react";
import {
    getSummaryBeneathPrompt,
    getSummarySurfacePrompt,
} from "../../scripts/prompts.js";
import { getPatterns } from "../../scripts/patterns.js";
import { streamOpenAiResponse, getCardsId } from "../../scripts/openai.js";
import CardImage from "../CardImage";

export default function Summary({ cards, vibe, question }) {
    const patterns = getPatterns(cards);

    return (
        <div className="reading-section summary">
            <p className="slide-title">Summary</p>
            <div className="surface" style={{ minHeight: "auto" }}>
                <p>On the Surface</p>
                <div id="all-card-images">
                    {cards.map((card, i) => (
                        <div className="card-wrapper" key={`${card}-${i}`}>
                            <CardImage {...{ card }} />
                            <p>{card.picked.join(", ")}</p>
                        </div>
                    ))}
                </div>
                <AiResponse isSurface={true} />
            </div>
            <div className="beneath">
                <p>Beneath the Surface</p>
                <PatternsTable {...{ patterns }} />
                <AiResponse isSurface={false} />
            </div>
        </div>
    );

    function AiResponse({ isSurface }) {
        const ref = useRef();

        return (
            <p ref={ref} id={getCardsId(cards)}>
                <button onClick={handleGetReading}>GET READING</button>
            </p>
        );

        function handleGetReading() {
            const prompt = isSurface
                ? getSummarySurfacePrompt({ cards, vibe, question })
                : getSummaryBeneathPrompt(patterns);
            streamOpenAiResponse({
                cards,
                prompt,
                ref,
            });
        }
    }
}

function PatternsTable({ patterns }) {
    const { majors, reversed, size, ranks, suits } = patterns;

    return (
        <table id="patterns-table">
            <thead>
                <tr>
                    <th>major arcana</th>
                    <th>reversed</th>
                    {Object.keys(ranks).map((rank) => (
                        <th key={rank}>{rank.toLowerCase()}</th>
                    ))}
                    {Object.keys(suits).map((suit) => (
                        <th key={suit}>{suit.toLowerCase()}</th>
                    ))}
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>
                        {majors} / {size}
                    </td>
                    <td>
                        {reversed} / {size}
                    </td>
                    {Object.values(ranks).map((num, i) => (
                        <td key={`rank-${i}`}>
                            {num} / {size}
                        </td>
                    ))}
                    {Object.values(suits).map((num, i) => (
                        <td key={`suit-${i}`}>
                            {num} / {size}
                        </td>
                    ))}
                </tr>
            </tbody>
        </table>
    );
}
