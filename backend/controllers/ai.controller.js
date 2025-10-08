import OpenAI from "openai";
import { Hotel } from "../models/Hotel.schema.js"; // your Hotel model
import dotenv from "dotenv";
dotenv.config();

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export const getAIRecommendations = async (req, res) => {
  try {
    const { query } = req.body; // user's text input

    // Fetch all hotels from DB
    const hotels = await Hotel.find();

    // Send hotel data to AI with user query
    const prompt = `
You are an assistant helping users find hotels.
User wants: "${query}"
Here is the list of available hotels:

${hotels.map(h => `• ${h.name} in ${h.city}, price $${h.price}`).join("\n")}

Recommend 3 hotels that best match user preferences.
Give short reasons for each.
    `;

    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini", // cheaper & fast model
      messages: [{ role: "user", content: prompt }],
    });

    res.json({
      success: true,
      recommendations: completion.choices[0].message.content,
    });
  } catch (error) {
    console.error("AI Recommendation Error:", error);
    res.status(500).json({ success: false, message: "AI recommendation failed" });
  }
};
