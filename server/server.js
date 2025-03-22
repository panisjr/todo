const { GoogleGenerativeAI } = require('@google/generative-ai');
require('dotenv').config();
const express = require('express');
const cors = require('cors');

const app = express();
const port = 3001;

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

app.use(cors());
app.use(express.json());

app.post('/generate', async (req, res) => {
    try {
        const model = genAI.getGenerativeModel({ model: "gemini-1.5-pro" }); 
        const prompt = req.body.prompt;
        console.log("Prompt received:", prompt);

        const result = await model.generateContent(prompt);

        // Debug: Log the entire result object
        console.log("Full API Response:", JSON.stringify(result, null, 2));

        // Try accessing the response correctly
        const response = await result.response;
        console.log("Raw response object:", JSON.stringify(response, null, 2));

        const text = response?.candidates?.[0]?.content?.parts?.[0]?.text || "No response received.";
        
        console.log("Gemini text response:", text);
        res.json({ result: text });
    } catch (error) {
        console.error('Error generating content:', error);
        res.status(500).json({ error: error.message });
    }
});

app.listen(port, () => {
    console.log(`Server listening at http://localhost:${port}`);
});
