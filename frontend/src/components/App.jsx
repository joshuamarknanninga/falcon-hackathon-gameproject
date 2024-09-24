// src/components/App.jsx
import React, { useState, useEffect } from 'react';
import PlayerDeck from './PlayerDeck';
import BattleLog from './BattleLog';
import { generateDragon, getAIDecision } from '../api';
import './styles.css';

const App = () => {
  const [battleLog, setBattleLog] = useState([]);
  const [turn, setTurn] = useState('Player 1'); // 'Player 1' or 'AI'
  
  const [playerLife, setPlayerLife] = useState(20);
  const [aiLife, setAiLife] = useState(20);

  const [playerDragons, setPlayerDragons] = useState([]);
  const [aiDragons, setAiDragons] = useState([]);

  // Initialize dragons on component mount
  useEffect(() => {
    const initializeDragons = async () => {
      try {
        // Generate Player Dragons
        const playerDragon1Data = await generateDragon('Fire Drake');
        const playerDragon2Data = await generateDragon('Ember Phoenix');
        const playerDragonsParsed = [
          parseDragonData(playerDragon1Data, 'fire_drake.png'),
          parseDragonData(playerDragon2Data, 'ember_phoenix.png')
        ];
        setPlayerDragons(playerDragonsParsed);

        // Generate AI Dragons
        const aiDragon1Data = await generateDragon('Ice Wyvern');
        const aiDragon2Data = await generateDragon('Glacial Colossus');
        const aiDragonsParsed = [
          parseDragonData(aiDragon1Data, 'ice_wyvern.png'),
          parseDragonData(aiDragon2Data, 'glacial_colossus.png')
        ];
        setAiDragons(aiDragonsParsed);

        addLogEntry('Dragons have been summoned!');
      } catch (error) {
        addLogEntry('Error initializing dragons.');
      }
    };

    initializeDragons();
  }, []);

  /**
   * Parses the dragon data returned from the AI.
   * @param {string} data - Raw dragon data from AI.
   * @param {string} imageName - Image filename for the dragon.
   * @returns {Object} - Parsed dragon object.
   */
  const parseDragonData = (data, imageName) => {
    // Example AI response format:
    // Name: Fire Drake
    // Attack: 8
    // Defense: 5
    // Health: 40
    // Description: A fierce dragon engulfed in flames.
    
    const lines = data.split('\n');
    const name = lines[0].replace('Name: ', '').trim();
    const attack = parseInt(lines[1].replace('Attack: ', '').trim());
    const defense = parseInt(lines[2].replace('Defense: ', '').trim());
    const health = parseInt(lines[3].replace('Health: ', '').trim());
    const description = lines.slice(4).join(' ').replace('Description: ', '').trim();

    return {
      name,
      attack,
      defense,
      health,
      description,
      image: `/assets/images/${imageName}`, // Ensure images are placed correctly
    };
  };

  /**
   * Adds a new entry to the battle log.
   * @param {string} entry - The log entry to add.
   */
  const addLogEntry = (entry) => {
    setBattleLog((prevLog) => [...prevLog, entry]);
  };

  /**
   * Handles player's attack action.
   * @param {Object} playerDragon - The dragon the player is using to attack.
   */
  const handlePlayerAttack = (playerDragon) => {
    if (turn !== 'Player 1') return; // Only allow attack on player's turn

    // Select the first AI dragon as the target
    const targetDragon = aiDragons[0];
    if (!targetDragon) {
      addLogEntry('No AI dragons to attack.');
      return;
    }

    const damage = Math.floor(Math.random() * playerDragon.attack) + 1; // Ensure at least 1 damage
    const updatedAiDragons = aiDragons.map((dragon, index) =>
      index === 0 ? { ...dragon, health: dragon.health - damage } : dragon
    );

    addLogEntry(`Player 1's ${playerDragon.name} attacks AI's ${targetDragon.name} for ${damage} damage!`);
    setAiDragons(updatedAiDragons);
    setTurn('AI'); // Pass turn to AI

    if (updatedAiDragons[0].health <= 0) {
      addLogEntry(`AI's ${updatedAiDragons[0].name} has been defeated!`);
      const remainingAiDragons = updatedAiDragons.filter(dragon => dragon.health > 0);
      setAiDragons(remainingAiDragons);

      if (remainingAiDragons.length === 0) {
        addLogEntry('Player 1 wins the battle!');
        return; // End the game
      }
    }

    // Trigger AI's turn after player's attack
    setTimeout(() => aiTurn(), 1000); // Delay AI turn for 1 second
  };

  /**
   * Executes the AI's turn using AI decisions.
   */
  const aiTurn = async () => {
    if (aiDragons.length === 0) return; // No AI dragons to act

    try {
      const decisionText = await getAIDecision(aiDragons, playerDragons);
      const decision = JSON.parse(decisionText);

      if (decision.attacks && Array.isArray(decision.attacks)) {
        decision.attacks.forEach((attack) => {
          const { attacker, target, damage } = attack;
          const aiDragon = aiDragons.find(d => d.name === attacker);
          if (!aiDragon) return;

          if (target === 'Life Points') {
            setPlayerLife(prev => {
              const newLife = prev - damage;
              addLogEntry(`AI's ${aiDragon.name} attacks Player 1's Life Points for ${damage} damage!`);
              if (newLife <= 0) {
                addLogEntry('AI wins the battle!');
              }
              return newLife;
            });
          } else {
            const playerDragon = playerDragons.find(d => d.name === target);
            if (playerDragon) {
              const updatedPlayerDragons = playerDragons.map(d =>
                d.name === target ? { ...d, health: d.health - damage } : d
              );
              setPlayerDragons(updatedPlayerDragons);
              addLogEntry(`AI's ${aiDragon.name} attacks Player 1's ${playerDragon.name} for ${damage} damage!`);

              if (playerDragon.health - damage <= 0) {
                addLogEntry(`Player 1's ${playerDragon.name} has been defeated!`);
                const remainingPlayerDragons = updatedPlayerDragons.filter(d => d.health > 0);
                setPlayerDragons(remainingPlayerDragons);

                if (remainingPlayerDragons.length === 0) {
                  addLogEntry('AI wins the battle!');
                }
              }
            }
          }
        });
      }

      setTurn('Player 1'); // Pass turn back to player
    } catch (error) {
      console.error('Error during AI turn:', error);
      addLogEntry('AI encountered an error and skips its turn.');
      setTurn('Player 1'); // Ensure the game continues even if AI fails
    }
  };

  return (
    <div className="game-container">
      <h1>Dragon Battle Card Game</h1>
      
      <div className="life-points">
        <h2>Player 1 Life Points: {playerLife}</h2>
        <h2>AI Life Points: {aiLife}</h2>
      </div>

      <div className="game-area">
        <PlayerDeck
          player="Player 1"
          dragons={playerDragons}
          onAttack={handlePlayerAttack}
          isPlayerTurn={turn === 'Player 1'}
        />
        <PlayerDeck
          player="AI"
          dragons={aiDragons}
          isPlayerTurn={false}
        />
      </div>
      
      <BattleLog log={battleLog} />
    </div>
  );
};

export default App;
