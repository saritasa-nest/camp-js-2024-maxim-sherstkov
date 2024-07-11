import { TSubscriber } from '../utils/subscriber';

import { Publisher } from './publisher';

/**
 * Player class that tracks dice results and win status.
 * @implements {TSubscriber<number>}
 * @augments Publisher<number>
 */
export class Player implements TSubscriber<number> {
	private readonly diceResults: number[] = [];

	/**
	 * Shows the result of all rolls for current player.
	 * @type {Publisher<number[]>}
	 */
	public results$: Publisher<number[]> = new Publisher<number[]>();

	/**
	 * Indicates whether the current player is winning or not.
	 * @type {Publisher<boolean>}
	 */
	public winStatus$: Publisher<boolean> = new Publisher<boolean>();

	/**
	 * Adds a dice result to the player's results and notifies subscribers.
	 * @param result - The result of the dice roll.
	 */
	private addDiceResult(result: number): void {
		this.diceResults.push(result);
		this.results$.notify(this.diceResults);
	}

	/**
	 * Checks if the player has won (total >= 21) and notifies subscribers.
	 */
	private checkWinStatus(): void {
		const total = this.diceResults.reduce((a, b) => a + b, 0);
		if (total >= 21) {
			this.winStatus$.notify(true);
		} else {
			this.winStatus$.notify(false);
		}
	}

	/**
	 * Handles updates from DiceGenerator (dice roll results).
	 * @param result - The result of the dice roll.
	 */
	public update(result: number): void {
		this.addDiceResult(result);
		this.checkWinStatus();
	}
}
