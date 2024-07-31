import { AnimeParamsDto } from '../dtos/based-params.dto';
import { AnimeType } from '../models/anime-type';
import { AnimeParams } from '../models/based-params';

import { AnimeTypeMapper } from './anime-type.mapper';

export namespace AnimeParamsMapper {

	/**
	 * Converts a string array to AnimeType array.
	 *
	 * @param array The string array to convert.
	 */
	export function toArrayAnimeType(array: string[]): AnimeType[] {
		const animeTypeValues = Object.values(AnimeType);
		const isValid = array.every(value => animeTypeValues.includes(value as AnimeType));
		return isValid ? array as AnimeType[] : AnimeParams.defaultValues.filterByType;
	}

	/**
	 * Maps model to dto.
	 * @param model AnimeParams model.
	 */
	export function toDto(model: AnimeParams): AnimeParamsDto {
		const typeFilter = Array.isArray(model.filterByType) ?
			model.filterByType.map(AnimeTypeMapper.toDto).join(',') :
			AnimeTypeMapper.toDto(model.filterByType);
		return {
			limit: model.pageSize.toString(),
			offset: (model.pageIndex * model.pageSize).toString(),
			search: model.searchValue,
			ordering: model.sortOrder,

			/** Disable rule because 'type__in' is a DTO name of a field. */
			// eslint-disable-next-line @typescript-eslint/naming-convention
			type__in: typeFilter,
		};
	}
}
