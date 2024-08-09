import { Routes } from '@angular/router';
import { URL_PATHS } from '@js-camp/core/utils/url-paths';

import { alreadyLoggedInGuard } from '../core/guards/already-logged-in.guard';

/** Routes object. */
export const appRoutes: Routes = [
	{
		path: URL_PATHS.home,
		loadComponent: () => import('./features/anime-dashboard/anime-dashboard.component').then(
			c => c.AnimeDashboardComponent,
		),
	},
	{
		path: URL_PATHS.login,
		loadComponent: () => import('./features/authentification/login/login.component').then(
			c => c.LoginComponent,
		),
		canActivate: [alreadyLoggedInGuard],
	},
	{
		path: URL_PATHS.register,
		loadComponent: () => import('./features/authentification/register/register.component').then(
			c => c.RegisterComponent,
		),
		canActivate: [alreadyLoggedInGuard],
	},
	{ path: '**', redirectTo: URL_PATHS.home },
];
