const newGame = new Yahtzee();

document.querySelector('#start-game').addEventListener('click', () => newGame.startGame() );
document.querySelector('#roll-dice').addEventListener('click', () => newGame.rollDice() );