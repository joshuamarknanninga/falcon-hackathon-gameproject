// Abilities.js
export class Ability {
    constructor(name, description, effect) {
        this.name = name;
        this.description = description;
        this.effect = effect;  // Function that defines the ability's effect
    }

    activate(dragon, opponent) {
        this.effect(dragon, opponent);  // Apply the effect to the dragon (and optionally the opponent)
    }
}

// Fire Boost: Increases attack power by 50% for the next attack
export const fireBoostAbility = new Ability(
    'Fire Boost',
    'Increases the attack power by 50% for the next attack if the dragon is Fire element.',
    (dragon) => {
        if (dragon.element === 'fire') {
            dragon.attack *= 1.5;
            console.log(`${dragon.name} used Fire Boost! Attack increased to ${dragon.attack}`);
        }
    }
);

// Freeze: Prevents the opponent dragon from attacking for one turn
export const freezeAbility = new Ability(
    'Freeze',
    'Freezes the opponent dragon, preventing it from attacking for the next turn.',
    (dragon, opponent) => {
        if (dragon.element === 'ice') {
            opponent.isFrozen = true;  // Add a frozen status to the opponent dragon
            console.log(`${opponent.name} has been frozen by ${dragon.name}!`);
        }
    }
);

// Defense Buff: Increases defense by 3 for two turns
export const defenseBuffAbility = new Ability(
    'Defense Buff',
    'Increases defense by 3 for two turns.',
    (dragon) => {
        dragon.defense += 3;
        dragon.defenseBuffTurns = 2;  // Buff lasts for two turns
        console.log(`${dragon.name} used Defense Buff! Defense increased to ${dragon.defense}`);
    }
);
