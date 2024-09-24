export class Dragon {
    constructor(name, attack, defense, health, element, image) {
        this.name = name;
        this.attack = attack;
        this.defense = defense;
        this.health = health;
        this.element = element;
        this.image = image;
        this.abilities = [];         // Array of abilities
        this.isFrozen = false;       // Track if the dragon is frozen
        this.defenseBuffTurns = 0;   // Track how many turns the defense buff is active
    }

    addAbility(ability) {
        this.abilities.push(ability);
    }

    // Use a specific ability
    useAbility(abilityName, opponent) {
        const ability = this.abilities.find(a => a.name === abilityName);
        if (ability) {
            ability.activate(this, opponent);  // Activate the ability
        }
    }

    // Apply temporary effects like defense buffs and freezing
    applyTurnEffects() {
        if (this.isFrozen) {
            this.isFrozen = false;  // Unfreeze after missing one turn
            console.log(`${this.name} is no longer frozen!`);
        }

        if (this.defenseBuffTurns > 0) {
            this.defenseBuffTurns -= 1;
            if (this.defenseBuffTurns === 0) {
                this.defense -= 3;  // Remove the defense buff after two turns
                console.log(`${this.name}'s Defense Buff has worn off! Defense reduced to ${this.defense}`);
            }
        }
    }

    attackDragon(opponent) {
        if (this.isFrozen) {
            console.log(`${this.name} is frozen and cannot attack!`);
            return 0;  // No damage dealt while frozen
        }

        let damage = Math.max(this.attack - opponent.defense, 0);
        
        // Elemental advantage logic
        if (this.element === 'fire' && opponent.element === 'ice') {
            damage *= 1.5;  // Fire is strong against Ice
        } else if (this.element === 'ice' && opponent.element === 'fire') {
            damage *= 0.8;  // Ice is weak against Fire
        }

        opponent.health -= damage;
        return damage;
    }

    isDefeated() {
        return this.health <= 0;
    }
}
