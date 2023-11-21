import "../../css/card.css";
import { useEffect, useState } from "react";
import {
    getCard,
    getRandomCardName,
    getUprightCardName,
} from "../../scripts/data.js";
import CardImage from "../CardImage";
import NextCard from "./NextCard";
import NotFeelingIt from "./NotFeelingIt";
import WordButtons from "./WordButtons";

export default function Card({ cardName, cards, setCards, vibe, question }) {
    const [card, setCard] = useState(),
        [allWords, setAllWords] = useState([]),
        [shownWords, setShownWords] = useState([]),
        [picked, setPicked] = useState([]);

    useEffect(() => {
        setCard(getCard(cardName));
        setPicked([]);
    }, [cardName]);

    useEffect(() => {
        card && setAllWords(card.words);
    }, [card]);

    useEffect(() => {
        getRangeOfWords(allWords, setShownWords, 0);
    }, [allWords]);

    return (
        <div id="card">
            <VibeHeading {...{ vibe, question }} />
            <p>
                Choose at least one word from 5 cards for your special reading.
            </p>
            <br />
            {card && (
                <div className="card">
                    <p className="card-number">Card #{cards.length + 1}</p>
                    <CardImage {...{ card }} />
                    <p className="card-name">{card.name}</p>
                    <p>
                        <em>
                            Look deep within, and then pick at least one word
                            that relates to you:
                        </em>
                    </p>
                    <WordButtons {...{ shownWords, picked, setPicked }} />
                    <div className="card-bottom">
                        {picked.length ? (
                            <NextCard
                                {...{
                                    cards,
                                    setCards,
                                    card,
                                    picked,
                                    allWords,
                                    shownWords,
                                    setShownWords,
                                }}
                            />
                        ) : (
                            <NotFeelingIt
                                {...{
                                    allWords,
                                    cards,
                                    setCard,
                                    shownWords,
                                    setShownWords,
                                }}
                            />
                        )}
                    </div>
                </div>
            )}
        </div>
    );
}

function getDifferentCardName(cards) {
    const drawn = cards.map(({ name }) => getUprightCardName(name));
    let randomCardName = getRandomCardName();
    while (drawn.includes(getUprightCardName(randomCardName))) {
        randomCardName = getRandomCardName();
    }
    return randomCardName;
}

function getRangeOfWords(allWords, setShownWords, start, length = 5) {
    const words = allWords.slice(start, start + length);
    words.length && setShownWords(words);
}

function VibeHeading({ vibe, question }) {
    return (
        <p className="vibe-heading">
            You are looking for {vibe}
            {question ? ` and asked: "${question}"` : "."}
        </p>
    );
}

export { getDifferentCardName, getRangeOfWords, VibeHeading };
