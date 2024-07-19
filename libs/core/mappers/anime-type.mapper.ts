import { AnimeType } from '../utils/enums/anime.enum';

/** Anime type that mapped to readable condition. */
export const readableAnimeType = <Record<AnimeType, string>>{
	[AnimeType.Movie]: 'Movie',
	[AnimeType.Music]: 'Music',
	[AnimeType.Ona]: 'ONA',
	[AnimeType.Ova]: 'OVA',
	[AnimeType.PromoVideo]: 'Promotional Videos',
	[AnimeType.Special]: 'Special',
	[AnimeType.Tv]: 'TV',
	[AnimeType.Unknown]: 'Unknown',
};
