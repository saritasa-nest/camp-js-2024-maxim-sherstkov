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

/** Extended API error with Error interface. */
export class ExtendedApiError extends ApiError implements Error {
	/** Error name. */
	public readonly name: string;

	/** Error message. */
	public readonly message: string;

	public constructor(data: ApiErrorConstructorData, message?: string) {
		super(data);
		this.name = 'ExtendedApiError';
		this.message = message ?? 'An API error occurred';
	}
}
