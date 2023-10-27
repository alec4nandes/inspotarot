import { signOut } from "firebase/auth";
import { auth } from "../scripts/database.js";

export default function SignOut() {
    return (
        <button className="link-btn" onClick={handleSignOut}>
            sign out
        </button>
    );

    function handleSignOut() {
        signOut(auth)
            .then(() => {
                window.location.reload();
            })
            .catch((err) => {
                console.error(err);
                alert(err.message);
            });
    }
}
