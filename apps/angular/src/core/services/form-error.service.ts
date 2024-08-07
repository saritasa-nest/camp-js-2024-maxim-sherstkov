import { inject, Injectable } from '@angular/core';
import { AbstractControl, FormGroup } from '@angular/forms';
import { ApiError } from '@js-camp/core/models/api-error';

import { NotificationService } from './notification.service';

/** Form error service. */
@Injectable({
	providedIn: 'root',
})
export class FormErrorService {
	private readonly notificationService = inject(NotificationService);

	// eslint-disable-next-line @typescript-eslint/naming-convention
	private readonly ERROR_MESSAGES = {
		general: 'Something went wrong. Please try again later.',
	};

	/**
	 * Renders server errors on the form.
	 *
	 * @param form The form.
	 * @param apiError The API error object.
	 */
	public renderServerErrors(form: FormGroup, apiError: ApiError): void {
		if (apiError.errors.length === 0) {
			this.notificationService.showMessage(this.ERROR_MESSAGES.general);
			return;
		}
		apiError.errors.forEach(error => {
			console.log(error);

			const fieldName = error.attr;
			const message = error.detail;

			if (!fieldName) {
				this.notificationService.showMessage(message ?? this.ERROR_MESSAGES.general);
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
		return form.get(fieldName);
	}

	private setFieldError(form: FormGroup, fieldName: string, message: string): void {
		const control = this.findFieldControl(form, fieldName);
		const errors = { [message]: true };
		control?.setErrors(errors);
	}

	/**
	 * Retrieves the error message of a field.
	 *
	 * @param form The form group.
	 * @param fieldName The field name.
	 */
	public getFieldError(form: FormGroup, fieldName: string): string | null {
		return this.getFieldErrors(form, fieldName).join('\n');
	}

	private getFieldErrors(form: FormGroup, fieldName: string): string[] {
		const control = this.findFieldControl(form, fieldName);
		if (control && control.touched && control.errors) {
			return this.getErrors(control);
		}
		return [];

	}

	private getErrors(control: AbstractControl): string[] {
		if (!control?.errors) {
			return [];
		}

		return Object.keys(control.errors).map(error => control?.errors?.[error] ? error : 'null')
			.filter(Boolean);
	}

}
