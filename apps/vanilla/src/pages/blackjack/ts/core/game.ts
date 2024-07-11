import { ResultDisplayer } from '../views/resultDisplayer';

import { WinnerDisplayer } from '../views/winnerDisplayer';

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
	private players: Player[];

	private turnGenerator: TurnGenerator;

	private diceGenerator: DiceGenerator;

	private allRollsPublisher: Publisher<number>;

	/**
	 * Creates an instance of Game.
	 * @param playersCount - The number of players.
	 * @param diceSidesCount - The number of sides on the dice.
	 * @param playerElements - Array of HTML elements to display player results.
	 * @param debugElement - The HTML element to display debug information.
	 */
	public constructor(playersCount: number, diceSidesCount: number, playerElements: HTMLElement[]) {
		this.players = new Array(playersCount).fill(null)
			.map(() => new Player());
		this.turnGenerator = new TurnGenerator(playersCount);
		this.diceGenerator = new DiceGenerator(diceSidesCount);
		this.allRollsPublisher = new Publisher<number>();

		this.players.forEach((player, index) => {
			const resultDisplayer = new ResultDisplayer(playerElements[index]);
			const winnerDisplayer = new WinnerDisplayer(playerElements[index]);

			player.results.subscribe(resultDisplayer);
			player.winStatus.subscribe(winnerDisplayer);
		});

		this.turnGenerator.subscribe({
			update: (currentPlayerIndex: number) => {
				const currentPlayer = this.players[currentPlayerIndex];

				// Unsubscribe all players from DiceGenerator
				this.players.forEach(player => this.diceGenerator.unsubscribe(player));

				// Subscribe the current player to DiceGenerator
				this.diceGenerator.subscribe(currentPlayer);

				// Roll the dice for the current player
				const diceResult = this.diceGenerator.roll();
				this.allRollsPublisher.notify(diceResult);
			},
		});
	}

	/**
	 * Roll the dice.
	 */
	public playTurn(): void {
		this.turnGenerator.next();
	}
}
