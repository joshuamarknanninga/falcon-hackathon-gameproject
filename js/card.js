class Card {
    constructor(name, type) {
        this.name = name;
        this.type = type;
    }
}

class DragonCard extends Card {
    constructor(name, tribe, atk, def, hp, abilities) {
        super(name, 'Dragon');
        this.tribe = tribe;
        this.atk = atk;
        this.def = def;
        this.hp = hp;
        this.abilities = abilities;
    }
}

class SpellCard extends Card {
    constructor(name, effect) {
        super(name, 'Spell');
        this.effect = effect;
    }
}

class ArtifactCard extends Card {
    constructor(name, effect) {
        super(name, 'Artifact');
        this.effect = effect;
    }
}

class LocationCard extends Card {
    constructor(name, effect) {
        super(name, 'Location');
        this.effect = effect;
    }
}
