import { TSubscriber } from '../utils/subscriber';

/**
 * DebugDisplayer class that updates the UI with all dice rolls for debugging.
 */
export class DebugDisplayer implements TSubscriber<number> {
	private debugElement: HTMLElement;

	/**
	 * Creates an instance of DebugDisplayer.
	 * @param debugElement - The HTML element to display debug information.
	 */
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
