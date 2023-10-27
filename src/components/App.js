import "../css/get-readings.css";
import { useEffect, useState } from "react";
import { getDifferentCardName } from "./Card/NotFeelingIt";
import { auth } from "../scripts/database.js";
import { onAuthStateChanged } from "firebase/auth";
import Card from "./Card/Card";
import Footer from "./Footer";
import GetReadings from "./GetReadings";
import Header from "./Header";
import Portal, { Unverified } from "./Portal";
import Reading from "./Reading/Reading";
import Vibe from "./Vibe";

export default function App() {
    const [loaded, setLoaded] = useState(false),
        [user, setUser] = useState(),
        [vibe, setVibe] = useState(),
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

    // CHECK USER LOGIN STATUS
    useEffect(() => {
        onAuthStateChanged(auth, async (user) => {
            user && setUser(await getUserData(user));
            setLoaded(true);
        });

        async function getUserData(user) {
            const { email, emailVerified } = user || {};
            return { email, emailVerified };
        }
    }, []);

    return (
        loaded && (
            <>
                {!showReading && <Header hideSignOut={!user} />}
                <main id={showReading ? "main-reading" : ""}>
                    {!user ? (
                        <Portal />
                    ) : !user.emailVerified ? (
                        <Unverified {...{ user }} />
                    ) : !vibe ? (
                        <Vibe {...{ setVibe, setQuestion }} />
                    ) : cards.length < 5 ? (
                        <Card {...{ cardName, cards, setCards }} />
                    ) : !showReading ? (
                        <GetReadings {...{ vibe, setShowReading }} />
                    ) : (
                        <Reading {...{ vibe, setVibe, question, cards }} />
                    )}
                </main>
                {!showReading && <Footer />}
            </>
        )
    );
}
