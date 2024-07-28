import React, { useState } from 'react';
import PlayerBoard from './PlayerBoard';

const GameBoard = () => {
  const [players, setPlayers] = useState([
    { id: 1, lifePoints: 20, deck: Array(32).fill('Card'), hand: [], battlefield: [] },
    { id: 2, lifePoints: 20, deck: Array(32).fill('Card'), hand: [], battlefield: [] },
  ]);

  const startGame = () => {
    // Draw initial hand for each player
    setPlayers(players.map(player => ({
      ...player,
      hand: player.deck.slice(0, 5),
      deck: player.deck.slice(5),
    })));
  };

  return (
    <div id="game-board">
      {players.map(player => (
        <PlayerBoard key={player.id} player={player} />
      ))}
      <button onClick={startGame}>Start Game</button>
    </div>
  );
};

export default GameBoard;
