/**
 * Type for subscriber entity.
 *
 * @typedef {Subscriber}
 * @template T
 */
type TSubscriber<T> = {

	/**
	 * Method to receive a notification from the publisher.
	 *
	 * @param {T} message
	 * @returns {void}
	 */
	readonly update: (message: T) => void;
};

/**
 * Publisher class that notifies subscribers of changes.
 *
 * @class Observable
 * @typedef {Observable}
 */
export class Publisher<T> {
	/**
	 * Subscribers.
	 */
	private readonly subscribers: TSubscriber<T>[] = [];
}
