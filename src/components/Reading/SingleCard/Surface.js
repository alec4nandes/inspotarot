import { useRef } from "react";
import { getCardSurfacePrompt } from "../../../scripts/prompts.js";
import { streamOpenAiResponse } from "../../../scripts/openai.js";
import CardImage from "../../CardImage";

export default function Surface({ card, vibe, question }) {
    const ref = useRef(),
        uuid = crypto.randomUUID();

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
                    <p ref={ref} data-id={uuid}>
                        <button onClick={handleGetReading}>GET READING</button>
                    </p>
                </div>
            </div>
        </>
    );

    function handleGetReading() {
        const prompt = getCardSurfacePrompt({ card, vibe, question });
        streamOpenAiResponse({ uuid, prompt, ref });
    }
}
