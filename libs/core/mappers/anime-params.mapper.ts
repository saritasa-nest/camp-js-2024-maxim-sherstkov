import { HttpParams } from '@angular/common/http';

import { AnimeHttpDto } from '../dtos/anime-http.dto';
import { AnimeType } from '../models/anime-type';
import { AnimeQuery } from '../models/anime-query';

import { AnimeTypeMapper } from './anime-type.mapper';

export namespace AnimeParamsMapper {

	/**
	 * Converts a string array to AnimeType array.
	 *
	 * @param array The string array to convert.
	 */
	export function toAnimeType(array: readonly string[]): AnimeType[] {
		const animeTypeValues = Object.values(AnimeType);
		const isValid = array.every(value => animeTypeValues.includes(value as AnimeType));
		return isValid ? array as AnimeType[] : AnimeQuery.DEFAULT_VALUES.filterByType;
	}

	/**
	 * Maps model to dto.
	 * @param model AnimeParams model.
	 */
	export function toDto(model: AnimeQuery): AnimeHttpDto {
		const typeFilter = Array.isArray(model.filterByType) ?
			model.filterByType.map(type => AnimeTypeMapper.toDto(type)).join(',') :
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

	/**
	 * Maps anime query params to http params.
	 * @param params Query parameters.
	 */
	export function toAnimeHttp(params: AnimeQuery): HttpParams {
		const animeParams = { ...toDto(params) };
		return new HttpParams({ fromObject: animeParams });
	}
}
