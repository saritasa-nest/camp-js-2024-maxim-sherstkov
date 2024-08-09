import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpStatusCode } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable, catchError, shareReplay, switchMap, tap, throwError } from 'rxjs';

import { ApiUrlService } from '../services/api-url.service';
import { UserService } from '../services/user.service';

/** Refresh interceptor for access token. */
@Injectable()
export class RefreshInterceptor implements HttpInterceptor {
	private readonly apiUrlService = inject(ApiUrlService);

	private readonly userService = inject(UserService);

	private refreshSecretRequest$: Observable<void> | null = null;

	/** @inheritdoc */
	public intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
		if (!this.shouldSecretBeRefreshedForUrl(request.url)) {
			return next.handle(request);
		}
		return next.handle(request).pipe(
			catchError((error: unknown) => {
				if (this.shouldHttpErrorBeIgnored(error)) {
					return throwError(() => error);
				}

				this.refreshSecretRequest$ ??= this.userService.refresh().pipe(
					shareReplay({ refCount: true, bufferSize: 1 }),
				);

				return this.refreshSecretRequest$.pipe(
					tap(() => {
						this.refreshSecretRequest$ = null;
					}),
					switchMap(() => next.handle(request)),
				);
			}),
		);
	}

	private shouldHttpErrorBeIgnored(error: unknown): boolean {

		if (error instanceof HttpErrorResponse) {
			return error.status !== HttpStatusCode.Unauthorized;
		}
		return false;
	}

	private shouldSecretBeRefreshedForUrl(url: string): boolean {
		return url !== this.apiUrlService.loginPath && url !== this.apiUrlService.registerPath;
	}
}
