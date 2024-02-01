const IS_DEVELOPMENT = false;

async function streamOpenAiResponse({ uuid, prompt, ref }) {
    try {
        ref.current && (ref.current.textContent = "Getting reading...");
        const data = getData(prompt),
            stream = await fetchStream(data);
        readStream({ uuid, stream, ref });
    } catch (err) {
        ref.current.textContent = err.message;
        console.error(err.message);
    }
}

function getData(prompt) {
    const systemContent =
        "You are a wise yet friendly Tarot card reader " +
        "explaining my cards in an intimate setting.";
    return {
        model: "gpt-3.5-turbo",
        messages: [
            {
                role: "system",
                content: systemContent,
            },
            {
                role: "user",
                content: prompt,
            },
        ],
        temperature: 0.7,
        apiKeyName: "OPENAI_API_KEY_TAROT",
    };
}

async function fetchStream(data) {
    const response = await fetch(
        "https://uf663xchsyh44bikbn723q7ewq0xqoaz.lambda-url.us-east-2.on.aws/",
        {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data),
        }
    );
    return response.body;
}

function readStream({ uuid, stream, ref }) {
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
                ref.current.textContent += decoded;
            }
            // Read some more, and call this function again
            return !done && reader.read().then(processText);
        } else {
            return;
        }
    });
}

export { streamOpenAiResponse, IS_DEVELOPMENT };
