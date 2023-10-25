export default function WordButtons({ shownWords, picked, setPicked }) {
    return (
        <ul className="word-buttons">
            {shownWords.map((word) => (
                <li key={word}>
                    <button
                        className={picked.includes(word) ? "picked" : ""}
                        onClick={handleClickWord}
                    >
                        {word}
                    </button>
                </li>
            ))}
        </ul>
    );

    function handleClickWord(e) {
        const word = e.target.textContent.trim();
        setPicked((picked) =>
            picked.includes(word)
                ? picked.filter((w) => word !== w)
                : [...picked, word]
        );
    }
}
