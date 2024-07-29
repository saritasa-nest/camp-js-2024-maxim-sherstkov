import { Game } from './core/game';

const playersResultsHTMLCollection = document.querySelectorAll('.player-result');
const playersResultsElements = Array.from(playersResultsHTMLCollection);
const playersCount = playersResultsElements.length;

const historyElement = document.getElementById('history-rolls');
const diceButtonElement = document.getElementById('roll-dice');

if (!historyElement || !diceButtonElement) {
	throw new Error('History or dice element not found');
}

/* Initialize the game */
const DEFAULT_DICE_COUNT = 6;
const game = new Game({
	playersCount,
	diceSidesCount: DEFAULT_DICE_COUNT,
	playerElements: playersResultsElements,
	historyElement,
	diceButtonElement,
});

game.startGame();
