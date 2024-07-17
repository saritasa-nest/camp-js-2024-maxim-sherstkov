/** Studio. */
export type StudioDto = {

	/** Id. */
	readonly id: number;

	/** Creation time, example: "2022-05-31T14:04:24.548284Z". */
	readonly created: string;

	/** Time of the last modification, example: "2024-07-08T12:38:08.886672Z". */
	readonly modified: string;

	/** Studio name. */
	readonly name: string;

	/** Studio image. */
	readonly image: string | null;
};
