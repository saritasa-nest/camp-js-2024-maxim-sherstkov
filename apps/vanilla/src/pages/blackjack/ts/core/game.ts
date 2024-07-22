import { ResultDisplayer } from '../views/resultDisplayer';

import { WinnerDisplayer } from '../views/winnerDisplayer';

import { HistoryDisplayer } from '../views/historyDisplayer';

import { getTotalSum } from '../utils/utils';

import { TurnGenerator } from './turnGenerator';
import { Player } from './player';
import { DiceGenerator } from './diceGenerator';
import { Publisher } from './publisher';

/**
 * Type for Game class constructor.
 */
type GameConstructorData = {

	/** The number of players. */
	readonly playersCount: number;

	/** The number of sides on the dice. */
	readonly diceSidesCount: number;

	/** Array of HTML elements to display player results. */
	readonly playerElements: HTMLDivElement[];

	/** The HTML element to display history of rolls. */
	readonly historyElement: HTMLDivElement;

	/** The button to roll the dice. */
	readonly diceButtonElement: HTMLButtonElement;
};

/**
 * Game class that manages the game logic and UI updates.
 * @param GameConstructorData - Params needed for the Game class instance.
 */
export class Game {
	private readonly players: readonly Player[];

	private readonly turnGenerator$: TurnGenerator;

	private readonly diceGenerator$: DiceGenerator;

	private readonly historyPublisher$: Publisher<number>;

	private readonly historyDisplayer: HistoryDisplayer;

	private isGameEnded: boolean;

	private readonly rollDiceButton: HTMLButtonElement;

	private bondedPlayTurn: () => void;

	public constructor(constructorData: GameConstructorData) {
		this.players = new Array(constructorData.playersCount).fill(null)
			.map(() => new Player());
		this.turnGenerator$ = new TurnGenerator(constructorData.playersCount);
		this.diceGenerator$ = new DiceGenerator(constructorData.diceSidesCount);
		this.historyPublisher$ = new Publisher<number>();
		this.historyDisplayer = new HistoryDisplayer(constructorData.historyElement);
		this.isGameEnded = false;
		this.rollDiceButton = constructorData.diceButtonElement;

		/** Bounded playTurn version for add/remove eventlistener on rollDiceButton. */
		this.bondedPlayTurn = this.playTurn.bind(this);

		this.players.forEach((player, index) => {
			const resultDisplayer = new ResultDisplayer(constructorData.playerElements[index]);

			const winnerDisplayer = new WinnerDisplayer(constructorData.playerElements[index]);

			player.results$.subscribe(resultDisplayer);
			player.winStatus$.subscribe(winnerDisplayer);

			player.results$.subscribe({
				update: (diceResults: number[]) => {
					this.evaluateGameResult(diceResults, player);
				},
			});
		});

		this.turnGenerator$.subscribe({
			update: (currentPlayerIndex: number) => {
				if (this.isGameEnded) {
					return;
				}

				const currentPlayer = this.players[currentPlayerIndex];

				/* Unsubscribe all players from DiceGenerator */
				this.players.forEach(player => this.diceGenerator$.unsubscribe(player));

				/* Subscribe the current player to DiceGenerator */
				this.diceGenerator$.subscribe(currentPlayer);

				/* Roll the dice for the current player */
				const diceResult = this.diceGenerator$.roll();

				/* Sends result of the roll to history subscribers */
				this.historyPublisher$.notify(diceResult);
			},
		});

		this.historyPublisher$.subscribe(this.historyDisplayer);
	}

	/**
	 * Plays a turn by executing turnGenerator's method.
	 */
	public playTurn(): void {
		this.turnGenerator$.next();
	}

	/** Starts the game by binding playTurn function to click event of rollDiceButton. */
	public startGame(): void {
		this.rollDiceButton?.addEventListener('click', this.bondedPlayTurn);
	}

	/**
	 * Checks if a player has won and ends the game if true.
	 * @param diceResults - Player rolls results.
	 * @param player - The player to check win status for.
	 */
	private evaluateGameResult(diceResults: readonly number[], player: Player): void {

		const total = getTotalSum(diceResults);
		this.checkGameEnd(total);
		player.winStatus$.notify(total >= 21);
	}

	/**
	 * Check if game has ended and then unsubscribe players from diceGenerator.
	 * @param total Sum of results for the player.
	 */
	private checkGameEnd(total: number): void {
		if (total >= 21) {
			this.isGameEnded = true;
			this.players.forEach(currentPlayer => this.diceGenerator$.unsubscribe(currentPlayer));
			this.rollDiceButton?.removeEventListener('click', this.bondedPlayTurn);
		}
	}
}
