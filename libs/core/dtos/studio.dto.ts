/** Studio. */
export type StudioDto = Readonly<{

	/** Id. */
	id: number;

	/** Creation time, example: "2022-05-31T14:04:24.548284Z". */
	created: string;

	/** Time of the last modification, example: "2024-07-08T12:38:08.886672Z". */
	modified: string;

	/** Name. */
	name: string;

	/** Image. */
	image: string | null;
}>;
