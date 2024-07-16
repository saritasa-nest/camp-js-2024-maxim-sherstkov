import { getRandomNumber } from '../utils/utils';

import { Publisher } from './publisher';

/**
 * Dice generator that rolls a dice with a specified number of sides and notifies subscribers.
 */
export class DiceGenerator extends Publisher<number> {
	private readonly sidesCount: number;

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
