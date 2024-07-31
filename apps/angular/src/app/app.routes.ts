import { Routes } from '@angular/router';
import { URL_PATHS } from '@js-camp/core/utils/url-paths';

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
		loadComponent: () => import('./features/login/login.component').then(
			c => c.LoginComponent,
		),
	},
	{
		path: URL_PATHS.register,
		loadComponent: () => import('./features/register/register.component').then(
			c => c.RegisterComponent,
		),
	},
	{ path: '**', redirectTo: URL_PATHS.home },
];
