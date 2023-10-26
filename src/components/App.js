import "../css/get-readings.css";
import { useEffect, useState } from "react";
import { getDifferentCardName } from "./Card/NotFeelingIt";
import Card from "./Card/Card";
import GetReadings from "./GetReadings";
import Reading from "./Reading/Reading";
import Vibe from "./Vibe";

export default function App() {
    const [vibe, setVibe] = useState(),
        [question, setQuestion] = useState(),
        [cards, setCards] = useState(),
        [cardName, setCardName] = useState(),
        [showReading, setShowReading] = useState(false);

    useEffect(() => {
        if (!vibe) {
            setCards([]);
            setShowReading(false);
        }
    }, [vibe]);

    useEffect(() => {
        cards && setCardName(getDifferentCardName(cards));
        window.scrollTo({ top: 0 });
    }, [cards]);

    return !vibe ? (
        <Vibe {...{ setVibe, setQuestion }} />
    ) : cards.length < 5 ? (
        <Card {...{ cardName, cards, setCards }} />
    ) : !showReading ? (
        <GetReadings {...{ vibe, setShowReading }} />
    ) : (
        <Reading {...{ vibe, setVibe, question, cards }} />
    );
}
