import { TSubscriber } from './subscriber';

/**
 * WinnerDisplayer class that updates the UI to indicate the winner.
 */
export class WinnerDisplayer implements TSubscriber<boolean> {
	private playerElement: HTMLElement;

	/**
	 * Creates an instance of WinnerDisplayer.
	 * @param playerElement - The HTML element to indicate the winner.
	 */
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
