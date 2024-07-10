import TurnGenerator from './turnGenerator';

/**
 * Game class.
 *
 * @export
 * @class Game
 * @typedef {Game}
 */
export default class Game {
	private turnGenerator: TurnGenerator;

	// private DiceGenerator;

	constructor(playersCount: number, sidesCount: number) {
		this.turnGenerator = new TurnGenerator(playersCount);
	}

	/**
	 * Roll the dice.
	 */
	public playTurn(): void {
		console.log('playing turn');
	}
}
