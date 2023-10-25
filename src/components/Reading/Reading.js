import "../../css/reading.css";
import SingleCard from "./SingleCard/SingleCard";
import Summary from "./Summary";

export default function Reading({ vibe, setVibe, question, cards }) {
    return (
        <div id="reading">
            {cards.map((card) => (
                <SingleCard
                    {...{
                        card,
                        cards,
                        vibe,
                        question,
                        key: `single-card-${card.name}`,
                    }}
                />
            ))}
            <Summary {...{ cards, vibe, question }} />
            <button onClick={() => setVibe(null)}>NEW SPREAD</button>
        </div>
    );
}
