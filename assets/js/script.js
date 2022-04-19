const newGame = new Yahtzee();

// --- Events --- //
document.querySelector('#start-game').addEventListener('click', () => newGame.startGame() );
document.querySelector('#roll-dice').addEventListener('click', () => newGame.reRollDice() );
document.querySelector('#end-game').addEventListener('click', () => newGame.endGame() );