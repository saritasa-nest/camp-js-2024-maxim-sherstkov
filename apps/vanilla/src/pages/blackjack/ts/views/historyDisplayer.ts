import { Subscriber } from '../utils/subscriber';

/**
 * HistoryDisplayer class that provides methods to update the UI with all rolls.
 * @implements {Subscriber<number>}
 */
export class HistoryDisplayer implements Subscriber<number> {
	private readonly historyElement: HTMLElement;

	private historyContent = '';

	public constructor(historyElement: HTMLElement) {
		this.historyElement = historyElement;
	}

	/** @inheritdoc */
	public update(result: number): void {
		this.historyContent = this.historyContent ? `${this.historyContent}, ${result}` : `${result}`;
		this.render();
	}

	/**
	 * Renders the history content.
	 */
	private render(): void {
		this.historyElement.innerHTML = this.historyContent;
	}
}
