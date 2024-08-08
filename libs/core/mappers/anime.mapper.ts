import { AnimeDto } from '../dtos/anime.dto';
import { Anime } from '../models/anime';

import { AnimeStatusMapper } from './anime-status.mapper';
import { AnimeTypeMapper } from './anime-type.mapper';

export namespace AnimeMapper {

	/**
	 * Maps dto to model.
	 * @param dto Anime dto.
	 */
	export function fromDto(dto: AnimeDto): Anime {
		return new Anime({
			id: dto.id,
			imageSrc: dto.image,
			englishTitle: dto.title_eng,
			japaneseTitle: dto.title_jpn,
			airedStart: dto.aired.start === null ? null : new Date(dto.aired.start),
			type: AnimeTypeMapper.fromDto(dto.type),
			status: AnimeStatusMapper.fromDto(dto.status),
		});
	}
}
