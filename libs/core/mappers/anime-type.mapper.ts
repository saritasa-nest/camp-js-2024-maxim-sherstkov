import { AnimeType } from '../models/anime-type';
import { AnimeTypeDto } from '../dtos/anime-type.dto';

export namespace AnimeTypeMapper {
	const ANIME_TYPE_MAP_FROM_DTO: Readonly<Record<AnimeTypeDto, AnimeType>> = {
		[AnimeTypeDto.Movie]: AnimeType.Movie,
		[AnimeTypeDto.Music]: AnimeType.Music,
		[AnimeTypeDto.Ona]: AnimeType.Ona,
		[AnimeTypeDto.Ova]: AnimeType.Ova,
		[AnimeTypeDto.PromoVideo]: AnimeType.PromoVideo,
		[AnimeTypeDto.Special]: AnimeType.Special,
		[AnimeTypeDto.Tv]: AnimeType.Tv,
		[AnimeTypeDto.Unknown]: AnimeType.Unknown,
	};

	const ANIME_TYPE_MAP_TO_DTO: Readonly<Record<AnimeType, AnimeTypeDto>> = {
		[AnimeType.Movie]: AnimeTypeDto.Movie,
		[AnimeType.Music]: AnimeTypeDto.Music,
		[AnimeType.Ona]: AnimeTypeDto.Ona,
		[AnimeType.Ova]: AnimeTypeDto.Ova,
		[AnimeType.PromoVideo]: AnimeTypeDto.PromoVideo,
		[AnimeType.Special]: AnimeTypeDto.Special,
		[AnimeType.Tv]: AnimeTypeDto.Tv,
		[AnimeType.Unknown]: AnimeTypeDto.Unknown,
	};

	/**
	 * Converts Anime type enum values to its corresponding model values.
	 * @param dto Anime type DTO for conversion.
	 */
	export function fromDto(dto: AnimeTypeDto): AnimeType {
		return ANIME_TYPE_MAP_FROM_DTO[dto];
	}

	/**
	 * Converts Anime type model values to its corresponding DTO values.
	 * @param model Anime type model for conversion.
	 */
	export function toDto(model: AnimeType): AnimeTypeDto {
		return ANIME_TYPE_MAP_TO_DTO[model];
	}
}
