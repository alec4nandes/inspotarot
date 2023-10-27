import "../css/vibe.css";
import Header from "./Header";

export default function Vibe({ setVibe, setQuestion }) {
    return (
        <div id="vibe">
            <Header />
            <br />
            <form id="vibe-form" onSubmit={handleFormSubmit}>
                <p>I'm looking for...</p>
                <div id="radio-inputs">
                    <input
                        name="vibe"
                        type="radio"
                        id="advice"
                        value="advice"
                    />
                    <input
                        name="vibe"
                        type="radio"
                        id="inspiration"
                        value="inspiration"
                    />
                    <input
                        name="vibe"
                        type="radio"
                        id="self-discovery"
                        value="self-discovery"
                    />
                    <input
                        name="vibe"
                        type="radio"
                        id="support"
                        value="support"
                    />
                </div>
                <textarea
                    id="question"
                    name="question"
                    placeholder="Ask a question (optional)..."
                ></textarea>
                <button type="submit">NEXT</button>
            </form>
        </div>
    );

    function handleFormSubmit(e) {
        e.preventDefault();
        const v = e.target.vibe.value;
        if (!v) {
            alert("Please select what you're looking for.");
            return;
        }
        setVibe(v);
        setQuestion(e.target.question.value.trim());
    }
}
