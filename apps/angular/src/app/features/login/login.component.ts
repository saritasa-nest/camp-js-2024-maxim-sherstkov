import { ChangeDetectionStrategy, Component, inject, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '@js-camp/angular/core/services/auth.service';
import { Router } from '@angular/router';
import { Login } from '@js-camp/core/models/login';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { merge } from 'rxjs';

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
export class LoginComponent {
	// TODO mb change docs?
	/** Login form group. */
	protected loginForm: FormGroup;

	/** Hide password flag. */
	protected hidePassword = signal(true);

	private readonly fb: FormBuilder = inject(FormBuilder);

	private readonly authService = inject(AuthService);

	private readonly router = inject(Router);

	public constructor() {
		this.loginForm = this.fb.group({
			email: ['', Validators.required],
			password: ['', Validators.required],
		});

		merge(this.email.statusChanges, this.email.valueChanges)
			.pipe(takeUntilDestroyed())
			.subscribe(() => this.updateEmailErrorMessage());

	  	merge(this.password.statusChanges, this.password.valueChanges)
			.pipe(takeUntilDestroyed())
			.subscribe(() => this.updatePasswordErrorMessage());
	}

	/** Email getter. */
	protected get email() {
		return this.loginForm.get('email');
	}

	/** Password getter. */
	protected get password() {
		return this.loginForm.get('password');
	}

	/**
	 * Logs  user with the provided credentials.
	 */
	public onSubmit(): void {
		const val = this.loginForm.value;

		if (this.loginForm.valid) {
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
function takeUntilDestroyed(): any {
	throw new Error('Function not implemented.');
}
