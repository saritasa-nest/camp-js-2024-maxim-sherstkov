import { ResultDisplayer } from '../views/resultDisplayer';

import { WinnerDisplayer } from '../views/winnerDisplayer';

import { DebugDisplayer } from '../views/debugDisplayer';

import { TurnGenerator } from './turnGenerator';
import { Player } from './player';
import { DiceGenerator } from './diceGenerator';
import { Publisher } from './publisher';

/**
 * Game class that manages the game logic and UI updates.
 *
 * @class Game
 * @typedef {Game}
 */
export class Game {
	private readonly players: Player[];

	private readonly turnGenerator$: TurnGenerator;

	private readonly diceGenerator$: DiceGenerator;

	private readonly debugPublisher$: Publisher<number>;

	private readonly debugDisplayer: DebugDisplayer;

	/**
	 * Creates an instance of Game.
	 * @param playersCount - The number of players.
	 * @param diceSidesCount - The number of sides on the dice.
	 * @param playerElements - Array of HTML elements to display player results.
	 * @param debugElement - The HTML element to display debug information.
	 */
	public constructor(playersCount: number, diceSidesCount: number, playerElements: HTMLElement[], debugElement: HTMLElement) {
		this.players = new Array(playersCount).fill(null)
			.map(() => new Player());
		this.turnGenerator$ = new TurnGenerator(playersCount);
		this.diceGenerator$ = new DiceGenerator(diceSidesCount);
		this.debugPublisher$ = new Publisher<number>();
		this.debugDisplayer = new DebugDisplayer(debugElement);

		this.players.forEach((player, index) => {
			const resultDisplayer = new ResultDisplayer(playerElements[index]);

			const winnerDisplayer = new WinnerDisplayer(playerElements[index]);

			player.results$.subscribe(resultDisplayer);
			player.winStatus$.subscribe(winnerDisplayer);
		});

		this.turnGenerator$.subscribe({
			update: (currentPlayerIndex: number) => {
				const currentPlayer = this.players[currentPlayerIndex];

				/* Unsubscribe all players from DiceGenerator */
				this.players.forEach(player => this.diceGenerator$.unsubscribe(player));

				/* Subscribe the current player to DiceGenerator */
				this.diceGenerator$.subscribe(currentPlayer);

				/* Roll the dice for the current player */
				const diceResult = this.diceGenerator$.roll();

				/* Sends result of the roll to debug subscribers */
				this.debugPublisher$.notify(diceResult);
			},
		});

		this.debugPublisher$.subscribe(this.debugDisplayer);
	}

	/**
	 * Plays a turn by executing turnGenerator's method.
	 */
	public playTurn(): void {
		this.turnGenerator$.next();
	}
}
