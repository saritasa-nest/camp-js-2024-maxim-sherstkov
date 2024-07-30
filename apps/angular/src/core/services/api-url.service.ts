import { inject, Injectable } from '@angular/core';

import { AppConfig } from './app-config';

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

	public constructor() {
		this.animeListPath = `${this.appConfig.apiUrl}/anime/anime/`;
	}
}
