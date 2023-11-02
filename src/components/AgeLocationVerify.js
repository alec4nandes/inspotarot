import { IS_DEVELOPMENT } from "../scripts/openai.js";

export default function AgeLocationVerify({ cookieKey, setHasAgeCookie }) {
    return (
        <div id="verify-age-location">
            <div id="verify-container">
                <h1>InspoTarot</h1>
                <p>
                    This website is restricted to people aged 18+ and residing
                    in areas where Tarot card reading and related activities are
                    not illegal. By clicking “Enter” you are agreeing to these
                    terms.
                </p>
                <div id="verify-buttons">
                    <button
                        className="standard-btn"
                        onClick={() => {
                            // add age & location verification cookie
                            document.cookie = `${cookieKey}=1;path=/${
                                IS_DEVELOPMENT ? "" : ";domain=inspotarot.com"
                            }`;
                            setHasAgeCookie(true);
                        }}
                    >
                        ENTER
                    </button>
                    <button
                        className="standard-btn"
                        onClick={() =>
                            (window.location.href = "https://google.com")
                        }
                    >
                        LEAVE
                    </button>
                </div>
            </div>
        </div>
    );
}
