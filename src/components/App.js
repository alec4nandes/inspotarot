import "../css/app.css";
import { useEffect, useState } from "react";
import { getDifferentCardName } from "./Card/NotFeelingIt";
import Card from "./Card/Card";
import Reading from "./Reading/Reading";
import Vibe from "./Vibe";

export default function App() {
    const [vibe, setVibe] = useState(),
        [question, setQuestion] = useState(),
        [cards, setCards] = useState(),
        [cardName, setCardName] = useState();

    useEffect(() => {
        !vibe && setCards([]);
    }, [vibe]);

    useEffect(() => {
        cards && setCardName(getDifferentCardName(cards));
    }, [cards]);

    return (
        <div className="App">
            <h1>Tarot Something</h1>
            {!vibe ? (
                <Vibe {...{ setVibe, setQuestion }} />
            ) : cards.length < 5 ? (
                <Card {...{ cardName, cards, setCards }} />
            ) : (
                <Reading {...{ vibe, setVibe, question, cards }} />
            )}
        </div>
    );
}
