import { Routes } from '@angular/router';

/** Routes object. */
export const appRoutes: Routes = [
	{
		path: '',
		loadComponent: () => import('./features/anime-dashboard/anime-dashboard.component').then(
			c => c.AnimeDashboardComponent,
		),
	},
];
