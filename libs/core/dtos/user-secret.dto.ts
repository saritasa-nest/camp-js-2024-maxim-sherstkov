/** User secret DTO. */
export type UserSecretDto = Readonly<{

	/** Refresh token. */
	refresh: string;

	/** Access token. */
	access: string;
}>;
