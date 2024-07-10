import Publisher from './publisher';

/**
 * Turn generator that cycles through turns.
 *
 * @class TurnGenerator
 * @typedef {TurnGenerator}
 */
export default class TurnGenerator {
	public playersCount: number;

	public currentPlayerIndex = 0;

	public turnGeneratorPublisher = new Publisher<number>();

	/**
	 * Creates an instance of TurnGenerator.
	 * @param playersCount - The number of players.
	 */
	constructor(playersCount: number) {
		this.playersCount = playersCount;
	}

	next(): void {
		// TODO Refactor
		this.currentPlayerIndex = (this.currentPlayerIndex + 1) % this.playersCount;
		this.turnGeneratorPublisher.notify(this.currentPlayerIndex);
	}
}
