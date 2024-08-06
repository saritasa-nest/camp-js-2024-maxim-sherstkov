import { ChangeDetectionStrategy, Component, DestroyRef, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '@js-camp/angular/core/services/auth.service';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { BehaviorSubject, take } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Registration } from '@js-camp/core/models/registration';

import { ConfirmValidParentMatcher, CustomValidators, errorMessages } from '../../../core/utils/custom-validators';

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
	],
})
export class RegisterComponent {
	private readonly destroyRef = inject(DestroyRef);

	private readonly formBuilder: FormBuilder = inject(FormBuilder);

	private readonly authService = inject(AuthService);

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

	/** Error messages. */
	protected readonly errorMessages = errorMessages;

	/** Hide password flag. */
	protected readonly hidePassword$ = new BehaviorSubject<boolean>(true);

	/**
	 * Registers  user with the provided credentials.
	 */
	public onSubmit(): void {
		if (this.registerForm.invalid) {
			return;
		}
		const credentials = new Registration({ ...this.registerForm.value, password: this.registerForm.value.passwordGroup.password });
		this.authService.register(credentials)
			.pipe(takeUntilDestroyed(this.destroyRef))
			.subscribe(
				response => {
					console.log(response);

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
