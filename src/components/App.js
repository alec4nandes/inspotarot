import "../css/get-readings.css";
import { useEffect, useState } from "react";
import { getDifferentCardName } from "./Card/Card";
import { auth } from "../scripts/database.js";
import { onAuthStateChanged } from "firebase/auth";
import Card from "./Card/Card";
import Footer from "./Footer";
import GetReadings from "./GetReadings";
import Header from "./Header";
import Portal, { Unverified } from "./Portal";
import Reading from "./Reading/Reading";
import Vibe from "./Vibe";
import AgeLocationVerify from "./AgeLocationVerify";

const cookieKey = "age_location_verified";

export default function App() {
    const [loaded, setLoaded] = useState(false),
        [hasAgeCookie, setHasAgeCookie] = useState(false),
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

    // VERIFY AGE AND LOCATION
    useEffect(() => {
        // check cookie
        const cookieData = parseCookie(document.cookie),
            userVerified = !!+cookieData[cookieKey];
        userVerified && setHasAgeCookie(true);
        console.log("user verified:", userVerified);

        // https://www.geekstrick.com/snippets/how-to-parse-cookies-in-javascript/
        // cookie in browser: `pkg=math; equation=E%3Dmc%5E2`
        // parsed: { pkg: 'math', equation: 'E=mc^2' }
        function parseCookie(str) {
            return str
                .split(";")
                .map((v) => v.split("="))
                .reduce((acc, v) => {
                    acc[decodeURIComponent(v[0].trim())] = decodeURIComponent(
                        v[1]?.trim()
                    );
                    return acc;
                }, {});
        }
    }, []);

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
        loaded &&
        (!hasAgeCookie ? (
            <AgeLocationVerify {...{ cookieKey, setHasAgeCookie }} />
        ) : (
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
                        <Card
                            {...{ cardName, cards, setCards, vibe, question }}
                        />
                    ) : !showReading ? (
                        <GetReadings {...{ vibe, setShowReading }} />
                    ) : (
                        <Reading {...{ vibe, setVibe, question, cards }} />
                    )}
                </main>
                {!showReading && <Footer />}
            </>
        ))
    );
}
