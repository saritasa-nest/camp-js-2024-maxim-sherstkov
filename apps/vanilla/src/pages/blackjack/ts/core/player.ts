import { Subscriber } from '../utils/subscriber';

import { Publisher } from './publisher';

/**
 * Player class that tracks dice results and win status.
 */
export class Player implements Subscriber<number> {
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

	/** @inheritdoc */
	public update(result: number): void {
		this.addDiceResult(result);
	}
}
