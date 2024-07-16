import { TSubscriber } from '../utils/subscriber';

import { Publisher } from './publisher';

/**
 * Player class that tracks dice results and win status.
 *
 */
export class Player implements TSubscriber<number> {
	private readonly diceResults: number[] = [];

	/**
	 * Shows the result of all rolls for current player.
	 */
	public results$: Publisher<number[]> = new Publisher<number[]>();

	/**
	 * Indicates whether the current player is winning or not.
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
		const total = this.diceResults.reduce((acc, curr) => acc + curr, 0);
		this.winStatus$.notify(total >= 21);
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
