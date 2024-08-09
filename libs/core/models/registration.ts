import { Immerable, OmitImmerable } from './immerable';

/** Registration data. */
export class Registration extends Immerable {

	/** Email. */
	public readonly email: string;

	/** Password. */
	public readonly password: string;

	/** First name. */
	public readonly firstName: string;

	/** Last name. */
	public readonly lastName: string;

	public constructor(data: RegistrationConstructorData) {
		super();
		this.email = data.email;
		this.password = data.password;
		this.firstName = data.firstName;
		this.lastName = data.lastName;
	}
}

type RegistrationConstructorData = OmitImmerable<Registration>;
