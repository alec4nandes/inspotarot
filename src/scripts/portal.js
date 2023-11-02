import {
    createUserWithEmailAndPassword,
    sendEmailVerification,
    signInWithEmailAndPassword,
} from "firebase/auth";
import { auth } from "./database.js";
import { IS_DEVELOPMENT } from "./openai.js";

async function handlePortal(e, setErrorMessage, formRef) {
    const { id } = e.target;
    if (id === "sign-in-btn") {
        await handleSignIn(e, setErrorMessage, formRef);
    } else if (id === "sign-up-btn") {
        await handleSignUp(e, setErrorMessage, formRef);
    }
    return;
}

async function handleSignIn(e, setErrorMessage, formRef) {
    e.preventDefault();
    const { email, password } = getFormData(formRef);
    return signInWithEmailAndPassword(auth, email, password)
        .then((result) => result)
        .catch((error) => errorHelper(error, setErrorMessage));
}

async function handleSignUp(e, setErrorMessage, formRef) {
    e.preventDefault();
    const { email, password } = getFormData(formRef);
    try {
        const { user } = await createUserWithEmailAndPassword(
            auth,
            email,
            password
        );
        await sendEmailVerification(user, {
            url: IS_DEVELOPMENT
                ? "http://localhost:3000/app"
                : "https://inspotarot.com/app",
        });
    } catch (error) {
        errorHelper(error, setErrorMessage);
    }
}

function getFormData(formRef) {
    return Object.fromEntries(new FormData(formRef.current));
}

function errorHelper(error, setErrorMessage) {
    const ERROR_MESSAGES = {
            "auth/email-already-in-use":
                "That email already has an account. Try signing in instead.",
            "auth/user-not-found":
                "That email doesn't have an account. Please try signing up.",
            "auth/invalid-login-credentials": "Invalid login credentials.",
            "auth/invalid-email": "Please enter a valid email.",
            "auth/missing-email": "Please enter a valid email.",
            "auth/wrong-password": "That password is incorrect.",
            "auth/missing-password": "Please enter a valid password.",
            "auth/weak-password":
                "That password is too weak. It must be at least 6 characters.",
        },
        { code } = error;
    console.error(error);
    setErrorMessage(ERROR_MESSAGES[code] || code);
}

export { handlePortal };
