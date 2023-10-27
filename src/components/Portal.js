import "../css/portal.css";
import { useEffect, useRef, useState } from "react";
import { sendEmailVerification } from "firebase/auth";
import { auth } from "../scripts/database.js";
import { IS_DEVELOPMENT } from "../scripts/openai.js";
import { handlePortal } from "../scripts/portal.js";
import Header from "./Header";
import ResetPassword from "./ResetPassword";

export default function Portal() {
    const [errorMessage, setErrorMessage] = useState(""),
        [loginEmail, setLoginEmail] = useState(""),
        formRef = useRef();

    useEffect(() => {
        const callback = (e) => handlePortal(e, setErrorMessage, formRef);
        document.addEventListener("click", callback);
        return () => document.removeEventListener("click", callback);
    }, []);

    return (
        <div id="portal">
            <Header hideSignOut={true} />
            <form ref={formRef} onSubmit={(e) => e.preventDefault()}>
                <input
                    name="email"
                    type="email"
                    id="email"
                    placeholder="email"
                    onChange={(e) => setLoginEmail(e.target.value)}
                    required
                />
                <input
                    name="password"
                    type="password"
                    id="password"
                    placeholder="password"
                    required
                />
                <div id="user-options">
                    <button id="sign-up-btn">sign up</button>
                    <button id="sign-in-btn">sign in</button>
                </div>
            </form>
            <div>
                <a href={IS_DEVELOPMENT ? "http://localhost:5002" : "/"}>
                    about
                </a>
                &nbsp;&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;&nbsp;
                <ResetPassword email={loginEmail} />
            </div>
            {errorMessage && <p id="sign-in-error">{errorMessage}</p>}
        </div>
    );
}

function Unverified({ user }) {
    return (
        <div id="unverified">
            <Header />
            <p>
                Please verify your email by clicking the link sent to{" "}
                {user.email}
            </p>
            <div id="user-options">
                <ResendVerify />
                <button
                    className="standard-btn"
                    onClick={() => window.location.reload()}
                >
                    refresh page
                </button>
            </div>
        </div>
    );

    function ResendVerify() {
        return (
            <button className="standard-btn" onClick={handleResendVerify}>
                resend verification email
            </button>
        );

        async function handleResendVerify() {
            try {
                await sendEmailVerification(auth.currentUser);
                alert("Email sent.");
            } catch (err) {
                console.error(err);
                alert(
                    "Could not send email. Please try again and contact al@fern.haus if problem persists."
                );
            }
        }
    }
}

export { Unverified };
