import { ChangeDetectionStrategy, Component, inject, OnDestroy, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AbstractControl, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '@js-camp/angular/core/services/auth.service';
import { Router } from '@angular/router';
import { Registration } from '@js-camp/core/models/registration';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { Subject, takeUntil } from 'rxjs';
import { ErrorStateMatcher, ShowOnDirtyErrorStateMatcher } from '@angular/material/core';

/** Register page component. */
@Component({
	selector: 'camp-register',
	standalone: true,
	templateUrl: './register.component.html',
	styleUrl: './register.component.css',
	changeDetection: ChangeDetectionStrategy.OnPush,

	providers: [{ provide: ErrorStateMatcher, useClass: ShowOnDirtyErrorStateMatcher }],
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
export class RegisterComponent implements OnInit, OnDestroy {

	private destroy$ = new Subject<void>();

	private readonly formBuilder: FormBuilder = inject(FormBuilder);

	private readonly authService = inject(AuthService);

	private readonly router = inject(Router);

	// TODO ask good place to put this
	/** Register form control group. */
	protected readonly registerForm: FormGroup = this.formBuilder.group({
		email: ['', [Validators.required, Validators.email]],
		passwordGroup: this.formBuilder.group({
			password: ['', [Validators.required, Validators.minLength(8)]],
			confirmPassword: ['', Validators.required],
		}, { validators: this.passwordMatcher }),
		firstName: ['', [Validators.required, Validators.maxLength(30)]],
		lastName: ['', Validators.required],
	});

	/** Email error message. */
	protected readonly emailErrorMessage = signal('');

	/** Hide password flag. */
	protected readonly hidePassword = signal(true);

	private readonly validationMessages: { [key: string]: string; } = {
		required: 'Please fill the required field.',
		email: 'Please enter a valid email address.',
	};

	/** @inheritdoc */
	public ngOnInit(): void {
		const emailControl = this.registerForm.get('email') as AbstractControl;
		emailControl.valueChanges.pipe(
			takeUntil(this.destroy$),
		).subscribe(_ => this.setEmailErrorMessage(emailControl));

	}

	/** @inheritdoc */
	public ngOnDestroy(): void {
		this.destroy$.next();
		this.destroy$.complete();
	}

	/**
	 * Checks if the password and confirm password fields match.
	 *
	 * @param c The control group.
	 */
	private passwordMatcher(c: AbstractControl): { [key: string]: boolean; } | null {
		const passwordControl = c.get('password') as AbstractControl;
		const confirmControl = c.get('confirmPassword') as AbstractControl;

		if (passwordControl.pristine || confirmControl.pristine) {
			return null;
		}

		if (passwordControl.value === confirmControl.value) {
			return null;
		}
		return { match: true };
	}

	/**
	 * Registers  user with the provided credentials.
	 */
	public onSubmit(): void {
		if (this.registerForm.invalid) {
			return;
		}
		const credentials = new Registration(this.registerForm.value);
		console.log(credentials);

	}

	/**
	 * Handles hide password button click.
	 *
	 * @param event The click event.
	 *  */
	protected clickHidePassword(event: Event): void {
		this.hidePassword.set(!this.hidePassword());
		event.stopPropagation();
	}

	/**
	 * Sets the email message.
	 *
	 * @param c The control to check for errors.
	 */
	private setEmailErrorMessage(c: AbstractControl): void {
		this.emailErrorMessage.set('');
		if ((c.touched || c.dirty) && c.errors) {
			this.emailErrorMessage.set(
				Object.keys(c.errors).map(
					key => this.validationMessages[key],
				)
					.join(' '),
			);
		}
	}

	/** Password group control getter. */
	protected get passwordGroup(): AbstractControl {
		return this.registerForm.get('passwordGroup') as AbstractControl;
	}

}
