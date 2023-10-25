import Surface from "./Surface";
import Beneath from "./Beneath/Beneath";

export default function SingleCard({ card, cards, vibe, question }) {
    return (
        <div className="reading-section" key={card.name}>
            <Surface {...{ card }} />
            <Beneath {...{ card, cards, vibe, question }} />
        </div>
    );
}
