import { Immerable, OmitImmerable } from './immerable';

/** Details of an API error. */
export class ErrorDetail extends Immerable {

	/** Error code. */
	public readonly code: string;

	/** Detailed error message. */
	public readonly detail: string;

	/** Attribute associated with the error (can be null). */
	public readonly attr: string | null;

	public constructor(data: ErrorDetailConstructorData) {
		super();
		this.code = data.code;
		this.detail = data.detail;
		this.attr = data.attr;
	}
}

type ErrorDetailConstructorData = OmitImmerable<ErrorDetail>;
