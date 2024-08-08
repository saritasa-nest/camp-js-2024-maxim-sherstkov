import { AnimeStatus } from '../models/anime-status';
import { AnimeStatusDto } from '../dtos/anime-status.dto';

export namespace AnimeStatusMapper {
	const ANIME_STATUS_MAP_FROM_DTO: Readonly<Record<AnimeStatusDto, AnimeStatus>> = {
		[AnimeStatusDto.Airing]: AnimeStatus.Airing,
		[AnimeStatusDto.Finished]: AnimeStatus.Finished,
		[AnimeStatusDto.NotAiredYet]: AnimeStatus.NotAiredYet,
	};

	/**
	 * Converts Anime status enum values to its corresponding model values.
	 * @param dto Anime status DTO for conversion.
	 */
	export function fromDto(dto: AnimeStatusDto): AnimeStatus {
		return ANIME_STATUS_MAP_FROM_DTO[dto];
	}
}
