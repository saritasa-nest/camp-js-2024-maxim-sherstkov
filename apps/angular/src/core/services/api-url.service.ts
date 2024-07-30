import { inject, Injectable } from '@angular/core';

import { AppConfig } from '@js-camp/angular/core/services/app-config';

/**
 * Service provides URL paths for the API.
 */
@Injectable({
	providedIn: 'root',
})
export class ApiUrlService {
	private readonly appConfig = inject(AppConfig);

	/** Path to API to get anime list. */
	public readonly animeListPath: string;

	/** Path to API to login. */
	public readonly loginPath: string;

	public constructor() {
		this.animeListPath = `${this.appConfig.apiUrl}/anime/anime/`;
		this.loginPath = `${this.appConfig.apiUrl}/auth/login`;
	}
}
