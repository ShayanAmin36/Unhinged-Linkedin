import express, { Request, Response } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { GoogleGenAI } from '@google/genai';

// Load the secrets from your .env file
dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

// Middleware so your server can understand JSON and safely talk to your Chrome extension
app.use(cors());
app.use(express.json());

// Initialize the official Gemini SDK (it automatically grabs the GEMINI_API_KEY from your .env file)
const ai = new GoogleGenAI({});

// The API endpoint that your Chrome extension will call
app.post('/generate', async (req: Request, res: Response): Promise<any> => {
  try {
    const userText = req.body.text;

    if (!userText) {
      return res.status(400).json({ error: "Please provide some text to translate." });
    }

    // The secret sauce: The prompt we send to Gemini
    const prompt = `
      Act as a master of corporate spin and LinkedIn thought leadership. 
      Take the following real-life, potentially unhinged or negative event, and translate it into a highly professional, inspiring, and buzzword-filled LinkedIn post celebrating a new "achievement" or "learning opportunity."
      
      The event: "${userText}"
      
      Make it sound completely serious, use corporate jargon (synergy, pivoting, operational efficiency), and include a few relevant emojis. Only give me the final LinkedIn post, no explanations.
    `;

    // Calling the Gemini 2.5 Flash model
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
    });

    // Send the AI's response back to the frontend
    res.json({ result: response.text });
    
  } catch (error) {
    console.error("Error generating content:", error);
    res.status(500).json({ error: "Failed to generate corporate spin." });
  }
});

// Start the server
app.listen(port, () => {
  console.log(`🚀 Unhinged LinkedIn Bot server running on http://localhost:${port}`);
});