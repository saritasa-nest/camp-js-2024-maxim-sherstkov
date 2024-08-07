import { inject, Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

const SNACKBAR_OPTIONS = {
	action: 'OK',
	duration: 7,
};

/** Notification service. */
@Injectable({
	providedIn: 'root',
})
export class NotificationService {
	/** Snackbar instance. */
	protected readonly _snackBar: MatSnackBar = inject(MatSnackBar);

	/**
	 * Displays a notification bar.
	 *
	 * @param message The message to be displayed in the notification bar.
	 */
	public showMessage(message: string): void {
		this._snackBar.open(message, SNACKBAR_OPTIONS.action, { duration: SNACKBAR_OPTIONS.duration * 1000 });
	}
}
