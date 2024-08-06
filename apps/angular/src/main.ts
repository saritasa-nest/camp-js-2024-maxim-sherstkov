import { enableProdMode } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';
import { provideRouter } from '@angular/router';
import { HTTP_INTERCEPTORS, provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';

import { environment } from './environments/environment';
import { AppComponent } from './app/app.component';
import { appRoutes } from './app/app.routes';
import { AppConfig } from './core/services/app-config';
import { ApiKeyInterceptor } from './core/interceptors/api-key.interceptor';
import { AuthInterceptor } from './core/interceptors/auth-interceptor.interceptor';

if (environment.production) {
	enableProdMode();
}

bootstrapApplication(AppComponent, {
	providers: [
		provideRouter(appRoutes),
		provideHttpClient(withInterceptorsFromDi()),
		{
			provide: HTTP_INTERCEPTORS,
			useClass: ApiKeyInterceptor,
			multi: true,
		},
		{
			provide: HTTP_INTERCEPTORS,
			useClass: AuthInterceptor,
			multi: true,
		},
		AppConfig,
		provideAnimationsAsync(),
	],
}).catch(err => console.error(err));
