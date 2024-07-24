import { PaginationDto } from '../dtos/pagination.dto';
import { Pagination } from '../models/pagination';

export namespace PaginationMapper {

	/**
	 * Maps dto to model.
	 * @param dto PaginationDto dto.
	 */
	export function fromDto<T>(dto: PaginationDto<T>): Pagination<T> {
		return new Pagination({
			count: dto.count,
			next: dto.next,
			previous: dto.previous,
			results: dto.results,
		});
	}
}
