import { ApiErrorDto } from '../dtos/api-error.dto';
import { ApiError } from '../models/api-error';
import { ErrorDetail } from '../models/error-detail';

export namespace ApiErrorMapper {

	/**
	 * Maps DTO to model.
	 * @param dto API error DTO.
	 * @returns API error model.
	 */
	export function fromDto(dto: ApiErrorDto): ApiError {
		return new ApiError({
			type: dto.type,
			errors: dto.errors.map(error => new ErrorDetail({
				code: error.code,
				detail: error.detail,
				attr: error.attr,
			})),
		});
	}
}
