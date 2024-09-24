// server/server.js
const express = require('express');
const cors = require('cors');
const axios = require('axios');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Endpoint to generate dragon details using OpenAI
app.post('/api/generate-dragon', async (req, res) => {
    const { dragonName } = req.body;

    try {
        const response = await axios.post(
            'https://api.openai.com/v1/chat/completions',
            {
                model: 'gpt-4', // Replace with your custom GPT model if applicable
                messages: [
                    {
                        role: 'system',
                        content: 'You are a dragon creator. Generate detailed stats and description for a dragon.',
                    },
                    {
                        role: 'user',
                        content: `Create a dragon named "${dragonName}". Provide its attack, defense, health, and a brief description.`,
                    },
                ],
                max_tokens: 150,
            },
            {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
                },
            }
        );

        const dragonData = response.data.choices[0].message.content;
        res.json({ dragonData });
    } catch (error) {
        console.error(error.response ? error.response.data : error.message);
        res.status(500).json({ error: 'Failed to generate dragon.' });
    }
});

// Endpoint to determine AI's attack decisions
app.post('/api/ai-decision', async (req, res) => {
    const { aiDragons, playerDragons } = req.body;

    try {
        const prompt = `
You are an AI opponent in a dragon battle game.
Given the following AI dragons and Player dragons, decide which AI dragon should attack which player dragon or directly attack the player's life points.

AI Dragons:
${aiDragons.map(d => `- ${d.name} (Attack: ${d.attack}, Defense: ${d.defense}, Health: ${d.health})`).join('\n')}

Player Dragons:
${playerDragons.map(d => `- ${d.name} (Attack: ${d.attack}, Defense: ${d.defense}, Health: ${d.health})`).join('\n')}

Provide your decision in the following JSON format:
{
    "attacks": [
        {
            "attacker": "AI Dragon Name",
            "target": "Player Dragon Name or 'Life Points'",
            "damage": damage_value
        }
        // More attacks...
    ]
}
`;

        const response = await axios.post(
            'https://api.openai.com/v1/chat/completions',
            {
                model: 'gpt-4', // Replace with your custom GPT model if applicable
                messages: [
                    { role: 'system', content: 'You are an intelligent AI for a dragon battle game, making strategic attack decisions.' },
                    { role: 'user', content: prompt },
                ],
                max_tokens: 300,
            },
            {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
                },
            }
        );

        const aiDecision = response.data.choices[0].message.content;
        res.json({ aiDecision });
    } catch (error) {
        console.error(error.response ? error.response.data : error.message);
        res.status(500).json({ error: 'Failed to generate AI decision.' });
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
