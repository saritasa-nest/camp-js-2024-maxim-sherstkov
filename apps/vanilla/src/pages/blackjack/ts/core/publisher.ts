import { TSubscriber } from '../utils/subscriber';

/**
 * Publisher class that manages subscribers and notifies them with updates.
 */
export class Publisher<T> {
	private readonly subscribers: TSubscriber<T>[] = [];

	/**
	 * Adds a subscriber.
	 * @param s - The subscriber to add.
	 */
	public subscribe(s: TSubscriber<T>): void {
		const subIndex = this.getSubscriberIndex(s);
		if (subIndex === -1) {
			this.subscribers.push(s);
		}
	}

	/**
	 * Removes a subscriber.
	 * @param s - The subscriber to remove.
	 */
	public unsubscribe(s: TSubscriber<T>): void {
		const subIndex = this.getSubscriberIndex(s);
		if (subIndex !== -1) {
			this.subscribers.splice(subIndex, 1);
		}
	}

	/**
	 * Notifies all subscribers with a message.
	 * @param message - The message to notify subscribers with.
	 */
	// TODO delete debug log
	public notify(message: T): void {
		console.log(message);

		this.subscribers.forEach(sub => sub.update(message));
	}

	/**
	 * Receives subscriber index.
	 * @param s - The subscriber whose index you want to find.
	 * @returns - The subscriber index.
	 */
	private getSubscriberIndex(s: TSubscriber<T>): number {
		return this.subscribers.findIndex(sub => sub === s);
	}
}
