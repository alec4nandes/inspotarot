import { sendPasswordResetEmail } from "firebase/auth";
import { auth } from "../scripts/database.js";

export default function ResetPassword({ email }) {
    return (
        <button
            id="reset-pw-btn"
            className="link-btn"
            onClick={() => handleResetPassword(email)}
        >
            reset password
        </button>
    );

    async function handleResetPassword(email) {
        if (!email.trim()) {
            alert("Please enter a registered email address.");
            return;
        }
        try {
            await sendPasswordResetEmail(auth, email);
            alert(`Password reset email sent to ${email}`);
        } catch (err) {
            console.error(err);
            alert(
                err.code === "auth/user-not-found"
                    ? "No user with that email."
                    : err.code === "auth/invalid-email"
                    ? "Please enter a valid email."
                    : "Could not send password reset email right now. Please try again, and contact al@fern.haus if the problem persists."
            );
        }
    }
}
