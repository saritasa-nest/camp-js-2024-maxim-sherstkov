import { TSubscriber } from '../utils/subscriber';

/**
 * Publisher class that manages subscribers and notifies them with updates.
 */
export class Publisher<T> {
	private readonly subscribers: TSubscriber<T>[] = [];

	/**
	 * Adds a subscriber.
	 * @param subscriber - The subscriber to add.
	 */
	public subscribe(subscriber: TSubscriber<T>): void {
		const subIndex = this.getSubscriberIndex(subscriber);
		if (subIndex === -1) {
			this.subscribers.push(subscriber);
		}
	}

	/**
	 * Removes a subscriber.
	 * @param subscriber - The subscriber to remove.
	 */
	public unsubscribe(subscriber: TSubscriber<T>): void {
		const subIndex = this.getSubscriberIndex(subscriber);
		if (subIndex !== -1) {
			this.subscribers.splice(subIndex, 1);
		}
	}

	/**
	 * Notifies all subscribers with a message.
	 * @param message - The message to notify subscribers with.
	 */
	public notify(message: T): void {
		this.subscribers.forEach(currentSubscriber => currentSubscriber.update(message));
	}

	/**
	 * Receives subscriber index.
	 * @param subscriber - The subscriber whose index you want to find.
	 * @returns - The subscriber index.
	 */
	private getSubscriberIndex(subscriber: TSubscriber<T>): number {
		return this.subscribers.findIndex(currentSubscriber => currentSubscriber === subscriber);
	}
}
