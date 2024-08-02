import { inject, Injectable } from '@angular/core';
import { JwtToken } from '@js-camp/core/models/jwt-token';
import { BehaviorSubject, Observable, ReplaySubject } from 'rxjs';

import { StorageService } from './storage.service';
const TOKEN_KEY = 'access_token';

@Injectable({
	providedIn: 'root',
})
export class TokenService {
	private readonly storageService = inject(StorageService);

	private readonly _token$ = new BehaviorSubject<JwtToken | null>(null);

	private readonly token$ = this._token$.asObservable();

	public constructor() {
		// this.setToken(new JwtToken({
		// 	access: 'test_access',
		// 	refresh: 'test_refresh',
		// }));

		this.getTokenFromStorage();
	}

	/**
	 * Sets the token and saves it to local storage.
	 *
	 * @param token The JWT token to set.
	 */
	public setToken(token: JwtToken): void {
		this.storageService.setItem(TOKEN_KEY, JSON.stringify(token));
		this._token$.next(token);
		console.log(token);

	}

	/**
	 * Retrieves the token from local storage.
	 *
	 * @returns The JWT token if exists, otherwise null.
	 */
	private getTokenFromStorage(): void {
		const tokenString = this.storageService.getItem<JwtToken>(TOKEN_KEY);
		this._token$.next(tokenString);
	}

	/**
	 * Gets the current token.
	 *
	 * @returns The current JWT token as observable.
	 */
	public getToken(): Observable<JwtToken | null> {
		return this.token$;
	}
}
