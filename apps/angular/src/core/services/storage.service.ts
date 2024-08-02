import { Injectable } from '@angular/core';

/** Service to interact with the storage. */
@Injectable({
	providedIn: 'root',
})
export class StorageService {

	/**
	 * Sets an item in the local storage.
	 *
	 * @param key The key of the item.
	 * @param value The value of the item.
	 */
	public setItem<T = unknown>(key: string, value: T): void {
		localStorage.setItem(key, JSON.stringify(value));
	}

	/**
	 * Retrieves the value by the key from local storage.
	 *
	 * @param key The key of the item to retrieve.
	 */
	public getItem<T = unknown>(key: string): T | null {
		return JSON.parse(localStorage.getItem(key) ?? 'null');
	}

	/**
	 * Removes the value from local storage.
	 *
	 * @param key The key of the item to remove.
	 */
	public removeItem(key: string): void {
		localStorage.removeItem(key);
	}

	/**
	 * Clears all items from the local storage.
	 */
	public clear(): void {
		localStorage.clear();
	}
}
