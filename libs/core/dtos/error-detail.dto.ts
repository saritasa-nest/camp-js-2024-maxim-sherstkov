/** Data Transfer Object for error details. */
export type ErrorDetailDto = Readonly<{

	/** Code. */
	code: string;

	/** Detailed message. */
	detail: string;

	/** Attribute. */
	attr: string | null;
}>;
