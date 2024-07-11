import { getRandomNumber } from '../utils/utils';

import { Publisher } from './publisher';

/**
 * Dice generator that rolls a dice with a specified number of sides and notifies subscribers.
 *
 * @augments Publisher<number>
 */
export class DiceGenerator extends Publisher<number> {
	private readonly sidesCount: number;

	/**
	 * Creates an instance of DiceGenerator.
	 * @param sidesCount - The number of sides on the dice.
	 */
	public constructor(sidesCount: number) {
		super();
		this.sidesCount = sidesCount;
	}

	/**
	 * Roll the dice and notifies subscribers.
	 * @returns The result of the roll.
	 */
	public roll(): number {
		const result = getRandomNumber(this.sidesCount);
		this.notify(result);
		return result;
	}
}
