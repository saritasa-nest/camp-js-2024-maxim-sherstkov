import { Genre } from '@js-camp/core/models/genre';

/** Genres state. */
export type GenresState = Readonly<{

	/** Genres list. */
	genres: readonly Genre[];

	/** Error. */
	error?: string;

	/** Whether the genres are loading or not. */
	isLoading: boolean;
}>;

/** State of genres. */
export const initialState: GenresState = {
	isLoading: false,
	genres: [],
};
