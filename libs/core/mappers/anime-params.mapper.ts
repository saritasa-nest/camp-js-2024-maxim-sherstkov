import { HttpParams } from '@angular/common/http';
import { Sort } from '@angular/material/sort';
import { Params } from '@angular/router';

import { AnimeHttpDto } from '../dtos/anime-http.dto';
import { AnimeType } from '../models/anime-type';
import { AnimeQuery } from '../models/anime-query';

import { AnimeTypeMapper } from './anime-type.mapper';

export namespace AnimeParamsMapper {

	/**
	 * Converts a string array to AnimeType array.
	 * @param array The string array to convert.
	 */
	export function toAnimeType(array: readonly string[]): AnimeType[] {
		const animeTypeValues = Object.values(AnimeType);
		const isValid = array.every(value => animeTypeValues.includes(value as AnimeType));
		return isValid ? array as AnimeType[] : AnimeQuery.DEFAULT_VALUES.filterByType;
	}

	/**
	 * Concatenates `sort` object into a single string.
	 * @param sort Sort object.
	 */
	function toAnimeSort(sort: Sort): string {
		if (sort.direction && sort.active) {
			return `${sort.direction === 'desc' ? '-' : ''}${sort.active}`;
		}
		return '';
	}

	/**
	 * Converts sort string into a Sort object.
	 * @param sort Sort string.
	 */
	function fromAnimeSort(sort: string): Sort {
		if (!sort) {
			return AnimeQuery.DEFAULT_VALUES.sort;
		}
		const direction = sort.startsWith('-') ? 'desc' : 'asc';
		const active = sort.startsWith('-') ? sort.slice(1) : sort;

		return {
			active,
			direction,
		};
	}

	/**
	 * Maps model to dto.
	 * @param model AnimeParams model.
	 */
	export function toDto(model: AnimeQuery): AnimeHttpDto {
		const typeFilterString = model.filterByType.map(type => AnimeTypeMapper.toDto(type)).join(',');
		return {
			limit: model.pageSize.toString(),
			offset: (model.pageIndex * model.pageSize).toString(),
			search: model.searchValue,
			ordering: toAnimeSort(model.sort),

			/** Disable rule because 'type__in' is a DTO name of a field. */
			// eslint-disable-next-line @typescript-eslint/naming-convention
			type__in: typeFilterString,
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

	/**
	 * Maps an AnimeQuery object to query parameters.
	 * @param animeQuery AnimeQuery object to convert.
	 */
	export function toQueryParams(animeQuery: AnimeQuery): Params {
		return {
			pageSize: animeQuery.pageSize,
			pageIndex: animeQuery.pageIndex,
			searchValue: animeQuery.searchValue,
			filterByType: animeQuery.filterByType,
			sort: toAnimeSort(animeQuery.sort),
		};
	}

	/**
	 * Creates an instance of AnimeQuery from query parameters.
	 * @param param Query parameters.
	 */
	export function fromQueryParams({ pageIndex, pageSize, searchValue, sort }: Params): AnimeQuery {
		return new AnimeQuery({
			pageIndex,
			pageSize,
			searchValue,
			sort: fromAnimeSort(sort),
		});
	}
}
