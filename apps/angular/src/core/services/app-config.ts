import { Injectable } from '@angular/core';

import { environment } from '@js-camp/angular/environments/environment';

/**
 * AppConfig provides configuration settings for the application.
 */
@Injectable({
	providedIn: 'root',
})
export class AppConfig {
	/**
	 * URL API from environment.
	 *
	 * @type {string}
	 * @readonly
	 */
	public readonly apiUrl = environment.apiUrl;

	/**
	 * Api-key from environment.
	 *
	 * @type {string}
	 * @readonly
	 */
	public readonly apiKey = environment.apiKey;
}
