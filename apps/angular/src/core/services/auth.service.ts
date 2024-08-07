import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { UserSecret } from '@js-camp/core/models/user-secret';
import { Login } from '@js-camp/core/models/login';
import { catchError, map, Observable, shareReplay, switchMap, tap, throwError } from 'rxjs';
import { UserSecretDto } from '@js-camp/core/dtos/user-secret.dto';
import { UserSecretMapper } from '@js-camp/core/mappers/user-secret.mapper';

import { Registration } from '@js-camp/core/models/registration';

import { ApiErrorMapper } from '@js-camp/core/mappers/api-error.mapper';

import { ApiUrlService } from './api-url.service';
import { UserSecretService } from './user-secret.service';

/** Authorization service. */
@Injectable({
	providedIn: 'root',
})
export class AuthService {
	private readonly http: HttpClient = inject(HttpClient);

	private readonly urlService = inject(ApiUrlService);

	private readonly userSecretService = inject(UserSecretService);

	/**
	 * Logs  user with the provided credentials.
	 *
	 * @param loginData Login data of user.
	 */
	public login(loginData: Login): Observable<UserSecret> {
		return this.http.post<UserSecretDto>(this.urlService.loginPath, loginData).pipe(
			catchError((error) => this.handleError(error)),
			map(token => UserSecretMapper.fromDto(token)),
			tap((token) => console.log(`TOKEN?? ${token}`)),
			shareReplay({
				refCount: true,
				bufferSize: 1,
			}),
		);
	}

	/**
	 * Registers user with the provided credentials.
	 *
	 * @param registerData Registration data of user.
	 */
	public register(registerData: Registration): Observable<UserSecret> {
		return this.http.post<UserSecretDto>(this.urlService.registerPath, registerData).pipe(
			catchError((error) => this.handleError(error)),
			map(token => UserSecretMapper.fromDto(token)),

			shareReplay({
				refCount: true,
				bufferSize: 1,
			}),
		);
	}

	/**
	 * Refreshes the user secret.
	 *
	 * @param secret User secret.
	 */
	public refreshToken(secret: UserSecret): Observable<UserSecret> {
		return this.http.post<UserSecretDto>(this.urlService.refreshTokenPath, UserSecretMapper.toDto(secret)).pipe(
			map(token => UserSecretMapper.fromDto(token)),
		);
	}

	private handleError(error: HttpErrorResponse): Observable<never> {

		const apiError = ApiErrorMapper.fromDto(error.error);

		console.log(apiError);


		return throwError(() => apiError);
	}

}
