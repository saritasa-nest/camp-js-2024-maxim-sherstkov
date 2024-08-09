import { ChangeDetectionStrategy, ChangeDetectorRef, Component, DestroyRef, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NonNullableFormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '@js-camp/angular/core/services/auth.service';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { BehaviorSubject, catchError, finalize } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Registration } from '@js-camp/core/models/registration';
import { FormErrorService } from '@js-camp/angular/core/services/form-error.service';
import { Router } from '@angular/router';
import { URL_PATHS } from '@js-camp/core/utils/url-paths';
import { ExtendedApiError } from '@js-camp/core/models/api-error';

import { AuthComponent } from '../auth.component';
import { ConfirmValidParentMatcher, CustomValidators } from '../../../../core/utils/custom-validators';
import { InputPasswordComponent } from '../input-password/input-password.component';

/** Register page component. */
@Component({
	selector: 'camp-register',
	standalone: true,
	templateUrl: './register.component.html',
	styleUrl: './register.component.css',
	changeDetection: ChangeDetectionStrategy.OnPush,
	imports: [
		CommonModule,
		ReactiveFormsModule,
		MatCardModule,
		MatButtonModule,
		MatFormFieldModule,
		MatInputModule,

		// TODO delete
		MatIconModule,
		AuthComponent,
		InputPasswordComponent,
	],
})
export class RegisterComponent {
	private readonly destroyRef = inject(DestroyRef);

	private readonly changeDetector = inject(ChangeDetectorRef);

	private readonly fb = inject(NonNullableFormBuilder);

	private readonly authService = inject(AuthService);

	private readonly router = inject(Router);

	/** Form error service. */
	protected readonly formErrorService = inject(FormErrorService);

	/** Material directive to determine the validity of `<mat-form-field>`. */
	protected readonly confirmValidParentMatcher = new ConfirmValidParentMatcher();

	/** Register form control group. */
	protected readonly registerForm = this.fb.group({
		email: ['', [Validators.required, Validators.email]],
		passwordGroup: this.fb.group({
			password: ['', [Validators.required, Validators.minLength(8)]],
			confirmPassword: ['', Validators.required],
		}, { validators: CustomValidators.passwordMatcher }),
		firstName: ['', [Validators.required, Validators.maxLength(30)]],
		lastName: ['', [Validators.required, Validators.maxLength(30)]],
	});

	/** Hide password flag. */
	protected readonly hidePassword = signal(true);

	/** Loading state. */
	protected readonly isLoading$ = new BehaviorSubject<boolean>(false);

	/** Registers user with the provided credentials. */
	public onSubmit(): void {
		if (this.registerForm.invalid) {
			return;
		}
		this.isLoading$.next(true);

		const formRawValue = this.registerForm.getRawValue();
		const registrationData = {
			email: formRawValue.email,
			password: formRawValue.passwordGroup.password,
			firstName: formRawValue.firstName,
			lastName: formRawValue.lastName,
		};
		const credentials = new Registration(registrationData);

		this.authService.register(credentials)
			.pipe(
				catchError((error: unknown) => {
					if (error instanceof ExtendedApiError) {
						this.formErrorService.showFormValidationErrors(this.registerForm, error);
						this.changeDetector.markForCheck();
					}
					throw Error;
				}),
				finalize(() => {
					this.isLoading$.next(false);
				}),
				takeUntilDestroyed(this.destroyRef),
			)
			.subscribe(
				_ => this.router.navigate([URL_PATHS.home]),
			);

	}

	/**
	 * Handles hide password button click.
	 * @param event The click event.
	 */
	protected clickHidePassword(event: Event): void {
		this.hidePassword.set(!this.hidePassword());
		event.stopPropagation();
	}
}
