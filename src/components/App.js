// src/App.js
import React, { useState } from 'react';
import PlayerDeck from './components/PlayerDeck';
import BattleLog from './components/BattleLog';
import './styles.css';

const App = () => {
  const [battleLog, setBattleLog] = useState([]);

  const addLogEntry = (entry) => {
    setBattleLog([...battleLog, entry]);
  };

  return (
    <div className="game-container">
      <h1>Dragon Battle Card Game</h1>
      <div className="game-area">
        <PlayerDeck player="Player 1" addLogEntry={addLogEntry} />
        <PlayerDeck player="Player 2" addLogEntry={addLogEntry} />
      </div>
      <BattleLog log={battleLog} />
    </div>
  );
};

export default App;
