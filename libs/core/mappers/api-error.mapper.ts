import { ApiErrorDto } from '../dtos/api-error.dto';
import { ApiError } from '../models/api-error';
import { ErrorDetail } from '../models/error-detail';

const GENERAL_ERROR_MESSAGE = 'Something went wrong. Please try again later.';

const USER_FRIENDLY_ERROR_CODES = ['no_active_account'];
const USER_FRIENDLY_ERROR_ATTRS = ['email', 'password', 'first_name', 'last_name', 'avatar'];

export namespace ApiErrorMapper {

	/**
	 * Maps DTO to model.
	 * @param dto API error DTO.
	 * @returns API error model.
	 */
	export function fromDto(dto: ApiErrorDto): ApiError {
		return new ApiError({
			errors: dto.errors.map(error => {
				let detail = GENERAL_ERROR_MESSAGE;

				if (USER_FRIENDLY_ERROR_CODES.includes(error.code) || USER_FRIENDLY_ERROR_ATTRS.includes(error.attr ?? '')) {
					detail = error.detail ?? GENERAL_ERROR_MESSAGE;
				}
				return new ErrorDetail({
					detail,
					attr: error.attr,
				});
			}),
		});
	}
}
