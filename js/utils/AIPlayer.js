// Enhanced AIPlayer.js
import { Dragon } from '../models/Dragon.js';
import { healingAbility, shieldAbility, fireBoostAbility, freezeAbility, defenseBuffAbility } from './Abilities.js';

export class AIPlayer {
    constructor() {
        this.deck = [];
        this.hand = [];
        this.initializeDeck();
    }

    initializeDeck() {
        // AI generates a set of dragons with abilities
        const fireDrake = new Dragon("AI Fire Drake", 7, 4, 35, 'fire', 'assets/images/fire_drake.png');
        const iceWyvern = new Dragon("AI Ice Wyvern", 6, 5, 40, 'ice', 'assets/images/ice_wyvern.png');
        
        // Add new abilities to dragons
        fireDrake.addAbility(healingAbility);
        fireDrake.addAbility(fireBoostAbility);  // Fire Boost ability
        iceWyvern.addAbility(freezeAbility);     // Freeze ability
        iceWyvern.addAbility(defenseBuffAbility);

        this.deck.push(fireDrake);
        this.deck.push(iceWyvern);
    }

    chooseAction(opponent) {
        const aiDragon = this.deck[0];  // AI always uses its first dragon
        const opponentDragon = opponent.deck[0];

        // Apply turn-based effects (e.g., defense buffs or frozen status)
        aiDragon.applyTurnEffects();

        // Check if AI dragon is frozen
        if (aiDragon.isFrozen) {
            return { type: 'skip', dragon: aiDragon };  // Skip turn if frozen
        }

        // Check if AI dragon's health is low; if so, it might heal
        if (aiDragon.health < 20 && aiDragon.abilities.some(a => a.name === 'Heal')) {
            return { type: 'ability', dragon: aiDragon, ability: 'Heal' };
        }

        // Use Fire Boost if it's a fire dragon and ready to attack
        if (aiDragon.element === 'fire' && aiDragon.abilities.some(a => a.name === 'Fire Boost')) {
            return { type: 'ability', dragon: aiDragon, ability: 'Fire Boost' };
        }

        // Freeze opponent if AI dragon is an Ice dragon and the opponent is stronger
        if (aiDragon.element === 'ice' && opponentDragon.attack > aiDragon.defense && aiDragon.abilities.some(a => a.name === 'Freeze')) {
            return { type: 'ability', dragon: aiDragon, ability: 'Freeze' };
        }

        // Use Defense Buff if AI's defense is weaker than the opponent's attack
        if (aiDragon.defense < opponentDragon.attack && aiDragon.abilities.some(a => a.name === 'Defense Buff')) {
            return { type: 'ability', dragon: aiDragon, ability: 'Defense Buff' };
        }

        // Add randomness: AI has a 20% chance to randomly defend
        if (Math.random() < 0.2) {
            return { type: 'defend', dragon: aiDragon };
        }

        // Default to attack if no other action is taken
        return { type: 'attack', dragon: aiDragon };
    }

    performAction(action, opponent) {
        if (action.type === 'attack') {
            const damage = action.dragon.attackDragon(opponent);
            console.log(`AI attacks for ${damage} damage.`);
        } else if (action.type === 'defend') {
            console.log('AI chooses to defend.');
        } else if (action.type === 'ability') {
            action.dragon.useAbility(action.ability, opponent);
        } else if (action.type === 'skip') {
            console.log(`${action.dragon.name} skips its turn because it is frozen.`);
        }
    }
}
