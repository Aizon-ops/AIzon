const { Configuration, OpenAIApi } = require('openai');
require('dotenv').config();

const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

exports.generateText = async (req, res) => {
    try {
        const { prompt } = req.body;
        const response = await openai.createCompletion({
            model: "text-davinci-003",
            prompt: prompt,
            max_tokens: 100,
        });
        res.status(200).json({ result: response.data.choices[0].text });
    } catch (error) {
        console.error("OpenAI Error:", error);
        res.status(500).json({ error: 'Something went wrong with OpenAI API.' });
    }
};
