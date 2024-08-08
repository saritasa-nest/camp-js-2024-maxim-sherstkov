import { Injectable, inject } from '@angular/core';
import { CanActivate, CanActivateChild, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable, of, switchMap } from 'rxjs';
import { URL_PATHS } from '@js-camp/core/utils/url-paths';

import { UserService } from '../services/user.service';

/** Already logged in guard. */
@Injectable({
	providedIn: 'root',
})
export class AlreadyLoggedInGuard implements CanActivate, CanActivateChild {
	private readonly userService = inject(UserService);

	private readonly router = inject(Router);

	/**
	 * Checks user's access to a route.
	 *
	 * @param _next Activated route.
	 * @param _state The current state of the router.
	 */
	public canActivate(
		_next: ActivatedRouteSnapshot,
		_state: RouterStateSnapshot,
	): Observable<boolean> {
		return this.userService.isUserLoggedIn$.pipe(
			switchMap(value => {
				if (!value) {
					return of(true);
				}
				this.router.navigate([URL_PATHS.home]);
				return of(false);
			}),
		);
	}

	/**
	 * Checks user's access to a child route.
	 *
	 * @param next Activated route.
	 * @param state The current state of the router.
	 */
	public canActivateChild(
		next: ActivatedRouteSnapshot,
		state: RouterStateSnapshot,
	): Observable<boolean> {
		return this.canActivate(next, state);
	}
}
