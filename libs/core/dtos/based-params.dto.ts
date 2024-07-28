/** Anime params. */
export type AnimeParamsDto = Readonly<{

	/** Maximum number of items from server. */
	limit: string;

	/** Items skipped by the server. */
	offset: string;

	/** Search value. */
	search: string;

	/** Sort order. */
	ordering: string;

	/** Type filter. */
	type__in: string;
}>;
