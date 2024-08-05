import { inject, Injectable } from '@angular/core';
import { JwtToken } from '@js-camp/core/models/jwt-token';
import { BehaviorSubject, map, mapTo, Observable, ReplaySubject, tap } from 'rxjs';

import { LocalStorageService } from './local-storage.service';
const TOKEN_KEY = 'access_token';

@Injectable({
	providedIn: 'root',
})
export class TokenService {
	private readonly storageService = inject(LocalStorageService);

	public readonly _token$: Observable<JwtToken | null>;

	// private readonly token$ = this._token$.asObservable();

	public constructor() {
		// this.setToken(new JwtToken({
		// 	access: 'test_access',
		// 	refresh: 'test_refresh',
		// }));

		// this.getTokenFromStorage();
		this._token$ = this.storageService.get<JwtToken>(TOKEN_KEY);
	}

	/**
	 * Sets the token and saves it to local storage.
	 *
	 * @param token The JWT token to set.
	 */
	public setToken(token: JwtToken): Observable<JwtToken> {
		// this._token$.next(token);

		return this.storageService.save(TOKEN_KEY, token).pipe(map(() => token));

	}

	/**
	 * Retrieves the token from local storage.
	 *
	 * @returns The JWT token if exists, otherwise null.
	 */
	private getTokenFromStorage(): void {
		const tokenString$ = this.storageService.get<JwtToken>(TOKEN_KEY);

		// this._token$.next(tokenString$);
	}

	/**
	 * Gets the current token.
	 *
	 * @returns The current JWT token as observable.
	 */
	// public getToken(): Observable<JwtToken | null> {
	// 	return this.token$;
	// }

	// private initializeToken(token: JwtToken | null): void {

	// }
}
