import { ChangeDetectionStrategy, Component, DestroyRef, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '@js-camp/angular/core/services/auth.service';
import { Login } from '@js-camp/core/models/login';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { BehaviorSubject, take } from 'rxjs';
import { ErrorStateMatcher, ShowOnDirtyErrorStateMatcher } from '@angular/material/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

import { ConfirmValidParentMatcher, errorMessages } from '../../../core/utils/custom-validators';

/** Login page component. */
@Component({
	selector: 'camp-login',
	standalone: true,
	templateUrl: './login.component.html',
	styleUrl: './login.component.css',
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

export class LoginComponent {
	private readonly destroyRef = inject(DestroyRef);

	private readonly formBuilder: FormBuilder = inject(FormBuilder);

	private readonly authService = inject(AuthService);

	/** Material directive to determine the validity of `<mat-form-field>`. */
	protected readonly confirmValidParentMatcher = new ConfirmValidParentMatcher();

	/** Register form control group. */
	protected readonly loginForm: FormGroup = this.formBuilder.group({
		email: ['', [Validators.required, Validators.email]],
		password: ['', [Validators.required, Validators.minLength(8)]],
	});

	/** Error messages. */
	protected readonly errorMessages = errorMessages;

	/** Hide password flag. */
	protected readonly hidePassword$ = new BehaviorSubject<boolean>(true);

	/**
	 * Logs user with the provided credentials.
	 */
	public onSubmit(): void {
		if (this.loginForm.invalid) {
			return;
		}
		const credentials = new Login({ ...this.loginForm.value });
		this.authService.login(credentials)
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
