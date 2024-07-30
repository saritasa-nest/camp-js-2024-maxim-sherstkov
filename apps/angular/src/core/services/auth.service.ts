import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { JwtToken } from '@js-camp/core/models/jwt-token';
import { Login } from '@js-camp/core/models/login';
import { map, Observable, shareReplay } from 'rxjs';
import { JwtTokenDto } from '@js-camp/core/dtos/jwt-token.dto';
import { JwtTokenMapper } from '@js-camp/core/mappers/jwt-token.mapper';

import { ApiUrlService } from './api-url.service';

/** Authorization service. */
@Injectable({
	providedIn: 'root',
})
export class AuthService {
	private readonly http: HttpClient = inject(HttpClient);

	private readonly urlService = inject(ApiUrlService);

	/**
	 * Logs  user with the provided credentials.
	 *
	 * @param email The email.
	 * @param password The password.
	 */
	public login({ email, password }: Login): Observable<JwtToken> {
		return this.http.post<JwtTokenDto>(this.urlService.loginPath, { email, password }).pipe(
			map(token => JwtTokenMapper.fromDto(token)),
			shareReplay({
				refCount: true,
				bufferSize: 1,
			}),
		);
	}
}
