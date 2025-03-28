
const express = require("express");
const cors = require("cors");

const { GoogleGenerativeAI } = require("@google/generative-ai");

const app = express();

app.use(express.json());
app.use(cors());

const PORT = process.env.PORT || 9000;
app.listen(PORT, () => {
  console.log("Server Listening on PORT:", PORT);
});

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY);

const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

app.post("/chat", async (req, res) => {
  const chatHistory = req.body.history || [];
  const msg = req.body.chat;

  const chat = model.startChat({
    history: chatHistory,
  });

  const result = await chat.sendMessage(msg);
  const response = await result.response;
  const text = response.text();

  res.send({ text: text });
});