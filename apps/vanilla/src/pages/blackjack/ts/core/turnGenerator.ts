import { Publisher } from './publisher';

/**
 * Turn generator that cycles through players turns and notifies subscribers.
 * @augments Publisher<number>
 */
export class TurnGenerator extends Publisher<number> {
	private readonly playersCount: number;

	private currentPlayerIndex = 0;

	/**
	 * Creates an instance of TurnGenerator.
	 * @param playersCount - The number of players.
	 */
	public constructor(playersCount: number) {
		super();
		this.playersCount = playersCount;
	}

	/**
	 * Moves to the next player's turn and notifies subscribers.
	 */
	public next(): void {
		const playerIndex = this.currentPlayerIndex;
		this.currentPlayerIndex = (this.currentPlayerIndex + 1) % this.playersCount;
		this.notify(playerIndex);
	}
}
