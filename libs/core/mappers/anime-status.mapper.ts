import { AnimeStatus } from '../utils/enums/anime.enum';

/** Anime status that mapped to readable condition. */
export const readableAnimeStatus = <Record<AnimeStatus, string>>{
	[AnimeStatus.Airing]: 'Airing',
	[AnimeStatus.Finished]: 'Finished',
	[AnimeStatus.NotAiredYet]: 'Not aired yet',
};
