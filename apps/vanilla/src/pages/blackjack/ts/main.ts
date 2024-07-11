import { Game } from './core/game';
const playersResultsHTMLCollection = document.getElementsByClassName('player-result');
const playersResultsElements = Array.from(playersResultsHTMLCollection) as HTMLElement[];
const playerCount = playersResultsElements.length;

const debugElement = document.getElementsByClassName('debug-rolls')[0] as HTMLElement;

/* Initialize the game */
const game = new Game(playerCount, 6, playersResultsElements, debugElement);

/* `Roll the dice` button event listener */
document.getElementById('roll-dice')?.addEventListener('click', () => {
	game.playTurn();
});
