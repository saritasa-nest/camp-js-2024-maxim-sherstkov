/** Anime params. */
export type AnimeHttpDto = Readonly<{

	/** Maximum number of items. */
	limit: string;

	/** Items count skipped. */
	offset: string;

	/** Search value. */
	search: string;

	/** Sort order. */
	ordering: string;

	/** Type filter. */
	type__in: string;
}>;