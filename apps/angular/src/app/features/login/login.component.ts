import { ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '@js-camp/angular/core/services/auth.service';
import { Router } from '@angular/router';
import { Login } from '@js-camp/core/models/login';

/**
 * Login page component.
 */
@Component({
	selector: 'camp-login',
	standalone: true,
	templateUrl: './login.component.html',
	styleUrl: './login.component.css',
	changeDetection: ChangeDetectionStrategy.OnPush,
	imports: [CommonModule, ReactiveFormsModule],
})
export class LoginComponent {
	// TODO mb change docs?
	/** Login form. */
	protected readonly loginForm: FormGroup;

	private readonly fb: FormBuilder = inject(FormBuilder);

	private readonly authService = inject(AuthService);

	private readonly router = inject(Router);

	public constructor() {
		this.loginForm = this.fb.group({
			email: ['', Validators.required],
			password: ['', Validators.required],
		});
	}

	/**
	 * Logs  user with the provided credentials.
	 */
	public onSubmit(): void {
		const val = this.loginForm.value;

		if (val.email && val.password) {
			const foo = new Login({ email: val.email, password: val.password });
			this.authService.login(foo)
				.subscribe(
					() => {
						console.log('User is logged in');
						this.router.navigateByUrl('/');
					},
				);
		}
	}
}
