import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { JwtToken } from '@js-camp/core/models/jwt-token';
import { Login } from '@js-camp/core/models/login';
import { map, Observable, shareReplay, switchMap, throwError } from 'rxjs';
import { JwtTokenDto } from '@js-camp/core/dtos/jwt-token.dto';
import { JwtTokenMapper } from '@js-camp/core/mappers/jwt-token.mapper';

import { Registration } from '@js-camp/core/models/registration';

import { ApiErrorMapper } from '@js-camp/core/mappers/api-error.mapper';

import { ApiUrlService } from './api-url.service';
import { TokenService } from './token.service';

/** Authorization service. */
@Injectable({
	providedIn: 'root',
})
export class AuthService {
	private readonly http: HttpClient = inject(HttpClient);

	private readonly urlService = inject(ApiUrlService);

	private readonly tokenService = inject(TokenService);

	/**
	 * Logs  user with the provided credentials.
	 *
	 * @param loginData Login data of user.
	 */
	public login(loginData: Login): Observable<JwtToken> {
		return this.http.post<JwtTokenDto>(this.urlService.loginPath, loginData).pipe(

			map(token => JwtTokenMapper.fromDto(token)),
			switchMap(token => this.tokenService.setToken(token)),

			// tap(token => this.tokenService.setToken(token)),
			shareReplay({
				refCount: true,
				bufferSize: 1,
			}),
		);
	}

	/**
	 * Registers  user with the provided credentials.
	 *
	 * @param registerData Registration data of user.
	 */
	public register(registerData: Registration): Observable<JwtToken> {
		return this.http.post<JwtTokenDto>(this.urlService.registerPath, registerData).pipe(
			map(token => JwtTokenMapper.fromDto(token)),

			shareReplay({
				refCount: true,
				bufferSize: 1,
			}),
		);
	}

	// 	private handleError(error: HttpErrorResponse): Observable<never> {
	// 		let userFriendlyMessage = 'Something went wrong';

	// 		if (error.error instanceof ErrorEvent) {
	// 			// Client-side error
	// 			userFriendlyMessage = `Error: ${error.error.message}`;
	// 		} else {
	// 		  // Server-side error
	// 		  if (error.error.type && error.error.errors) {
	// 				const apiError = ApiErrorMapper.fromDto(error.error);

	// 				if (apiError.type === 'client_error') {
	// 			  const relevantError = apiError.errors.find(err =>
	// 						err.code === 'invalid_input' || err.code === 'authentication_failed');
	// 			  if (relevantError) {
	// 						userFriendlyMessage = relevantError.detail;
	// 			  } else if (error.status === 403) {
	// 						userFriendlyMessage = 'Access denied';
	// 			  } else {
	// 						userFriendlyMessage = 'Something went wrong';
	// 			  }
	// 				} else if (apiError.type === 'server_error') {
	// 			  userFriendlyMessage = 'A server error occurred';
	// 				} else {
	// 			  userFriendlyMessage = 'Something went wrong';
	// 				}
	// 		  } else {
	// 				switch (error.status) {
	// 			  case 403:
	// 						userFriendlyMessage = 'Access denied';
	// 						break;
	// 			  case 500:
	// 						userFriendlyMessage = 'A server error occurred';
	// 						break;
	// 			  default:
	// 						userFriendlyMessage = 'Something went wrong';
	// 						break;
	// 				}
	// 		  }
	// 		}

	// 		return throwError(() => new Error(userFriendlyMessage));
	// 	}

}
