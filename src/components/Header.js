import { IS_DEVELOPMENT } from "../scripts/openai.js";

export default function Header() {
    return (
        <>
            <h1>InspoTarot</h1>
            <div className="links">
                <Link subDir="privacy" linkText="Privacy Policy" />
                <Link subDir="" linkText="About" />
                <Link subDir="disclaimer" linkText="Disclaimer" />
            </div>
        </>
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
