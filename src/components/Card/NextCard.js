export default function NextCard({ cards, setCards, card, picked }) {
    return (
        <>
            <p style={{ visibility: "hidden" }}>.</p>
            <div className="next-card">
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
