import { enableProdMode } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';
import { provideRouter } from '@angular/router';

import { provideHttpClient } from '@angular/common/http';

import { environment } from './environments/environment';
import { AppComponent } from './app/app.component';
import { appRoutes } from './app/app.routes';
import { AppConfig } from './core/services/app-config';

if (environment.production) {
	enableProdMode();
}

bootstrapApplication(AppComponent, {
	providers: [provideRouter(appRoutes), provideHttpClient(), AppConfig],
}).catch(err => console.error(err));
