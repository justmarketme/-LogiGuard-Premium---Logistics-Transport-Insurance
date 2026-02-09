
import { GoogleGenAI } from "@google/genai";

const apiKey = process.env.API_KEY || "";
const ai = new GoogleGenAI({ apiKey });

export const getRiskInsights = async (userAnswers: any) => {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `You are a Logistics Risk Analyst. 
      IMPORTANT: You do NOT give financial advice. You give simple data observations.
      
      TASK: Look at the user's answers and give 2-3 simple sentences about what their profile shows.
      TONE: Helpful, professional, and clear. Use simple English.
      
      MANDATORY RULES:
      1. DO NOT say "I recommend" or "You should buy".
      2. Use simple phrases like "Your profile shows...", "The data suggests...", "A professional might look at...".
      
      STRUCTURE:
      - START with: "[Report: Your operational profile indicates opportunities for review...]"
      - END with: "This is not financial advice. We will introduce you to a professional broker who can give you formal guidance."
      
      User Details: ${JSON.stringify(userAnswers)}`,
    });
    return response.text;
  } catch (error) {
    console.error("Gemini Error:", error);
    return "[Report: Your operational profile indicates opportunities for review...] Based on your data, there are areas where you could improve your cover. This is not financial advice. We will introduce you to a professional broker who can give you formal guidance.";
  }
};

export const chatWithAssistant = async (message: string, context: string) => {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `You are 'LogiBot', a helpful assistant for LogiGuard. 
      You help users understand their risk data and connect them to real insurance brokers.
      
      Instruction: Keep your language very simple and easy to understand. If they ask for advice, say you are an AI and you will connect them with a human professional for real advice.
      
      User Message: ${message}`,
      config: {
        systemInstruction: "Speak like a helpful South African business assistant. Keep it clear and simple."
      }
    });
    return response.text;
  } catch (error) {
    return "I am busy right now, but I can still help you connect with a professional broker. Just fill in the form!";
  }
};
