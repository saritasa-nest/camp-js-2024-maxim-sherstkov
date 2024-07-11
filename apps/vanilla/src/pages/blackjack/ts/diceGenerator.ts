import { Publisher } from './publisher';
import { getRandomNumber } from './utils';

/**
 * Dice generator that rolls a die with a specified number of sides and notifies subscribers.
 */
export class DiceGenerator extends Publisher<number> {
	private sidesCount: number;

	/**
	 * Creates an instance of DiceGenerator.
	 * @param sidesCount - The number of sides on the die.
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