import { Game } from './core/game';

const playersResultsHTMLCollection = document.getElementsByClassName('player-result');
const playersResultsElements = Array.from(playersResultsHTMLCollection) as HTMLElement[];
const playersCount = playersResultsElements.length;

const historyElement = document.getElementsByClassName('history-rolls')[0] as HTMLElement;

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
