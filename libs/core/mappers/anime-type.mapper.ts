import { AnimeType } from '../models/anime-type';
import { AnimeTypeDto } from '../dtos/anime-type.dto';

/** Anime type that mapped to readable condition. */
export const readableAnimeType: Readonly<Record<AnimeTypeDto, AnimeType>> = {
	[AnimeTypeDto.Movie]: AnimeType.Movie,
	[AnimeTypeDto.Music]: AnimeType.Music,
	[AnimeTypeDto.Ona]: AnimeType.Ona,
	[AnimeTypeDto.Ova]: AnimeType.Ova,
	[AnimeTypeDto.PromoVideo]: AnimeType.PromoVideo,
	[AnimeTypeDto.Special]: AnimeType.Special,
	[AnimeTypeDto.Tv]: AnimeType.Tv,
	[AnimeTypeDto.Unknown]: AnimeType.Unknown,
};
