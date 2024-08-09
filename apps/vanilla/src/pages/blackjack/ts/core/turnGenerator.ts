import { Publisher } from './publisher';

/**
 * Class that can cycle through players turns and notifies subscribers.
 */
export class TurnGenerator extends Publisher<number> {
	private readonly playersCount: number;

	private currentPlayerIndex = 0;

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