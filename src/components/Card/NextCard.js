import WordNav from "./WordNav";

export default function NextCard({
    cards,
    setCards,
    card,
    picked,
    allWords,
    shownWords,
    setShownWords,
}) {
    return (
        <>
            <p>Well done!</p>
            <div className="card-buttons">
                <WordNav {...{ allWords, shownWords, setShownWords }} />
                <button onClick={handleNextCard}>
                    {cards.length < 4 ? "NEXT CARD" : "GET READING"}
                </button>
            </div>
        </>
    );

    function handleNextCard() {
        setCards((cards) => [...cards, { ...card, picked }]);
    }
}
