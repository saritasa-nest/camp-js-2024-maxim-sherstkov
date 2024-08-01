import { ChangeDetectionStrategy, Component, inject, OnDestroy, OnInit, Signal, signal, WritableSignal } from '@angular/core';
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
import { last, Subject, takeUntil } from 'rxjs';
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

	protected readonly firstNameErrorMessage = signal('');

	protected readonly lastNameErrorMessage = signal('');

	protected readonly errorMessages: { [key: string]: WritableSignal<string>; } = {
		email: signal(''),
		firstName: signal(''),
		lastName: signal(''),
		password: signal(''),
		confirmPassword: signal(''),
		passwordGroup: signal(''),
	};

	/** Hide password flag. */
	protected readonly hidePassword = signal(true);

	private readonly validationMessages: { [key: string]: string; } = {
		required: 'Please fill the required field.',
		email: 'Please enter a valid email address.',
		minlength: 'The field is too short.',
		maxlength: 'The field exceeds the maximum length requirement.',
		match: 'The password fields do not match.',
	};

	/** @inheritdoc */
	public ngOnInit(): void {
		this.setupErrorMessages('email', this.errorMessages['email']);
		this.setupErrorMessages('firstName', this.errorMessages['firstName']);
		this.setupErrorMessages('lastName', this.errorMessages['lastName']);
		this.setupErrorMessages('passwordGroup.password', this.errorMessages['password']);
		this.setupErrorMessages('passwordGroup.confirmPassword', this.errorMessages['confirmPassword']);
		this.setupErrorMessages('passwordGroup', this.errorMessages['passwordGroup']);
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
	 * Sets up error messages for a form control.
	 *
	 * @param controlName Control name.
	 * @param errorMessageSignal The signal to store the error message.
	 */
	private setupErrorMessages(controlName: string, errorMessageSignal: WritableSignal<string>): void {
		const control = this.registerForm.get(controlName) as AbstractControl;

		control.valueChanges.pipe(
			takeUntil(this.destroy$),
		).subscribe(_ => this.setErrorMessage(control, errorMessageSignal));
	}

	/**
	 * Sets the error message for a control.
	 *
	 * @param c The control.
	 * @param errorMessageSignal The signal to store the error message.
	 */
	private setErrorMessage(c: AbstractControl, errorMessageSignal: WritableSignal<string>): void {
		errorMessageSignal.set('');
		if ((c.touched || c.dirty) && c.errors) {
			errorMessageSignal.set(
				Object.keys(c.errors).map(
					key => this.validationMessages[key],
				)
					.join(' '),
			);
			console.log(errorMessageSignal());

		}
	}

	/** Password group control getter. */
	protected get passwordGroup(): AbstractControl {
		return this.registerForm.get('passwordGroup') as AbstractControl;
	}

}
