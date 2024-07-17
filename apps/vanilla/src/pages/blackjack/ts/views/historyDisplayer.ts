import { TSubscriber } from '../utils/subscriber';

/**
 * HistoryDisplayer class that updates the UI with all dice rolls for debugging.
 * @implements {TSubscriber<number>}
 */
export class HistoryDisplayer implements TSubscriber<number> {
	private readonly debugElement: HTMLElement;

	public constructor(debugElement: HTMLElement) {
		this.debugElement = debugElement;
	}

	/**
	 * Updates the UI with a dice roll result.
	 * @param result - The result of the dice roll.
	 */
	public update(result: number): void {
		const currentContent = this.debugElement.innerHTML;
		this.debugElement.innerHTML = currentContent ? `${currentContent}, ${result}` : `${result}`;
	}
}
