/**
 * Get number from value or return null.
 * @param value Value to be checked.
 */
export function getNumberFromString(value: string | null): number | null {
	const possibleNumber = Number(value);
	return possibleNumber ? possibleNumber : null;
}
