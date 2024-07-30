import { Immerable, OmitImmerable } from './immerable';

/** JWT token. */
export class JwtToken extends Immerable {

	/** Refresh token. */
	public readonly refreshToken: string;

	/** Access token. */
	public readonly accessToken: string;

	public constructor(data: JwtTokenConstructorData) {
		super();
		this.refreshToken = data.refreshToken;
		this.accessToken = data.accessToken;
	}
}

type JwtTokenConstructorData = OmitImmerable<JwtToken>;
