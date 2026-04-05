import { ChatGoogle } from "@langchain/google";
import { ChatMistralAI } from "@langchain/mistralai";
import { ChatGroq } from "@langchain/groq"
import config from "../config/config.js";

export const googleChat = new ChatGoogle({
    model:"gemini-flash-latest",
  apiKey: config.GOOGLE_API_KEY,
});

export const mistralChat = new ChatMistralAI({
model:"mistral-medium-latest",
  apiKey: config.MISTRAL_API_KEY,
});

export const groqChat = new ChatGroq({
   model: "llama-3.1-8b-instant",
  apiKey: config.GROQ_API_KEY,
});