import { IS_DEVELOPMENT } from "../scripts/openai.js";
import SignOut from "./SignOut.js";

export default function Header({ hideSignOut }) {
    return (
        <header>
            <h1>InspoTarot</h1>
            <nav>
                <Link subDir="" linkText="About" />
                <Link subDir="privacy" linkText="Privacy Policy" />
                <Link subDir="disclaimer" linkText="Disclaimer" />
                {!hideSignOut && <SignOut />}
            </nav>
        </header>
    );
}

function Link({ subDir, linkText }) {
    const getFirebaseHost = () =>
        IS_DEVELOPMENT ? "http://localhost:5002" : "";

    return (
        <a
            href={`${getFirebaseHost()}/${subDir}`}
            target="_blank"
            rel="noopener"
        >
            {linkText}
        </a>
    );
}
