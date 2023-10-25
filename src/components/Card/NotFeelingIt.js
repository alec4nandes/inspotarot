import {
    getRandomCardName,
    getCard,
    flipCardName,
    getUprightCardName,
} from "../../scripts/data.js";

export default function NotFeelingIt({
    allWords,
    setAllWords,
    setCard,
    shownWords,
    cards,
}) {
    return (
        <>
            <p>Not feeling it?</p>
            <div className="not-feeling-it">
                <button onClick={handleFlipCard}>FLIP CARD</button>
                {hasMoreWords() && (
                    <button onClick={handleMoreWords}>MORE WORDS</button>
                )}
                <button onClick={handleNewCard}>NEW CARD</button>
            </div>
        </>
    );

    function hasMoreWords() {
        return !!filterWords().length;
    }

    function filterWords() {
        return allWords.filter((word) => !shownWords.includes(word));
    }

    function handleFlipCard() {
        setCard((card) => getCard(flipCardName(card.name)));
    }

    function handleMoreWords() {
        setAllWords(filterWords);
    }

    function handleNewCard() {
        setCard(getCard(getDifferentCardName(cards)));
    }
}

function getDifferentCardName(cards) {
    const drawn = cards.map(({ name }) => getUprightCardName(name));
    let randomCardName = getRandomCardName();
    while (drawn.includes(getUprightCardName(randomCardName))) {
        randomCardName = getRandomCardName();
    }
    return randomCardName;
}

export { getDifferentCardName };
