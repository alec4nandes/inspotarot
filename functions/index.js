require("dotenv").config({ path: "./.env" });
const express = require("express"),
    cors = require("cors"),
    functions = require("firebase-functions");

// SECRET KEY

const IS_DEVELOPMENT = true,
    openAiServer = express();

openAiServer.use(
    cors({
        origin: IS_DEVELOPMENT
            ? ["http://localhost:3000"]
            : ["https://inspotarot.web.app"],
    })
);

openAiServer.post("/", async (req, res) => {
    res.send(process.env.OPENAI_API_KEY);
});

module.exports.openai = functions.https.onRequest(openAiServer);
