import { AzureOpenAI } from "openai";
import express from "express";
import cors from "cors";

import dotenv from "dotenv";
import {
  get_generate_prompt,
  get_generate_prompt_explanation,
  get_generate_prompt_lecture,
} from "./prompts/generate.js";

// Create an Express app instance
const app = express();
dotenv.config();
const apiKey = process.env.API_KEY;

app.use(express.json());
// Enable CORS for all routes
app.use(
  cors({
    origin: true,

    methods: ["POST"],
  })
);
const apiVersion = "2024-04-01-preview";
const deployment = "gpt-4o";

const client = new AzureOpenAI({
  apiKey: apiKey,
  endpoint: "https://quickcard-ai.openai.azure.com/",
  apiVersion: apiVersion,
  deployment,
});

// Define a simple test route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to UniPrep Service API!" });
});

const exampleTopics = {
  Álgebra: ["Funciones Cuadraticas"],
  Números: ["Naturales", "Racionales"],
  Geometría: ["Triángulos"],
  // "Probabilidad y Estadística": [
  //   "Medidas de tendencia central",
  //   "Análisis combinatorio",
  // ],
};
let recentTests = [];

app.post("/generate", async (req, res) => {
  const { prompt, topics, numberOfQuestions, subject, oldExam } = req.body;

  // if (!prompt) {
  //   return res.status(400).json({ error: "Prompt is required" });
  // }

  const get_topics_text = Object.entries(topics)
    .map(([topic, list]) => `${topic}: ${list.join(", ")}`)
    .join("\n");

  const get_old_question = oldExam.map((test) => test.question).join("\n");

  console.log("Received old questions:", get_old_question);
  try {
    const promptText =
      subject == "Matemáticas"
        ? get_generate_prompt(
            get_topics_text,
            get_old_question,
            numberOfQuestions
          )
        : get_generate_prompt_lecture(
            get_topics_text,
            get_old_question,
            numberOfQuestions
          );
    console.log("Generating response for prompt:", get_topics_text);
    const response = await client.chat.completions.create({
      model: "gpt-4o", // No pongas `deployment` si no es necesario, y ya lo defines aquí.
      messages: [
        {
          role: "user",
          content: promptText,
        },
      ],
      temperature: 0.3, // Más bajo = menos "imaginativo", más preciso
      max_tokens: 1500, // Aumenta por si las explicaciones son largas
    });

    /*
    
    const response = await client.chat.completions.create({
      messages: recentMessages,
      max_tokens: 4096,
      temperature: 1,
      top_p: 1,
      model: "gpt-4o",
    });
    */

    const answer = response.choices[0].message.content;
    //clean the json response ```json
    const cleanAnswer = answer
      .replace(/^```json\s*/, "")
      .replace(/```$/, "")
      .trim();
    //answer.replace(/```json/g, "").replace(/```/g, "");
    const result = JSON.parse(cleanAnswer);
    recentTests = result;
    console.log("Generated response:", result);

    //WE'RE GONNA TAKE question & options properties from the result
    const formattedResult = result.map((item) => ({
      question: item.question,
      options: item.options,
      correctAnswerIndex: item.correctAnswerIndex,
    }));

    const response2 = await client.chat.completions.create({
      model: "gpt-4o", // No pongas `deployment` si no es necesario, y ya lo defines aquí.
      messages: [
        {
          role: "user",
          content: get_generate_prompt_explanation(formattedResult),
        },
      ],
      temperature: 0.3, // Más bajo = menos "imaginativo", más preciso
      max_tokens: 4000, // Aumenta por si las explicaciones son largas
    });

    const answer2 = response2.choices[0].message.content;
    const cleanAnswer2 = answer2
      .replace(/^```json\s*/, "")
      .replace(/```$/, "")
      .trim();
    const result2 = JSON.parse(cleanAnswer2);
    console.log("Generated explanations:", result2);
    for (let i = 0; i < result.length; i++) {
      result[i].explanation = result2[i].explanation;
    }
    console.log("Generated explanations:", result);
    res.json(result);
  } catch (error) {
    console.error("Error generating response:", error);
    res.status(500).json({ error: "Failed to generate response" });
  }
});
// Define port
const PORT = process.env.PORT || 3000;

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  console.log(`http://localhost:${PORT}`);
});

export default app;
