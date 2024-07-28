import { AnimeParamsDto } from '../dtos/based-params.dto';
import { AnimeParams } from '../models/based-params';
import { AnimeTypeMapper } from './anime-type.mapper';

export namespace AnimeParamsMapper {

	/**
	 * Maps model to dto.
	 * @param model AnimeParams model.
	 */
	export function toDto(model: AnimeParams): AnimeParamsDto {
		const type__in = Array.isArray(model.filterByType)
  			? model.filterByType.map(AnimeTypeMapper.toDto).join(',')
  			: AnimeTypeMapper.toDto(model.filterByType);
			
		return {
			limit: model.pageSize.toString(),
			offset: (model.pageIndex * model.pageSize).toString(),
			search: model.searchValue,
			ordering: model.sortOrder,
			type__in: type__in
		};
	}
}
