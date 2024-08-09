
import { inject, Injectable } from '@angular/core';
import { AbstractControl, FormGroup } from '@angular/forms';
import { ApiError } from '@js-camp/core/models/api-error';

import { NotificationService } from './notification.service';

const ERROR_MESSAGES: Record<string, string> = {
	default: 'Something went wrong. Please try again later.',
	required: 'This field is required.',
	email: 'Enter a valid email address.',
	minlength: `Below the minimum length required for this field.`,
	maxlength: `Exceeds the maximum length of this field.`,
	passwordMatch: 'Passwords do not match.',
};

/** Form error service. */
@Injectable({
	providedIn: 'root',
})
export class FormErrorService {
	private readonly notificationService = inject(NotificationService);

	/**
	 * Renders errors from API on the form.
	 * @param form The form.
	 * @param apiError The API error object.
	 */
	public showFormValidationErrors(form: FormGroup, apiError: ApiError): void {
		if (apiError.errors.length === 0) {
			this.notificationService.showMessage(ERROR_MESSAGES['default']);
			return;
		}
		apiError.errors.forEach(error => {
			const fieldName = error.attr;
			const message = error.detail;

			if (!fieldName) {
				this.notificationService.showMessage(message ?? ERROR_MESSAGES['default']);
				return;
			}
			if (form == null || !this.hasFieldName(form, fieldName)) {
				this.notificationService.showMessage(`Error: ${fieldName} ${message}`);
			} else {
				this.setFieldError(form, fieldName, message);
			}
		});
	}

	private hasFieldName(form: FormGroup, fieldName: string): boolean {
		const control = this.findFieldControl(form, fieldName);
		return control != null;
	}

	private findFieldControl(form: FormGroup, fieldName: string): AbstractControl | null {
		let control = form.get(fieldName);
		if (!control) {
			Object.keys(form.controls).forEach(key => {
				const groupControl = form.get(key);
				if (groupControl instanceof FormGroup) {
					const nestedControl = this.findFieldControl(groupControl, fieldName);
					if (nestedControl) {
						control = nestedControl;
					}
				}
			});
		}
		return control;
	}

	private setFieldError(form: FormGroup, fieldName: string, message: string): void {
		const control = this.findFieldControl(form, fieldName);
		const errors = { ...control?.errors, [message]: true };
		control?.setErrors(errors);
	}

	/**
	 * Retrieves the error message of a field.
	 * @param form The form group.
	 * @param fieldName The field name.
	 */
	public getFieldError(form: FormGroup, fieldName: string): string | null {
		return this.getFieldErrors(form, fieldName);
	}

	private getFieldErrors(form: FormGroup, fieldName: string): string {
		const control = this.findFieldControl(form, fieldName);
		if (control?.touched && control.errors) {
			return this.getErrors(control);
		}
		return '';

	}

	/**
	 * Retrieves the errors of the control.
	 * @param control Form control.
	 */
	public getErrors(control: AbstractControl): string {
		const errors = { ...control?.errors, ...control?.parent?.errors };
		if (!errors) {
			return '';
		}
		console.log(control?.parent);

		console.log(Object.keys(errors).map(errorKey => this.getErrorMessage(errorKey)));

		// return ['Error'];

		return Object.keys(errors).map(errorKey => this.getErrorMessage(errorKey))
			.join(' ');
	}

	private getErrorMessage(errorKey: string): string {
		return ERROR_MESSAGES[errorKey] || errorKey;
	}
}
