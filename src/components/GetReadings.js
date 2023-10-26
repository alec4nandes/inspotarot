export default function GetReadings({ vibe, setShowReading }) {
    return (
        <div id="get-readings">
            <h1>Tarot Something</h1>
            <h2>Interesting choices... 😊</h2>
            <h3>Thanks for your input!</h3>
            <h4>Now let's consult these Tarot cards for some {vibe}:</h4>
            <button onClick={() => setShowReading(true)}>GET READINGS</button>
        </div>
    );
}
