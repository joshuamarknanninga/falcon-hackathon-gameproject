import { Dragon } from '../models/Dragon.js';
import { GameView } from '../views/GameView.js';
import { BattleSystem } from '../utils/BattleSystem.js';
import { AIPlayer } from '../utils/AIPlayer.js';
import { DragonCreator } from '../utils/DragonCreator.js';

export class GameController {
    constructor() {
        this.view = new GameView(this);
        this.startBattleButton = document.getElementById('start-battle');
        this.dragonLog = document.getElementById('dragon-log');
        this.battleLog = document.getElementById('battle-log');
        this.createDragonButton = document.getElementById('create-dragon');

        // Initialize AI player
        this.aiPlayer = new AIPlayer();

        // Event listeners
        this.startBattleButton.addEventListener('click', () => this.startBattle());
        this.createDragonButton.addEventListener('click', () => this.createDragon());
        this.initializeGame();
    }

    initializeGame() {
        // Initialize player deck
        this.player1 = new Dragon('Fire Drake', 8, 5, 40, 'fire', 'assets/images/fire_drake.png');

        // Render decks
        this.view.renderDeck('player1-deck', [this.player1]);
        this.view.renderDeck('player2-deck', this.aiPlayer.deck);  // Render AI deck
    }

    async createDragon() {
        this.logMessage('Generating a new dragon...');
        try {
            const dragonData = await DragonCreator.generateDragon();
            const newDragon = new Dragon(
                dragonData.name,
                dragonData.attack,
                dragonData.defense,
                dragonData.health,
                dragonData.element,
                dragonData.image
            );
            this.view.renderNewDragon(newDragon);
            this.logMessage(`New dragon "${newDragon.name}" created and added to your deck!`);
        } catch (error) {
            this.logMessage(`Error: ${error.message}`);
        }
    }

    startBattle() {
        let round = 1;
        const player1 = this.player1;
        const ai = this.aiPlayer;

        while (!player1.isDefeated() && !ai.deck[0].isDefeated()) {
            this.logMessage(`--- Round ${round} ---`);

            // Player 1 attacks first
            let damage = player1.attackDragon(ai.deck[0]);
            this.logMessage(`${player1.name} attacks ${ai.deck[0].name} for ${damage} damage. (${ai.deck[0].health} HP left)`);

            if (ai.deck[0].isDefeated()) {
                this.logMessage(`${ai.deck[0].name} has been defeated! ${player1.name} wins!`);
                break;
            }

            // AI chooses an action
            const action = ai.chooseAction({ deck: [player1] });
            ai.performAction(action, player1);

            if (player1.isDefeated()) {
                this.logMessage(`${player1.name} has been defeated! AI wins!`);
                break;
            }

            round++;
        }

        this.startBattleButton.disabled = true;
    }

    logMessage(message) {
        const p = document.createElement('p');
        p.textContent = message;
        this.battleLog.appendChild(p);
        this.battleLog.scrollTop = this.battleLog.scrollHeight;
    }
}

