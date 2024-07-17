import { Game } from './core/game';

const playersResultsHTMLCollection = document.querySelectorAll<HTMLElement>('.player-result');
const playersResultsElements = Array.from(playersResultsHTMLCollection);
const playersCount = playersResultsElements.length;

const historyElement = <HTMLElement>document.getElementsByClassName('history-rolls')[0];

/* Initialize the game */
const DEFAULT_DICE_COUNT = 6;
const gameConstructorData = {
	playersCount,
	diceSidesCount: DEFAULT_DICE_COUNT,
	playerElements: playersResultsElements,
	historyElement,
};
const game = new Game(gameConstructorData);

/* `Roll the dice` button event listener */
document.getElementById('roll-dice')?.addEventListener('click', () => {
	game.playTurn();
});
