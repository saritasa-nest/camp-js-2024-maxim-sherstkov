import { AnimeParamsDto } from '../dtos/anime-params.dto';
import { AnimeParams } from '../models/anime-params';

export namespace AnimeParamsMapper {

	/**
	 * Maps model to dto.
	 * @param model AnimeParams model.
	 */
	export function toDto(model: AnimeParams): AnimeParamsDto {
		return {
			limit: model.limit.toString(),
			offset: (model.page * model.limit).toString(),
			search: model.searchValue,
		};
	}
}
