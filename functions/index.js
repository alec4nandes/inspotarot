require("dotenv").config({ path: "./.env" });
const express = require("express"),
    cors = require("cors"),
    functions = require("firebase-functions");

// SECRET KEY

const IS_DEVELOPMENT = false,
    openAiServer = express();

openAiServer.use(
    cors({
        origin: IS_DEVELOPMENT
            ? [
                  "http://localhost:3000", // React testing
                  "http://localhost:5002", // Firebase Hosting testing
              ]
            : ["https://inspotarot.web.app"],
    })
);

openAiServer.post("/", async (req, res) => {
    res.send(process.env.OPENAI_API_KEY);
});

module.exports.openai = functions.https.onRequest(openAiServer);
