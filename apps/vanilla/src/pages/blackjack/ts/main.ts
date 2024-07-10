import Game from "./game";

/* Initialize the game*/
const game = new Game(2, 6);

document.getElementById('roll-dice').addEventListener('click', () => {
    game.playTurn();
});