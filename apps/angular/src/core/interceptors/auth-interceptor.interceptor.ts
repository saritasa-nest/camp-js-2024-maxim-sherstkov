import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { map, Observable, switchMap } from 'rxjs';

import { UserSecretService } from '../services/user-secret.service';
import { ApiUrlService } from '../services/api-url.service';

/** Auth interceptor to add an access token to each request. */
@Injectable()
export class AuthInterceptor implements HttpInterceptor {
	private readonly apiUrlService = inject(ApiUrlService);

	private readonly tokenService = inject(UserSecretService);

	/** @inheritdoc */
	public intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
		if (request.url === this.apiUrlService.loginPath || request.url === this.apiUrlService.registerPath) {
			return next.handle(request);
		}
		return this.tokenService.secret$.pipe(
			map(token => {
				if (token === null) {
					return request;
				}
				return request.clone({
					headers: request.headers.set('Authorization', `Bearer ${token.access}`),
				});
			}),
			switchMap(authorizedRequest => next.handle(authorizedRequest)),
		);
	}
}
