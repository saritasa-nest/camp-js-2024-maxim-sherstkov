import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { AppConfig } from '../services/app-config';

/**
 * API key interceptor to add an API key header to each request.
 */
@Injectable()
export class ApiKeyInterceptor implements HttpInterceptor {
	private readonly appConfig = inject(AppConfig);

	/** @inheritdoc */
	public intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {

		/** Add a new API key header to the request. */
		const apiKeyReq = request.clone({
			headers: request.headers.set('Api-key', this.appConfig.apiKey),
		});

		/** Send cloned request with header to the next handler. */
		return next.handle(apiKeyReq);
	}
}
