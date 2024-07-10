/**
 * Type for subscriber entity.
 *
 * @typedef {Subscriber}
 * @template T
 */
export type TSubscriber<T> = {

	/**
	 * Method to receive a notification from the publisher.
	 *
	 * @param {T} message
	 * @returns {void}
	 */
	readonly update: (message: T) => void;
};
