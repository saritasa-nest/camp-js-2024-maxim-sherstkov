import { Subscriber } from '../utils/subscriber';

/**
 * WinnerDisplayer class that provides methods to update the UI to indicate the winner.
 * @implements {Subscriber<boolean>}
 */
export class WinnerDisplayer implements Subscriber<boolean> {
	private readonly playerElement: Element;

	private isWinner = false;

	public constructor(playerElement: Element) {
		this.playerElement = playerElement;
	}

	/** @inheritdoc */
	public update(isWinner: boolean): void {
		this.isWinner = isWinner;
		this.render();
	}

	/**
	 * Renders the win status.
	 */
	private render(): void {
		if (this.isWinner) {
			this.playerElement.classList.add('winner');
		} else {
			this.playerElement.classList.remove('winner');
		}
	}
}
