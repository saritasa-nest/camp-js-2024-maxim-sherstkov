import { TSubscriber } from './subscriber';

/**
 * ResultDisplayer class that updates the UI with player results.
 */
export class ResultDisplayer implements TSubscriber<number[]> {
	private playerElement: HTMLElement;

	/**
	 * Creates an instance of ResultDisplayer.
	 * @param playerElement - The HTML element to display results.
	 */
	public constructor(playerElement: HTMLElement) {
		this.playerElement = playerElement;
	}

	/**
	 * Updates the UI with player results.
	 * @param results - The array of dice results.
	 */
	public update(results: number[]): void {
		const total = results.reduce((a, b) => a + b, 0);
		this.playerElement.innerHTML = `${results.join(', ')} (Total: ${total})`;
	}
}
