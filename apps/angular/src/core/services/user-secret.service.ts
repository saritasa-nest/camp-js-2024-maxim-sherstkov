import { inject, Injectable } from '@angular/core';
import { UserSecret } from '@js-camp/core/models/user-secret';
import { map, Observable } from 'rxjs';

import { LocalStorageService } from './local-storage.service';

const SECRET_KEY = 'auth-key';

/** User secret service. */
@Injectable({
	providedIn: 'root',
})
export class UserSecretService {
	private readonly storageService = inject(LocalStorageService);

	/** Auth token of the current user. */
	public readonly secret$: Observable<UserSecret | null>;

	public constructor() {
		this.secret$ = this.storageService.get<UserSecret>(SECRET_KEY);
	}

	/**
	 * Sets the secret and saves it to local storage.
	 * @param secret Secret.
	 */
	public setSecret(secret: UserSecret): Observable<UserSecret> {
		return this.storageService.save(SECRET_KEY, secret).pipe(map(() => secret));
	}

	/** Removes current secret. */
	public removeSecret(): Observable<void> {
		return this.storageService.remove(SECRET_KEY);
	}
}
