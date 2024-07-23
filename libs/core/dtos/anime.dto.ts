import { StudioDto } from './studio.dto';
import { GenreDto } from './genre.dto';
import { AnimeTypeDto } from './anime-type.dto';
import { AnimeStatusDto } from './anime-status.dto';

/** Anime. */
export type AnimeDto = Readonly<{

	/** Id. */
	id: number;

	/** Creation time, example: "2022-05-31T14:04:24.548284Z". */
	created: string;

	/** Time of the last modification, example: "2024-07-08T12:38:08.886672Z". */
	modified: string;

	/** Image of the anime. */
	image: string | null;

	/** Youtube trailer Id. */
	trailer_youtube_id: string;

	/** English title. */
	title_eng: string;

	/** Japanese title. */
	title_jpn: string;

	/** Score. */
	score: number | null;

	/** User score. */
	user_score: number | null;

	/** Type. */
	type: AnimeTypeDto;

	/** Status. */
	status: AnimeStatusDto;

	/** Source. */
	source: string;

	/** Airing. */
	airing: boolean;

	/** Aired date. */
	aired: DateTimeRangeFieldDTO;

	/** Rating. */
	rating: string;

	/** Season. */
	season: string;

	/** Synopsis. */
	synopsis: string;

	/** Background. */
	background: string;

	/** Broadcast day. */
	broadcast_day: number | null;

	/** Broadcast time. */
	broadcast_time: string | null;

	/** Array of studios Ids. */
	studios: readonly number[];

	/** Studios additional data. */
	studios_data: StudioDto;

	/** Array of genres Ids. */
	genres: readonly number[];

	/** Genres additional data. */
	genres_data: GenreDto;

}>;

/** Aired dates type. */
type DateTimeRangeFieldDTO = Readonly<{

	/** Aired start. */
	start: string | null;

	/** Aired start. */
	end: string | null;
}>;
