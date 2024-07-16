import { TSubscriber } from '../utils/subscriber';

/**
 * WinnerDisplayer class that updates the UI to indicate the winner.
 * @implements {TSubscriber<boolean>}
 */
export class WinnerDisplayer implements TSubscriber<boolean> {
	private readonly playerElement: HTMLElement;

	public constructor(playerElement: HTMLElement) {
		this.playerElement = playerElement;
	}

	/**
	 * Updates the UI to indicate the winner.
	 * @param isWinner - The win status.
	 */
	public update(isWinner: boolean): void {
		if (isWinner) {
			this.playerElement.classList.add('winner');
		}
	}
}
