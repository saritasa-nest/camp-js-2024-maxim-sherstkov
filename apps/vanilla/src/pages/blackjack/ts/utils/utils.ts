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

/**
 * Calculates the sum of all numbers in an array.
 *
 * @param numbers - The array of numbers to sum.
 * @returns The sum of the numbers in the array.
 */
export function getTotalSum(numbers: readonly number[]): number {
	return numbers.reduce((acc, curr) => acc + curr, 0);
}
