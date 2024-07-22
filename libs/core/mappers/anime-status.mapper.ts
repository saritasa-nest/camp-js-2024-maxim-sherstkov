import { AnimeStatus } from '../models/anime-status';
import { AnimeStatusDto } from '../dtos/anime-status.dto';

/** Anime status that mapped to readable condition. */
export const readableAnimeStatus = <Readonly<Record<AnimeStatusDto, AnimeStatus>>>{
	[AnimeStatusDto.Airing]: AnimeStatus.Airing,
	[AnimeStatusDto.Finished]: AnimeStatus.Finished,
	[AnimeStatusDto.NotAiredYet]: AnimeStatus.NotAiredYet,
};
