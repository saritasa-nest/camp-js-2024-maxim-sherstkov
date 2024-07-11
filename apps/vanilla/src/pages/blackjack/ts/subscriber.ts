/**
 * Type for a subscriber that receives updates of type T.
 */
export type TSubscriber<T> = {

	/**
	 * Method to receive a notification of type T from the publisher.
	 *
	 * @param {T} message
	 * @returns {void}
	 */
	readonly update: (message: T) => void;
};
