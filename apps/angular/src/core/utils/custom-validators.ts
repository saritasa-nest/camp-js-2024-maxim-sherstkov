
import { FormControl, AbstractControl } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';

/**
 * Custom validator functions.
 */
export class CustomValidators {
	/**
	 * Checks if the password and confirm password fields match.
	 *
	 * @param c The control group.
	 */
	public static passwordMatcher(c: AbstractControl): { [key: string]: boolean; } | null {
		const passwordControl = c.get('password') as AbstractControl;
		const confirmControl = c.get('confirmPassword') as AbstractControl;

		if (passwordControl.pristine || confirmControl.pristine) {

			return null;
		}

		if (passwordControl.value === confirmControl.value) {
			return null;
		}
		return { passwordMatch: true };
	}
}

/**
 * Custom ErrorStateMatcher which returns true (error exists) when the parent form group is invalid and the control has been touched.
 */
export class ConfirmValidParentMatcher implements ErrorStateMatcher {
	/**
	 * Checks if the control is in an error state based on its parent form group's validity and whether it has been touched.
	 *
	 * @param control The control to check.
	 * @param form The parent form group.
	 */
	public isErrorState(control: FormControl | null): boolean {
		return (control?.parent?.invalid && control.touched) ?? false;
	}
}
