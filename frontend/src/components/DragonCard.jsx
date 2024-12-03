// src/components/DragonCard.jsx
import React from 'react';

const DragonCard = ({ dragon, onAttack }) => {
  return (
    <div className="dragon-card" onClick={onAttack}>
      <img src={dragon.image} alt={dragon.name} />
      <h3>{dragon.name}</h3>
      <p>Attack: {dragon.attack}</p>
      <p>Defense: {dragon.defense}</p>
      <p>Health: {dragon.health}</p>
      <p className="description">{dragon.description}</p>
    </div>
  );
};

export default DragonCard;
