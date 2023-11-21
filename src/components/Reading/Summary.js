import { useRef } from "react";
import {
    getSummaryBeneathPrompt,
    getSummarySurfacePrompt,
} from "../../scripts/prompts.js";
import { getPatterns } from "../../scripts/patterns.js";
import { streamOpenAiResponse } from "../../scripts/openai.js";
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
                <Patterns {...{ patterns }} />
                <AiResponse isSurface={false} />
            </div>
        </div>
    );

    function AiResponse({ isSurface }) {
        const ref = useRef(),
            uuid = crypto.randomUUID();

        return (
            <p ref={ref} data-id={uuid}>
                <button onClick={handleGetReading}>GET READING</button>
            </p>
        );

        function handleGetReading() {
            const prompt = isSurface
                ? getSummarySurfacePrompt({ cards, vibe, question })
                : getSummaryBeneathPrompt(patterns);
            streamOpenAiResponse({
                uuid,
                prompt,
                ref,
            });
        }
    }
}

function Patterns({ patterns }) {
    const { majors, reversed, size, ranks, suits } = patterns;

    return (
        <div id="patterns">
            <div>
                <div>major arcana</div>
                <div>
                    {majors} / {size}
                </div>
            </div>
            <div>
                <div>reversed</div>
                <div>
                    {reversed} / {size}
                </div>
            </div>
            {Object.entries(ranks).map(([rank, num]) => (
                <div key={rank}>
                    <div>{rank.toLowerCase()}</div>
                    <div>
                        {num} / {size}
                    </div>
                </div>
            ))}
            {Object.entries(suits).map(([suit, num]) => (
                <div key={suit}>
                    <div>{suit.toLowerCase()}</div>
                    <div>
                        {num} / {size}
                    </div>
                </div>
            ))}
        </div>
    );
}
