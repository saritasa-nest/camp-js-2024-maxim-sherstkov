import { Injectable } from '@angular/core';
import { JwtToken } from '@js-camp/core/models/jwt-token';
import { BehaviorSubject, Observable, ReplaySubject } from 'rxjs';

@Injectable({
	providedIn: 'root',
})
export class TokenService {

	private readonly token$: Observable<JwtToken | null>;

	public getToken(): ReplaySubject<JwtToken | null> {
		return this.token$;
	}
}
