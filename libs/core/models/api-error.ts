import { ErrorDetail } from './error-detail';
import { Immerable, OmitImmerable } from './immerable';

/** API error. */
export class ApiError extends Immerable {

	/** Array of error details. */
	public readonly errors: ErrorDetail[];

	public constructor(data: ApiErrorConstructorData) {
		super();
		this.errors = data.errors;
	}
}

type ApiErrorConstructorData = OmitImmerable<ApiError>;
