import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { map, Observable, switchMap } from 'rxjs';

import { UserSecretService } from '../services/user-secret.service';
import { ApiUrlService } from '../services/api-url.service';

const AUTH_HEADER_KEY = 'Authorization';

/** Auth interceptor to add an access token to each request. */
@Injectable()
export class AuthInterceptor implements HttpInterceptor {
	private readonly apiUrlService = inject(ApiUrlService);

	private readonly userSecretService = inject(UserSecretService);

	/** @inheritdoc */
	public intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
		if (this.shouldInterceptSecretForUrl(request.url)) {
			return next.handle(request);
		}
		return this.userSecretService.secret$.pipe(
			map(userSecret =>

				userSecret && !request.headers.has(AUTH_HEADER_KEY) ?
					request.clone({
						headers: request.headers.set(
							AUTH_HEADER_KEY,
							`Bearer ${userSecret.access}`,
						),
					}) :
					request),
			switchMap(authorizedRequest => next.handle(authorizedRequest)),
		);
	}

	private shouldInterceptSecretForUrl(url: string): boolean {
		return url === this.apiUrlService.loginPath || url === this.apiUrlService.registerPath;
	}
}
