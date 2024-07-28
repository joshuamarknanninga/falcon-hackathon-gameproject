import React from 'react';

const PlayerBoard = ({ player }) => {
  return (
    <div className="player-board">
      <div className="life-points">Life Points: {player.lifePoints}</div>
      <div className="deck">Deck ({player.deck.length} cards)</div>
      <div className="hand">
        {player.hand.map((card, index) => (
          <div key={index} className="card">{card}</div>
        ))}
      </div>
      <div className="battlefield">
        {player.battlefield.map((card, index) => (
          <div key={index} className="card">{card}</div>
        ))}
      </div>
    </div>
  );
};

export default PlayerBoard;
