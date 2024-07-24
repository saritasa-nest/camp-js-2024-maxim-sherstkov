import { inject, Injectable } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { HttpParams } from '@angular/common/http';

import { getNumberFromString } from '../utils';

import { AppConfig } from './app-config';

const DEFAULT_PARAMS = {
	offset: 0,
	limit: 15,
};

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

	private readonly paramsFromUrl: typeof DEFAULT_PARAMS;

	public constructor(private route: ActivatedRoute) {
		this.animeListPath = `${this.appConfig.apiUrl}/anime/anime/`;
		this.paramsFromUrl = {
			offset: getNumberFromString(this.route.snapshot.queryParamMap.get('page')) ?? DEFAULT_PARAMS.offset,
			limit: getNumberFromString(this.route.snapshot.queryParamMap.get('limit')) ?? DEFAULT_PARAMS.limit,
		};
	}

	/** Get params from the URL. */
	public getParamsFunction(): HttpParams {
		return new HttpParams({
			fromObject: this.paramsFromUrl,
		});
	}
}
