import { AnimeDto } from '../dtos/anime.dto';
import { Anime } from '../models/anime';

import { readableAnimeStatus } from './anime-status.mapper';
import { readableAnimeType } from './anime-type.mapper';

export namespace AnimeMapper {

	/**
	 * Maps dto to model.
	 * @param dto Anime dto.
	 */
	export function fromDto(dto: AnimeDto): Anime {
		return new Anime({
			id: dto.id,
			imageSrc: dto.image,
			titleEnglish: dto.title_eng,
			titleJapanese: dto.title_jpn,
			airedStart: dto.aired.start === null ? null : new Date(dto.aired.start),
			type: readableAnimeType[dto.type],
			status: readableAnimeStatus[dto.status],
		});
	}
}
