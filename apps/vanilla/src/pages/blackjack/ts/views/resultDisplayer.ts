import { TSubscriber } from '../utils/subscriber';
import { getTotalSum } from '../utils/utils';

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
		const total = getTotalSum(results);
		this.playerElement.innerHTML = `${results.join(', ')} (Total: ${total})`;
	}
}
