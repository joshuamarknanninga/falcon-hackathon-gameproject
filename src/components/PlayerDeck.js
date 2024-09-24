const handleAttack = (dragon) => {
    const damage = Math.floor(Math.random() * dragon.attack);  // Simulate damage
    const updatedDragons = dragons.map(d => 
      d.name === dragon.name ? { ...d, health: d.health - damage } : d
    );
    setDragons(updatedDragons);
    addLogEntry(`${player}'s ${dragon.name} attacks for ${damage} damage!`);
  };
  