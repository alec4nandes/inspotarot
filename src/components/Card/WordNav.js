import { getRangeOfWords } from "./Card.js";

export default function WordNav({ allWords, shownWords, setShownWords }) {
    return (
        <>
            <button onClick={handlePreviousWords}>{"<<"} WORDS</button>
            <button onClick={handleMoreWords}>WORDS {">>"}</button>
        </>
    );

    function handlePreviousWords() {
        const end = allWords.indexOf(shownWords[0]),
            start = end - 5;
        getRangeOfWords(allWords, setShownWords, start);
    }

    function handleMoreWords() {
        const start = allWords.indexOf(shownWords.at(-1)) + 1;
        getRangeOfWords(allWords, setShownWords, start);
    }
}
