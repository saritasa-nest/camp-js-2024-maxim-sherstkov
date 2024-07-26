import { AnimeParamsDto } from '../dtos/anime-params.dto';
import { AnimeParams } from '../models/based-params';

export namespace AnimeParamsMapper {

	/**
	 * Maps model to dto.
	 * @param model AnimeParams model.
	 */
	export function toDto(model: AnimeParams): AnimeParamsDto {
		return {
			limit: model.pageSize.toString(),
			offset: (model.pageIndex * model.pageSize).toString(),
			search: model.searchValue,
		};
	}
}
