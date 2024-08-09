/**
 * Type for a subscriber that receives updates of type T.
 */
export type Subscriber<T> = {

	/**
	 * Method to receive a notification of type T from the publisher.
	 *
	 * @param message - Message that will be sent to the method.
	 * @returns {void}
	 */
	update: (message: T) => void;
};
