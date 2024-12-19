const express = require('express');
const router = express.Router();
const { Configuration, OpenAIApi } = require('openai');
const axios = require('axios');

// OpenAI Configuration
const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

// Test Route
router.post('/test', async (req, res) => {
    const reply = 'Request received at /api/test: ' + JSON.stringify(req.body);
    console.log(reply);
    res.json({ reply });
});

// Chat Endpoint
router.post('/chat', async (req, res) => {
    const { message } = req.body;

    if (!message) {
        return res.status(400).json({ error: 'Message is required.' });
    }

    try {
        const completion = await openai.createChatCompletion({
            model: "gpt-3.5-turbo",
            messages: [
                { role: "system", content: "You are a helpful assistant." },
                { role: "user", content: message },
            ],
        });

        const reply = completion.data.choices[0].message.content;
        res.json({ reply });
    } catch (error) {
        console.error('Error communicating with OpenAI:', error.response?.data || error.message || error);
        res.status(500).json({ 
            error: error.response?.data || error.message || 'An unknown error occurred.' 
        });
    }
});

// Travel Plan Generator
router.post('/travel-plan', async (req, res) => {
    const { prompt, location } = req.body;

    if (!prompt || !location) {
        return res.status(400).json({ error: 'Prompt and location are required.' });
    }

    try {
        const response = await openai.createChatCompletion({
            model: "gpt-3.5-turbo",
            messages: [
                { role: 'system', content: 'You are a smart travel assistant.' },
                { role: 'user', content: `I want a travel plan for ${location}. ${prompt}` },
            ],
            functions: [
                {
                    name: 'get_weather',
                    description: 'Fetch weather for a specific location.',
                    parameters: {
                        type: 'object',
                        properties: {
                            location: { type: 'string', description: 'City name' },
                        },
                        required: ['location'],
                    },
                },
            ],
            function_call: 'auto',
        });

        if (response.data.choices[0].finish_reason === 'function_call') {
            const functionCall = response.data.choices[0].message?.function_call;

            if (functionCall?.name === 'get_weather') {
                const locationArg = JSON.parse(functionCall.arguments)?.location;

                const weatherResponse = await axios.get(
                    `https://api.weatherapi.com/v1/current.json?key=${process.env.WEATHER_API_KEY}&q=${locationArg}`
                );

                return res.json({
                    gptResponse: response.data.choices[0].message?.content,
                    weatherData: weatherResponse.data,
                });
            }
        }

        res.json({ gptResponse: response.data.choices[0].message?.content });
    } catch (error) {
        console.error('Error:', error.response?.data || error.message || error);
        res.status(500).json({ error: error.response?.data || error.message || 'An unknown error occurred.' });
    }
});

module.exports = router;
