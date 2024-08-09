import { inject } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivateFn, Router, RouterStateSnapshot } from '@angular/router';
import { of, switchMap } from 'rxjs';
import { URL_PATHS } from '@js-camp/core/utils/url-paths';

import { UserService } from '../services/user.service';

/**
 * Checks user's access to a route.
 *
 * @param _route Activated route.
 * @param _state The current state of the router.
 */
export const alreadyLoggedInGuard: CanActivateFn = (_route: ActivatedRouteSnapshot, _state: RouterStateSnapshot) => {
	const userService = inject(UserService);
	const router = inject(Router);

	return userService.isUserLoggedIn$.pipe(
		switchMap(value => {
			if (!value) {
				return of(true);
			}
			router.navigate([URL_PATHS.home]);
			return of(false);
		}),
	);
};
