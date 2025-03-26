const {GoogleGenerativeAI} = require("@google/generative-ai");
require('dotenv').config();

const cors = require("cors");
const express = require('express');

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

const app = express()
const port = 3000;

app.use(cors());
app.use(express.json());

app.post('/generateText', async(req, res)=>{
    try {
       const model = genAI.getGenerativeModel({model: 'gemini-1.5-pro'});
        const prompt = req.body.prompt;
        console.log("Prompt received: ", prompt);

        const result = await model.generateContent(prompt)
        console.log("Full API response", JSON.stringify(result,null,2));

        const response = await result.json();
        console.log("Raw response object: ", JSON.stringify(result, null, 2));

        const text = response?.candidates?.[0]?.content?.parts?.[0]?.text || "No response received.";

        console.log("Gemini text response: ", text)
        res.json({result:text})
    } catch (error) {
        console.error("An error occured: ", error)
        res.status(500).json({error: error.message})
    }
})

app.listen(port, ()=>{
    console.log(`Server listening at http://localhost: ${port}`)
})