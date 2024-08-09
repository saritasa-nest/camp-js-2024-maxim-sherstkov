import { ChangeDetectionStrategy, ChangeDetectorRef, Component, DestroyRef, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '@js-camp/angular/core/services/auth.service';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { BehaviorSubject, catchError, of, take } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Registration } from '@js-camp/core/models/registration';
import { FormErrorService } from '@js-camp/angular/core/services/form-error.service';
import { Router } from '@angular/router';
import { URL_PATHS } from '@js-camp/core/utils/url-paths';
import { ExtendedApiError } from '@js-camp/core/models/api-error';

import { AuthComponent } from '../auth.component';
import { ConfirmValidParentMatcher, CustomValidators } from '../../../../core/utils/custom-validators';

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
		MatIconModule,
		AuthComponent,
	],
})
export class RegisterComponent {
	private readonly destroyRef = inject(DestroyRef);

	private readonly changeDetector = inject(ChangeDetectorRef);

	private readonly formBuilder = inject(FormBuilder);

	private readonly authService = inject(AuthService);

	private readonly router = inject(Router);

	/** Form error service. */
	protected readonly formErrorService = inject(FormErrorService);

	/** Material directive to determine the validity of `<mat-form-field>`. */
	protected readonly confirmValidParentMatcher = new ConfirmValidParentMatcher();

	/** Register form control group. */
	protected readonly registerForm: FormGroup = this.formBuilder.group({
		email: ['', [Validators.required, Validators.email]],
		passwordGroup: this.formBuilder.group({
			password: ['', [Validators.required, Validators.minLength(8)]],
			confirmPassword: ['', Validators.required],
		}, { validators: CustomValidators.passwordMatcher }),
		firstName: ['', [Validators.required, Validators.maxLength(30)]],
		lastName: ['', [Validators.required, Validators.maxLength(30)]],
	});

	/** Hide password flag. */
	protected readonly hidePassword$ = new BehaviorSubject<boolean>(true);

	/** Registers user with the provided credentials. */
	public onSubmit(): void {
		if (this.registerForm.invalid) {
			return;
		}
		const credentials = new Registration({ ...this.registerForm.value, password: this.registerForm.value.passwordGroup.password });
		this.authService.register(credentials)
			.pipe(
				takeUntilDestroyed(this.destroyRef),
				catchError((error: unknown) => {
					if (error instanceof ExtendedApiError) {
						this.formErrorService.renderServerErrors(this.registerForm, error);
						this.changeDetector.markForCheck();
					}
					return of(null);
				}),
			)
			.subscribe(
				response => {
					if (response !== null) {
						this.router.navigate([URL_PATHS.home]);
					}
				},
			);

	}

	/**
	 * Handles hide password button click.
	 *
	 * @param event The click event.
	 *  */
	protected clickHidePassword(event: Event): void {
		this.hidePassword$.pipe(
			take(1),
		).subscribe(value => this.hidePassword$.next(!value));

		event.stopPropagation();
	}
}
