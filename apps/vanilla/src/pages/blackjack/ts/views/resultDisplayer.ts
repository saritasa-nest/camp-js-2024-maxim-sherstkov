import { Subscriber } from '../utils/subscriber';
import { getTotalSum } from '../utils/utils';

/**
 * ResultDisplayer class that provides methods to update the UI with player results.
 */
export class ResultDisplayer implements Subscriber<number[]> {
	private readonly playerElement: Element;

	private resultsContent = '';

	public constructor(playerElement: Element) {
		this.playerElement = playerElement;
	}

	/** @inheritdoc */
	public update(results: number[]): void {
		const total = getTotalSum(results);
		this.resultsContent = `${results.join(', ')} (Total: ${total})`;
		this.render();
	}

	/**
	 * Renders results content.
	 */
	private render(): void {
		this.playerElement.innerHTML = this.resultsContent;
	}
}
