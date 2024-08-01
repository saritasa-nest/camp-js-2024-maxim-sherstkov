import { inject, Injectable } from '@angular/core';
import { Params, Router } from '@angular/router';

/** Service to manage query params. */
@Injectable({
	providedIn: 'root',
})
export class QueryParamsService {
	/** Router object. */
	protected readonly router: Router = inject(Router);

	/**
	 * Merge query parameters with existing.
	 * @param params Page parameters.
	 */
	public changeQueryParams(params: Params): void {
		this.router.navigate([], {
			queryParams: params,
			queryParamsHandling: 'merge',
		});
	}
}
