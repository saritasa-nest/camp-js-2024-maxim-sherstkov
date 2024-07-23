/**
 * Copies properties from targetModel to a new object using sourceDto keys.
 * This helps to make the properties of the DTO readable to a user.
 * @param sourceDto DTO object.
 * @param targetModel Model with readable properties for a type.
 */
export const createTypeMapFromDto = <T extends Record<string, string>>(
	sourceDto: T, targetModel: Record<keyof T, string>): Record<keyof T, string> =>
	Object.keys(sourceDto).reduce((acc, key: keyof T) => {
		acc[key] = targetModel[key];
		return acc;
	}, {} as Record<keyof T, string>);
