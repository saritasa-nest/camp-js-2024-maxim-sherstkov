import { TSubscriber } from '../utils/subscriber';

/**
 * HistoryDisplayer class that updates the UI with all dice rolls for historyging.
 * @implements {TSubscriber<number>}
 */
export class HistoryDisplayer implements TSubscriber<number> {
	private readonly historyElement: Element;

	public constructor(historyElement: Element) {
		this.historyElement = historyElement;
	}

	/**
	 * Updates the UI with a dice roll result.
	 * @param result - The result of the dice roll.
	 */
	public update(result: number): void {
		const currentContent = this.historyElement.innerHTML;
		this.historyElement.innerHTML = currentContent ? `${currentContent}, ${result}` : `${result}`;
	}
}
