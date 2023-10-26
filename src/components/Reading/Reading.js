import "../../css/reading.css";
import SingleCard from "./SingleCard/SingleCard";
import Summary from "./Summary";

function jumper(id) {
    const elem = document.querySelector(`#${id}`);
    elem.scrollIntoView();
    elem.scrollTo({ top: 0 });
}

export default function Reading({ vibe, setVibe, question, cards }) {
    return (
        <div id="reading">
            <nav>
                <button onClick={() => jumper(`slide-card-1`)}>1</button>
                <button onClick={() => jumper(`slide-card-2`)}>2</button>
                <button onClick={() => jumper(`slide-card-3`)}>3</button>
                <button onClick={() => jumper(`slide-card-4`)}>4</button>
                <button onClick={() => jumper(`slide-card-5`)}>5</button>
                <button onClick={() => jumper(`slide-summary`)}>all</button>
                <button onClick={() => setVibe(null)}>new</button>
            </nav>
            <div id="slide-container">
                {cards.map((card, i) => (
                    <div
                        id={`slide-card-${i + 1}`}
                        className="slide"
                        key={`single-card-${card.name}`}
                    >
                        <SingleCard
                            {...{
                                card,
                                cards,
                                vibe,
                                question,
                            }}
                        />
                    </div>
                ))}
                <div id="slide-summary" className="slide">
                    <Summary {...{ cards, vibe, question }} />
                </div>
            </div>
        </div>
    );
}
