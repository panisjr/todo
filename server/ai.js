const {GoogleGenerativeAI} = require("@google/generative-ai");
require("dotenv").config();

const express = require("express");
const cors = require("cors");

const app = express();
const port = 3000;

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

app.use(cors());
app.use(express.json())

app.post('/generateText', async(req,res)=>{
    try {
        // Declaration of the model
        const model = genAI.getGenerativeModel("gemini-1.5-pro")
        const prompt = req.body.prompt;
        console.log("Prompt received: ", prompt)

        const result = await model.generateContent(prompt)

        console.log("Full API response: ", JSON.stringify(result, null, 2))

        const response = await result.response;
        const text = response?.candidates?.[0].content?.parts?.[0].text || "No response received."

        console.log("Gemini text response: ", text )
        res.json({result: text})
    } catch (error) {
        console.error("Error: ", error)
    }
})

app.listen(port, ()=>{
    console.log(`Server listening at http://localhost:${port}`)
})