const IS_DEVELOPMENT = false;

async function streamOpenAiResponse({ uuid, prompt, ref }) {
    try {
        ref.current && (ref.current.textContent = "Getting reading...");
        const systemContent =
                "You are a wise yet friendly Tarot card reader " +
                "explaining my cards in an intimate setting.",
            data = {
                model: "gpt-3.5-turbo",
                messages: [
                    { role: "system", content: systemContent },
                    { role: "user", content: prompt },
                ],
                stream: true,
                temperature: 0.7,
            },
            stream = await getStream({ data });
        fetchStream({ uuid, stream, ref });
    } catch (err) {
        ref.current.textContent = err.message;
        console.error(err.message);
    }
}

async function getStream({ data }) {
    const apiEndpoint = "https://api.openai.com/v1/chat/completions",
        openAiApiKey = await getOpenAiApiKey(),
        response = await fetch(apiEndpoint, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${openAiApiKey}`,
            },
            body: JSON.stringify(data),
        }),
        stream = response.body;
    return stream;
}

async function getOpenAiApiKey() {
    const apiRoot = IS_DEVELOPMENT
            ? "http://localhost:5000/inspotarot/us-central1"
            : "https://us-central1-inspotarot.cloudfunctions.net",
        openAiApiKey = await (
            await fetch(`${apiRoot}/openai`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
            })
        ).text();
    return openAiApiKey;
}

function fetchStream({ uuid, stream, ref }) {
    ref.current && (ref.current.textContent = "");
    const reader = stream.getReader();
    // read() returns a promise that fulfills
    // when a value has been received
    reader.read().then(function processText({ done, value }) {
        // Result objects contain two properties:
        // done  - true if the stream has already given you all its data.
        // value - some data. Always undefined when done is true.
        if (ref?.current?.dataset.id === uuid) {
            // check current id against cards. Sometimes a user might select a
            // new custom spread before the old one finishes reading.
            if (done) {
                console.log("Stream complete!");
            } else {
                const decoded = new TextDecoder().decode(value);
                parseDecoded(decoded, ref);
            }
            // Read some more, and call this function again
            return !done && reader.read().then(processText);
        } else {
            return;
        }
    });
}

function parseDecoded(decoded, ref) {
    const data = decoded
        .split("data:")
        .map((line) => line.trim())
        .filter(Boolean)
        .map((line) => {
            try {
                return JSON.parse(line);
            } catch (err) {
                console.warn(line);
                return "";
            }
        });
    for (const piece of data) {
        const chunk = piece?.choices?.[0]?.delta?.content;
        ref.current.innerHTML += chunk || "";
    }
}

export { streamOpenAiResponse, IS_DEVELOPMENT };
