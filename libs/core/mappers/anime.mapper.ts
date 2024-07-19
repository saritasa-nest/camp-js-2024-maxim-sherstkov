import { AnimeDto } from '../dtos/anime.dto';
import { Anime } from '../models/anime';
import { AnimeStatus, AnimeType } from '../utils/enums/anime.enum';

import { readableAnimeStatus } from './anime-status.mapper';
import { readableAnimeType } from './anime-type.mapper';

export namespace AnimeMapper {

	/**
	 * Maps dto to model.
	 * @param dto Anime dto.
	 */
	export function fromDto(dto: AnimeDto): Anime {
		const status = readableAnimeStatus[dto.status as AnimeStatus];
		const type = readableAnimeType[dto.type as AnimeType];

		return new Anime({
			id: dto.id,
			imageSrc: dto.image,
			titleEnglish: dto.title_eng,
			titleJapanese: dto.title_jpn,
			airedStart: dto.aired.start === null ? null : new Date(dto.aired.start),
			type: <AnimeType>type,
			status: <AnimeStatus>status,
		});
	}
}
