import { inject, Injectable } from '@angular/core';
import { JwtToken } from '@js-camp/core/models/jwt-token';
import { map, Observable } from 'rxjs';

import { LocalStorageService } from './local-storage.service';
const TOKEN_KEY = 'auth-key';

/** Token service. */
@Injectable({
	providedIn: 'root',
})
export class TokenService {
	private readonly storageService = inject(LocalStorageService);

	/** Auth token of the current user. */
	public readonly _token$: Observable<JwtToken | null>;

	public constructor() {
		this._token$ = this.storageService.get<JwtToken>(TOKEN_KEY);
	}

	/**
	 * Sets the token and saves it to local storage.
	 *
	 * @param token The JWT token to set.
	 */
	public setToken(token: JwtToken): Observable<JwtToken> {
		return this.storageService.save(TOKEN_KEY, token).pipe(map(() => token));

	}

	/** Removes current auth key. */
	public removeSecret(): Observable<void> {
		return this.storageService.remove(TOKEN_KEY);
	}
}
