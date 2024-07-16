import { TSubscriber } from '../utils/subscriber';

/**
 * ResultDisplayer class that updates the UI with player results.
 * @implements {TSubscriber<number[]>}
 */
export class ResultDisplayer implements TSubscriber<number[]> {
	private readonly playerElement: HTMLElement;

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
