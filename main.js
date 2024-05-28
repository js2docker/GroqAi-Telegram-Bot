const Groq = require("groq-sdk");
const TelegramBot = require('node-telegram-bot-api');

// Replace with your Telegram bot token and Groq API key
const TELEGRAM_TOKEN = '5815567565:AAGdRjgvkSVv_aX90blgi1X8WNmpnJRu9ro';
const GROQ_API_KEY = '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';

const bot = new TelegramBot(TELEGRAM_TOKEN, { polling: true });
const groq = new Groq({ apiKey: GROQ_API_KEY });

console.log("Bot running..")
console.log("------------------------------------")

async function handleRequest(msg) {
  const completion = await groq.chat.completions.create({
    messages: [{ role: "user", content: msg.text }],
    model: "mixtral-8x7b-32768"
  }).then((chatCompletion) => {
    return chatCompletion.choices[0]?.message?.content || "I'm still learning how to answer that!";
  });

  console.log("------------------------------------")

  console.log(" # User: " + msg.text)
  console.log(" # AI: " + completion)

  console.log("------------------------------------")

  bot.sendMessage(msg.chat.id, completion); 
}

bot.on('message', handleRequest);
