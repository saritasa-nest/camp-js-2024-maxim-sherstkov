/**
 * Gets random number using crypto WebAPI.
 *
 * @param maxNumber - Maximum number for a random range.
 * @returns Random number from 1 to max.
 */
export function getRandomNumber(maxNumber: number): number {
	const typedArray = new Uint32Array(1);
	const randomValue = crypto.getRandomValues(typedArray)[0];
	const randomNumber = randomValue / (0xFFFFFFFF + 1);
	return Math.floor(randomNumber * maxNumber + 1);
}
