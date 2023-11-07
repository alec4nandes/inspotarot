import { useRef } from "react";
import { getCardSurfacePrompt } from "../../../scripts/prompts.js";
import { streamOpenAiResponse, getCardsId } from "../../../scripts/openai.js";
import CardImage from "../../CardImage";

export default function Surface({ card, vibe, question, cards }) {
    const ref = useRef();

    return (
        <>
            <p className="slide-title">{card.name}</p>
            <div className="surface">
                <p>On the Surface</p>
                <div className="surface-info">
                    <div className="float-card">
                        <CardImage {...{ card }} />
                    </div>
                    <p className="your-words">
                        <em>
                            <strong>
                                You were consciously drawn to these words:
                            </strong>{" "}
                            {card.picked.join(", ")}
                        </em>
                    </p>
                    <p ref={ref} id={getCardsId(cards)}>
                        <button onClick={handleGetReading}>GET READING</button>
                    </p>
                </div>
            </div>
        </>
    );

    function handleGetReading() {
        const prompt = getCardSurfacePrompt({ card, vibe, question });
        streamOpenAiResponse({ cards, prompt, ref });
    }
}
