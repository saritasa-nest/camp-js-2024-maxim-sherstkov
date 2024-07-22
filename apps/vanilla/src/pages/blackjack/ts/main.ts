import { Game } from './core/game';

const playersResultsHTMLCollection = document.querySelectorAll<HTMLDivElement>('.player-result');
const playersResultsElements = Array.from(playersResultsHTMLCollection);
const playersCount = playersResultsElements.length;

const historyElement = <HTMLDivElement>document.getElementById('history-rolls');
const diceButtonElement = <HTMLButtonElement>document.getElementById('roll-dice');

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
