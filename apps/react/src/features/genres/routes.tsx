import { lazy } from 'react';
import { Navigate, RouteObject } from 'react-router-dom';

const GenresPage = lazy(() => import('./pages/GenresPage').then(module => ({ default: module.GenresPage })));

/** An array of route objects for genres. */
export const genresRoutes: RouteObject[] = [
	{
		path: 'genres',
		element: <GenresPage />,
	},
	{
		path: '*',
		element: <Navigate to="GenresPage" />,
	},
];