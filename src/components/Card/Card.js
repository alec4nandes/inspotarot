import "../../css/card.css";
import { useEffect, useState } from "react";
import { getCard } from "../../scripts/data.js";
import CardImage from "../CardImage";
import NextCard from "./NextCard";
import NotFeelingIt from "./NotFeelingIt";
import WordButtons from "./WordButtons";

export default function Card({ cardName, cards, setCards }) {
    const [card, setCard] = useState(),
        [allWords, setAllWords] = useState([]),
        [shownWords, setShownWords] = useState(),
        [picked, setPicked] = useState();

    useEffect(() => {
        setCard(getCard(cardName));
        setPicked([]);
    }, [cardName]);

    useEffect(() => {
        card && setAllWords(card.words);
    }, [card]);

    useEffect(() => {
        setShownWords(
            [...allWords].sort(() => 0.5 - Math.random()).slice(0, 5)
        );
    }, [allWords]);

    return (
        <div id="card">
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
                            <NextCard {...{ cards, setCards, card, picked }} />
                        ) : (
                            <NotFeelingIt
                                {...{
                                    allWords,
                                    setAllWords,
                                    setCard,
                                    shownWords,
                                    cards,
                                }}
                            />
                        )}
                    </div>
                </div>
            )}
        </div>
    );
}
