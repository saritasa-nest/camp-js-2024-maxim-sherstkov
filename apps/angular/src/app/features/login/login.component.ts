import { ChangeDetectionStrategy, Component, inject, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '@js-camp/angular/core/services/auth.service';
import { Router } from '@angular/router';
import { Login } from '@js-camp/core/models/login';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { merge } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

/**
 * Login page component.
 */
@Component({
	selector: 'camp-login',
	standalone: true,
	templateUrl: './login.component.html',
	styleUrl: './login.component.css',
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
export class LoginComponent implements OnInit {
	// TODO mb change docs?
	/** Login form group. */
	protected loginForm: FormGroup;

	private readonly fb: FormBuilder = inject(FormBuilder);

	private readonly authService = inject(AuthService);

	private readonly router = inject(Router);

	// TODO check readonly for signal

	/** Hide password flag. */
	protected hidePassword = signal(true);

	/** Email error message. */
	protected emailErrorMessage = signal('');

	/** Password error message. */
	protected passwordErrorMessage = signal('');

	public constructor() {
		this.loginForm = this.fb.group({
			email: ['', [Validators.required, Validators.email]],
			password: ['', Validators.required],
		});
	}

	/** @inheritdoc */
	public ngOnInit(): void {
		this.loginForm.valueChanges.subscribe(val => {
			console.log(val);

		});
		merge(this.loginForm.valueChanges, this.loginForm.statusChanges)

			// TODO destroy
			// .pipe(takeUntilDestroyed())
			.subscribe(() => {
				this.updateEmailErrorMessage();
				this.updatePasswordErrorMessage();
			});
	}

	// /** Email getter. */
	// public get email(): AbstractControl | null {
	// 	return this.loginForm.get('email');
	// }

	// /** Password getter. */
	// protected get password(): AbstractControl | null {
	// 	return this.loginForm.get('password');
	// }

	/**
	 * Updates email error message.
	 */
	protected updateEmailErrorMessage(): void {
		console.log(this.loginForm.controls['email']);

		if (this.loginForm.controls['email'].hasError('required')) {
			this.emailErrorMessage.set('You must enter a value');
		} else if (this.loginForm.controls['email'].hasError('email')) {
			this.emailErrorMessage.set('Not a valid email');
		} else {
			this.emailErrorMessage.set('');
		}
	}

	/**
	 * Updates password error message.
	 */
	protected updatePasswordErrorMessage(): void {
		if (this.loginForm.controls['password'].hasError('required')) {
			this.passwordErrorMessage.set('You have to enter a password');
		} else {
			this.passwordErrorMessage.set('');
		}
	}

	/**
	 * Logs  user with the provided credentials.
	 */
	public onSubmit(): void {
		if (this.loginForm.invalid) {
			return;
		}
		const credentials = new Login(this.loginForm.value);
		this.authService.login(credentials)
			.subscribe(
				response => {
					console.log('User is logged in');
					console.log(response);

					// this.router.navigateByUrl('/');
				},
			);

	}

	/** Email control getter. */
	// protected get email() {
	//	return this.loginForm.get('email');
	// }

	/**
	 * Handles hide password button click.
	 *
	 * @param event The click event.
	 *  */
	protected clickHidePassword(event: Event): void {
		this.hidePassword.set(!this.hidePassword());
		event.stopPropagation();
	}
}
