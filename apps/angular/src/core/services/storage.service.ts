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
	public setItem(key: string, value: string): void {
		localStorage.setItem(key, value);
	}

	/**
	 * Retrieves the value by the key from local storage.
	 *
	 * @param key The key of the item to retrieve.
	 */
	public getItem(key: string): string | null {
		return localStorage.getItem(key);
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
