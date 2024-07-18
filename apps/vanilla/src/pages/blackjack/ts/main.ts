import { Game } from './core/game';

const playersResultsHTMLCollection = document.querySelectorAll<HTMLElement>('.player-result');
const playersResultsElements = Array.from(playersResultsHTMLCollection);
const playersCount = playersResultsElements.length;

const historyElement = <HTMLElement>document.getElementById('history-rolls');
const diceButtonElement = <HTMLElement>document.getElementById('roll-dice');

/* Initialize the game */
const DEFAULT_DICE_COUNT = 6;
const gameConstructorData = {
	playersCount,
	diceSidesCount: DEFAULT_DICE_COUNT,
	playerElements: playersResultsElements,
	historyElement,
	diceButtonElement,
};
const game = new Game(gameConstructorData);

game.startGame();
