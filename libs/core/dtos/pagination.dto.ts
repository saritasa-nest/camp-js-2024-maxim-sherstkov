/** Pagination meta info. */
export type PaginationDto<T> = Readonly<{

	/** Total count of items. */
	count: number;

	/** Next page of items. */
	next: string;

	/** Previous page of items. */
	previous: string;

	/** Array of items requested. */
	results: readonly T[];
}>;
