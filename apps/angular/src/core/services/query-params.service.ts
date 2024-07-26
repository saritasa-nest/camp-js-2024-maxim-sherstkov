import { HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Params, Router } from '@angular/router';

type TPaginationParams = Readonly<{

	// TODO make comment clear
	/** The number of elements that can be on a page. */
	limit: number;

	/** The number of pages we need to skip in the request.  */
	page: number;
}>;

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

	/**
	 * Get an instance of HTTPParams from params.
	 * @param params Page parameters.
	 *  */
	public getHttpParams(params: TPaginationParams): HttpParams {
		// TODO FIX type for params(mb make service only for a default params)

		return new HttpParams()
			.set('limit', params.limit.toString())
			.set('offset', (params.page * params.limit).toString());
	}
}
