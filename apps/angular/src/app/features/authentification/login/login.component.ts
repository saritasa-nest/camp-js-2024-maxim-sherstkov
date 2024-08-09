import { ChangeDetectionStrategy, ChangeDetectorRef, Component, DestroyRef, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NonNullableFormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Login } from '@js-camp/core/models/login';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { BehaviorSubject, catchError, finalize } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { UserService } from '@js-camp/angular/core/services/user.service';
import { Router } from '@angular/router';
import { URL_PATHS } from '@js-camp/core/utils/url-paths';
import { FormErrorService } from '@js-camp/angular/core/services/form-error.service';
import { ApiError } from '@js-camp/core/models/api-error';

import { AuthComponent } from '../auth.component';

/** Login page component. */
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
		AuthComponent,
	],
})

export class LoginComponent {
	private readonly destroyRef = inject(DestroyRef);

	private readonly fb = inject(NonNullableFormBuilder);

	private readonly userService = inject(UserService);

	private readonly changeDetector = inject(ChangeDetectorRef);

	private readonly router = inject(Router);

	/** Form error service. */
	protected readonly formErrorService = inject(FormErrorService);

	/** Login form control group. */
	protected readonly loginForm = this.fb.group({
		email: ['', [Validators.required, Validators.email]],
		password: ['', [Validators.required, Validators.minLength(8)]],
	});

	/** Hide password flag. */
	protected readonly hidePassword = signal(true);

	/** Loading state. */
	protected readonly isLoading$ = new BehaviorSubject<boolean>(false);

	/** Logs user with the provided credentials. */
	public onSubmit(): void {
		if (this.loginForm.invalid) {
			return;
		}
		this.isLoading$.next(true);
		const credentials = new Login(this.loginForm.getRawValue());
		this.userService.login(credentials)
			.pipe(
				catchError((error: unknown) => {
					if (error instanceof ApiError) {
						this.formErrorService.showFormValidationErrors(this.loginForm, error);
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
	 *  */
	protected clickHidePassword(event: Event): void {
		this.hidePassword.set(!this.hidePassword());
		event.stopPropagation();
	}
}
