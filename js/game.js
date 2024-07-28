class Game {
    constructor() {
        this.players = [new Player(1), new Player(2)];
        this.currentPlayerIndex = 0;
    }

    start() {
        console.log('Starting the game');
        // Initial game setup
        this.players.forEach(player => player.drawInitialHand());
        this.updateGameState();
    }

    updateGameState() {
        console.log('Updating game state');
        // Update the game state on the UI
        this.players.forEach(player => player.updateUI());
    }

    nextTurn() {
        this.currentPlayerIndex = (this.currentPlayerIndex + 1) % 2;
        this.updateGameState();
    }
}

