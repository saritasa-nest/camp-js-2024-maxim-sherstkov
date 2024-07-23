import { StudioDto } from './studio.dto';
import { GenreDto } from './genre.dto';
import { AnimeTypeDto } from './anime-type.dto';
import { AnimeStatusDto } from './anime-status.dto';

/** Anime. */
export type AnimeDto = {

	/** Id. */
	readonly id: number;

	/** Creation time, example: "2022-05-31T14:04:24.548284Z". */
	readonly created: string;

	/** Time of the last modification, example: "2024-07-08T12:38:08.886672Z". */
	readonly modified: string;

	/** Image of the anime. */
	readonly image: string | null;

	/** Youtube trailer Id. */
	readonly trailer_youtube_id: string;

	/** English title. */
	readonly title_eng: string;

	/** Japanese title. */
	readonly title_jpn: string;

	/** Score. */
	readonly score: number | null;

	/** User score. */
	readonly user_score: number | null;

	/** Type. */
	readonly type: AnimeTypeDto;

	/** Status. */
	readonly status: AnimeStatusDto;

	/** Source. */
	readonly source: string;

	/** Airing. */
	readonly airing: boolean;

	/** Aired date. */
	readonly aired: DateTimeRangeFieldDTO;

	/** Rating. */
	readonly rating: string;

	/** Season. */
	readonly season: string;

	/** Synopsis. */
	readonly synopsis: string;

	/** Background. */
	readonly background: string;

	/** Broadcast day. */
	readonly broadcast_day: number | null;

	/** Broadcast time. */
	readonly broadcast_time: string | null;

	/** Array of studios Ids. */
	readonly studios: readonly number[];

	/** Studios additional data. */
	readonly studios_data: StudioDto;

	/** Array of genres Ids. */
	readonly genres: readonly number[];

	/** Genres additional data. */
	readonly genres_data: GenreDto;

};

/** Aired dates type. */
type DateTimeRangeFieldDTO = {

	/** Aired start. */
	readonly start: string | null;

	/** Aired start. */
	readonly end: string | null;
};