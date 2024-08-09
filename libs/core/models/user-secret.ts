import { Immerable, OmitImmerable } from './immerable';

/** User secret. */
export class UserSecret extends Immerable {

	/** Refresh token. */
	public readonly refresh: string;

	/** Access token. */
	public readonly access: string;

	public constructor(data: JwtTokenConstructorData) {
		super();
		this.refresh = data.refresh;
		this.access = data.access;
	}
}

type JwtTokenConstructorData = OmitImmerable<UserSecret>;
