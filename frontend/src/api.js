// src/api.js
import axios from 'axios';

const API_BASE_URL = 'http://localhost:5000/api'; // Adjust if using a different port or deployment

/**
 * Generates dragon data using the backend AI.
 * @param {string} dragonName - The name of the dragon to generate.
 * @returns {Promise<Object>} - The generated dragon data.
 */
export const generateDragon = async (dragonName) => {
    try {
        const response = await axios.post(`${API_BASE_URL}/generate-dragon`, { dragonName });
        return response.data.dragonData;
    } catch (error) {
        console.error('Error generating dragon:', error);
        throw error;
    }
};

/**
 * Retrieves AI's decision for attacks.
 * @param {Array} aiDragons - Array of AI dragons.
 * @param {Array} playerDragons - Array of Player dragons.
 * @returns {Promise<Object>} - The AI's attack decisions.
 */
export const getAIDecision = async (aiDragons, playerDragons) => {
    try {
        const response = await axios.post(`${API_BASE_URL}/ai-decision`, { aiDragons, playerDragons });
        return response.data.aiDecision;
    } catch (error) {
        console.error('Error getting AI decision:', error);
        throw error;
    }
};
