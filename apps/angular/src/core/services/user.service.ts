import { inject, Injectable } from '@angular/core';
import { catchError, map, Observable, of, switchMap, take, throwError } from 'rxjs';
import { Login } from '@js-camp/core/models/login';

import { UserSecretService } from './user-secret.service';
import { AuthService } from './auth.service';

/** User service. */
@Injectable({
	providedIn: 'root',
})
export class UserService {
	private readonly userSecretService = inject(UserSecretService);

	private readonly authService = inject(AuthService);

	/** User logged in status. */
	public readonly isUserLoggedIn$ = this.userSecretService.secret$.pipe(
		map(secret => secret != null),
	);

	/** Refreshes the secret via service. */
	public refresh(): Observable<void> {
		return this.userSecretService.secret$.pipe(
			take(1),
			switchMap(secret =>
				secret != null ? this.authService.refreshSecret(secret) : throwError(() => new Error('No refresh token found'))),
			catchError(() =>
				this.logout()),
			switchMap(newSecret => newSecret ? this.userSecretService.setSecret(newSecret) : of(null)),
			map(() => void 0),
		);
	}

	/** Logs the user out. */
	public logout(): Observable<void> {
		return this.userSecretService.removeSecret();
	}

	/**
	 * Logs the user via service.
	 * @param loginData Login data.
	 */
	public login(loginData: Login): Observable<void> {
		return this.authService.login(loginData).pipe(
			switchMap(secret => secret ? this.userSecretService.setSecret(secret) : of(null)),
			map(() => void 0),
		);
	}

}
