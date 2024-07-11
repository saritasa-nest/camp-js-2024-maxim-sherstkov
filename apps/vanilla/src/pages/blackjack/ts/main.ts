import { Game } from './game';

// TODO make grabbing 'em by tagnames depends on `player-results` in html
const playersResultsElements = [
	document.getElementById('player1-results'),
	document.getElementById('player2-results'),
];

/* Initialize the game*/
const game = new Game(2, 6, playersResultsElements);

/* Roll the dice button event listener */
document.getElementById('roll-dice')?.addEventListener('click', () => {
	game.playTurn();
});
