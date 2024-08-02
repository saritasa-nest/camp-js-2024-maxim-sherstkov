import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { JwtToken } from '@js-camp/core/models/jwt-token';
import { Login } from '@js-camp/core/models/login';
import { map, Observable, shareReplay, tap } from 'rxjs';
import { JwtTokenDto } from '@js-camp/core/dtos/jwt-token.dto';
import { JwtTokenMapper } from '@js-camp/core/mappers/jwt-token.mapper';

import { Registration } from '@js-camp/core/models/registration';

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
}
