import { IS_DEVELOPMENT } from "../scripts/openai.js";
import SignOut from "./SignOut.js";

export default function Header({ hideSignOut }) {
    const getFirebaseHost = () =>
        IS_DEVELOPMENT ? "http://localhost:5002" : "";

    return (
        <header>
            <h1>InspoTarot</h1>
            <nav>
                <a href={`${getFirebaseHost()}/`}>About</a>
                <a href={`${getFirebaseHost()}/privacy`}>Privacy Policy</a>
                <a href={`${getFirebaseHost()}/disclaimer`}>Disclaimer</a>
                {!hideSignOut && <SignOut />}
            </nav>
        </header>
    );
}
