import { ErrorDetailDto } from './error-detail.dto';

/** API error DTO. */
export type ApiErrorDto = Readonly<{

	/** Type. */
	type: string;

	/** Error details. */
	errors: ReadonlyArray<ErrorDetailDto>;
}>;
