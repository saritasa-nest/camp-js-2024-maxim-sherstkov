import TurnGenerator from './turnGenerator';
import Player from './player';

/**
 * Game class.
 *
 * @export
 * @class Game
 * @typedef {Game}
 */
export default class Game {
	public turnGenerator: TurnGenerator;

	private players: Player[];

	// private DiceGenerator;

	constructor(playersCount: number, sidesCount: number) {
		this.turnGenerator = new TurnGenerator(playersCount);
		this.players = Array.from({ length: playersCount }, () => new Player());
		this.turnGenerator.turnGeneratorPublisher.subscribe(this.players[0])
			
	}

	/**
	 * Roll the dice.
	 */
	public playTurn(): void {
		console.log('playing turn');
		this.turnGenerator.next();
	}
}
