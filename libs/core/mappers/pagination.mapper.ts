import { PaginationDto } from '../dtos/pagination.dto';
import { Pagination } from '../models/pagination';

export namespace PaginationMapper {

	/**
	 * Maps dto to a model.
	 * @param dto PaginationDto dto.
	 * @param mapperDto Function to map dto to model.
	 */
	export function fromDto<Dto, Model>(dto: PaginationDto<Dto>, mapperDto: (resultsDto: Dto) => Model): Pagination<Model> {
		return new Pagination<Model>({
			count: dto.count,
			next: dto.next,
			previous: dto.previous,
			results: dto.results.map(anime => mapperDto(anime)),
		});
	}
}
