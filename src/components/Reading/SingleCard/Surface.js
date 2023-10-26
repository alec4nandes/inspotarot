import { getCardSurfacePrompt } from "../../../scripts/prompts.js";
import CardImage from "../../CardImage";

export default function Surface({ card, vibe, question }) {
    const prompt = getCardSurfacePrompt({ card, vibe, question });

    return (
        <>
            <p className="slide-title">{card.name}</p>
            <div className="surface">
                <p>On the Surface</p>
                <div className="surface-info">
                    <div className="float-card">
                        <CardImage {...{ card }} />
                    </div>
                    <p>
                        <em>
                            <strong>your words:</strong>{" "}
                            {card.picked.join(", ")}
                        </em>
                    </p>
                    <p>{prompt}</p>
                </div>
            </div>
        </>
    );
}
