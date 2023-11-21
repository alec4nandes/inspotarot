import { useRef } from "react";
import "../css/vibe.css";

export default function Vibe({ setVibe, setQuestion }) {
    const questionRef = useRef();

    return (
        <div id="vibe">
            <form id="vibe-form" onSubmit={handleFormSubmit}>
                <h2>I'm looking for...</h2>
                <div id="radio-inputs">
                    <input
                        name="vibe"
                        type="radio"
                        id="advice"
                        value="advice"
                        onClick={jumpToQuestion}
                    />
                    <input
                        name="vibe"
                        type="radio"
                        id="inspiration"
                        value="inspiration"
                        onClick={jumpToQuestion}
                    />
                    <input
                        name="vibe"
                        type="radio"
                        id="self-discovery"
                        value="self-discovery"
                        onClick={jumpToQuestion}
                    />
                    <input
                        name="vibe"
                        type="radio"
                        id="support"
                        value="support"
                        onClick={jumpToQuestion}
                    />
                </div>
                <textarea
                    ref={questionRef}
                    id="question"
                    name="question"
                    placeholder="Ask a question (optional)..."
                    maxLength="200"
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

    function jumpToQuestion() {
        questionRef.current.scrollIntoView({ behavior: "smooth" });
    }
}
