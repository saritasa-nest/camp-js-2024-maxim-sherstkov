/** JWT token DTO. */
export type JwtTokenDto = Readonly<{

	/** Refresh token. */
	refresh: string;

	/** Access token. */
	access: string;
}>;
