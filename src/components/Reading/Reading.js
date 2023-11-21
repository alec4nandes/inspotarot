import "../../css/reading.css";
import { VibeHeading } from "../Card/Card";
import SingleCard from "./SingleCard/SingleCard";
import Summary from "./Summary";

function jumper(id, e) {
    const slideElem = document.querySelector(`#${id}`);
    slideElem.scrollIntoView();
    slideElem.scrollTo({ top: 0 });
    // highlight
    const navElem = document.querySelector("nav"),
        buttons = navElem.querySelectorAll("button"),
        clickedButton = e.target;
    buttons.forEach((button) => button.classList.remove("highlight"));
    clickedButton.classList.add("highlight");
}

export default function Reading({ vibe, setVibe, question, cards }) {
    return (
        <div id="reading">
            <nav>
                <button
                    onClick={(e) => jumper(`slide-card-1`, e)}
                    className="highlight"
                >
                    1
                </button>
                <button onClick={(e) => jumper(`slide-card-2`, e)}>2</button>
                <button onClick={(e) => jumper(`slide-card-3`, e)}>3</button>
                <button onClick={(e) => jumper(`slide-card-4`, e)}>4</button>
                <button onClick={(e) => jumper(`slide-card-5`, e)}>5</button>
                <button onClick={(e) => jumper(`slide-summary`, e)}>all</button>
                <button onClick={() => setVibe(null)}>new</button>
            </nav>
            <div id="slide-container">
                {cards.map((card, i) => (
                    <div
                        id={`slide-card-${i + 1}`}
                        className="slide"
                        key={`single-card-${card.name}`}
                    >
                        <VibeHeading {...{ vibe, question }} />
                        <br />
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
