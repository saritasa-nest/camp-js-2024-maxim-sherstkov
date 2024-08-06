import { ErrorDetail } from './error-detail';
import { Immerable, OmitImmerable } from './immerable';

/** API error. */
export class ApiError extends Immerable {

	/** Error type. */
	public readonly type: string;

	/** Array of error details. */
	public readonly errors: ErrorDetail[];

	public constructor(data: ApiErrorConstructorData) {
		super();
		this.type = data.type;
		this.errors = data.errors;
	}
}

type ApiErrorConstructorData = OmitImmerable<ApiError>;
