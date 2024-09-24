// src/components/PlayerDeck.jsx
import React from 'react';
import DragonCard from './DragonCard';

const PlayerDeck = ({ player, dragons, onAttack, isPlayerTurn }) => {
  return (
    <div className="player-deck">
      <h2>{player}'s Deck</h2>
      <div className="dragon-cards">
        {dragons.map((dragon, index) => (
          <DragonCard 
            key={index} 
            dragon={dragon} 
            onAttack={() => isPlayerTurn && onAttack(dragon)} // Only allow attack on player's turn
          />
        ))}
      </div>
    </div>
  );
};

export default PlayerDeck;
