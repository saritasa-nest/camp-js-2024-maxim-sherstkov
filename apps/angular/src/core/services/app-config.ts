import { Injectable } from '@angular/core';

import { environment } from '../../environments/environment';

/**
 * AppConfig provides configuration settings for the application.
 */
@Injectable()
export class AppConfig {
	/**
	 * URL API from environment.
	 *
	 * @type {string}
	 * @readonly
	 */
	public readonly apiUrl = environment.apiUrl;
}
