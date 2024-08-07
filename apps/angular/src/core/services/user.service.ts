import { inject, Injectable } from '@angular/core';
import { catchError, map, Observable, of, switchMap, take, throwError } from 'rxjs';

import { UserSecretService } from './user-secret.service';
import { AuthService } from './auth.service';

/** User service. */
@Injectable({
	providedIn: 'root',
})
export class UserService {
	private readonly userSecretService = inject(UserSecretService);

	private readonly authService = inject(AuthService);

	/** Refreshes the secret via auth service. */
	public refresh(): Observable<void> {
		return this.userSecretService.secret$.pipe(
			take(1),
			switchMap(secret =>
				secret != null ? this.authService.refreshToken(secret) : throwError(() => new Error('No refresh token found'))),
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
}
