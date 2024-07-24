import { inject, Injectable } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';

import { HttpParams } from '@angular/common/http';

import { BehaviorSubject, combineLatest, map, Observable } from 'rxjs';

import { getNumberFromString } from '../utils';

import { AppConfig } from './app-config';

export const DEFAULT_PARAMS = {
	offset: 0,
	limit: 15,
};

export type TQueryParams = typeof DEFAULT_PARAMS;

/**
 * Service provides URL paths for the API.
 */
@Injectable({
	providedIn: 'root',
})
export class ApiUrlService {
	private readonly appConfig = inject(AppConfig);

	/** Full path to API to get anime list. */
	public readonly animeListPath: string;

	// private readonly paramsFromUrl: typeof DEFAULT_PARAMS;

	public paginationParams$ = new BehaviorSubject<TQueryParams>({
		offset: DEFAULT_PARAMS.offset,
		limit: DEFAULT_PARAMS.limit,
	});

	public testBeh = new BehaviorSubject<TQueryParams>({
		offset: DEFAULT_PARAMS.offset,
		limit: DEFAULT_PARAMS.limit,
	});

	// public constructor(private route: ActivatedRoute) {
	// 	this.animeListPath = `${this.appConfig.apiUrl}/anime/anime/`;
	// 	this.paramsFromUrl = {
	// 		offset: getNumberFromString(this.route.snapshot.queryParamMap.get('page')) ?? DEFAULT_PARAMS.offset,
	// 		limit: getNumberFromString(this.route.snapshot.queryParamMap.get('limit')) ?? DEFAULT_PARAMS.limit,
	// 	};
	// }
	public constructor(private route: ActivatedRoute) {
		this.animeListPath = `${this.appConfig.apiUrl}/anime/anime/`;

		/* Combine latest from route query params and BehaviorSubject */
		combineLatest([
			this.route.queryParamMap,
			this.paginationParams$.asObservable(),
		]).pipe(
			map(([params, paginatedParams]: [ParamMap, TQueryParams]) => {
				// Update BehaviorSubject with new values from the URL or use existing ones
				const offset = parseInt(params.get('page') ?? paginatedParams.offset.toString(), 10);
				const limit = parseInt(params.get('limit') ?? paginatedParams.limit.toString(), 10);
				this.paginationParams$.next({ offset, limit });

				let httpParams = new HttpParams();
				httpParams = httpParams.set('offset', offset.toString());
				httpParams = httpParams.set('limit', limit.toString());

				return httpParams;
			}),
		)
			.subscribe({
				next(params) {
				// This could trigger a fetch operation or similar
					console.log('Query params updated:', params);
				},
			});
	}

	/** Get params as HttpParams instance. */
	public getParamsFunction(): HttpParams {

		return new HttpParams({
			fromObject: this.paginationParams$.value,
		});
	}
}
