import { getCard, flipCardName } from "../../scripts/data.js";
import { getDifferentCardName } from "./Card";
import WordNav from "./WordNav";

export default function NotFeelingIt({
    allWords,
    cards,
    setCard,
    shownWords,
    setShownWords,
}) {
    return (
        <>
            <p>Not feeling it?</p>
            <div className="card-buttons">
                <button onClick={handleFlipCard}>FLIP CARD</button>
                <WordNav {...{ allWords, shownWords, setShownWords }} />
                <button onClick={handleNewCard}>NEW CARD</button>
            </div>
        </>
    );

    function handleFlipCard() {
        setCard((card) => getCard(flipCardName(card.name)));
    }

    function handleNewCard() {
        setCard(getCard(getDifferentCardName(cards)));
    }
}
