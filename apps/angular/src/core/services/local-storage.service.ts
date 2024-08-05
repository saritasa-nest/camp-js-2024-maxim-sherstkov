import { Injectable } from '@angular/core';
import { defer, filter, fromEvent, map, merge, Observable, of, shareReplay, Subject } from 'rxjs';

/** Service to interact with the local storage. */
@Injectable({
	providedIn: 'root',
})
export class LocalStorageService {
/** Emits the key of the value changed in the local storage. */
	private readonly valueChangedSubject$ = new Subject<string>();

	/**
	 * Persists data to local storage by `key`.
	 * @param key Unique key.
	 * @param data Data for save.
	 */
	public save<T>(key: string, data: T): Observable<void> {

		return defer(() => {
			localStorage.setItem(key, JSON.stringify(data));
			this.valueChangedSubject$.next(key);
			console.log('saving');

			return of(undefined);
		});
	}

	/**
	 * Observes item from storage by `key`.
	 * @param key Unique key.
	 */
	public get<T = unknown>(key: string): Observable<T | null> {
		const initialValue$ = defer(() => of(this.obtainFromStorageByKey<T>(key)));
		const valueChanges$ = this.watchStorageChangeByKey(key).pipe(
			map(() => this.obtainFromStorageByKey<T>(key)),
		);
		return merge(
			initialValue$,
			valueChanges$,
		).pipe(
			shareReplay({ refCount: true, bufferSize: 1 }),
		);
	}

	private watchStorageChangeByKey(keyToWatch: string): Observable<void> {
		const otherPageChange$ = fromEvent(window, 'storage').pipe(
			filter((event): event is StorageEvent => event instanceof StorageEvent),
			map(event => event.key),
		);

		// storage event happens only for the other pages of this domain, so we need to handle the local changes manually
		// https://developer.mozilla.org/en-US/docs/Web/API/Window/storage_event
		const currentPageChange$ = this.valueChangedSubject$;

		return merge(
			otherPageChange$,
			currentPageChange$,
		).pipe(
			filter(key => key === keyToWatch),
			map(() => undefined),
		);
	}

	private obtainFromStorageByKey<T = unknown>(key: string): T | null {
		const rawData = localStorage.getItem(key);
		if (rawData == null) {
			return null;
		}
		return JSON.parse(rawData) as T;
	}

	/**
	 * Removes data from local storage.
	 * @param key Key.
	 */
	public remove(key: string): Observable<void> {
		return defer(() => {
			localStorage.removeItem(key);
			this.valueChangedSubject$.next(key);

			return of(undefined);
		});
	}
}
