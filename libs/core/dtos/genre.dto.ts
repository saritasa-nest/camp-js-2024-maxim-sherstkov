/** Genre DTO. */
export type GenreDto = Readonly<{

	/** Id. */
	id: number;

	/** Name. */
	name: string;

	/** Creation time, for example, "2014-12-20T17:30:50.416Z". */
	created: string;

	/** Time of the last modification, for example, "2014-12-20T17:30:50.416Z". */
	modified: string;

	/** DTO type. */
	type: 'GENRES';
}>;
