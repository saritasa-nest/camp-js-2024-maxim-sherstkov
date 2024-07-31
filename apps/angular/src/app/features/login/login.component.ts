import { ChangeDetectionStrategy, Component, inject, OnDestroy, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AbstractControl, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '@js-camp/angular/core/services/auth.service';
import { Router } from '@angular/router';
import { Login } from '@js-camp/core/models/login';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { Subject, takeUntil } from 'rxjs';
import { ErrorStateMatcher, ShowOnDirtyErrorStateMatcher } from '@angular/material/core';

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
export class LoginComponent implements OnInit, OnDestroy {

	private destroy$ = new Subject<void>();

	private readonly formBuilder: FormBuilder = inject(FormBuilder);

	private readonly authService = inject(AuthService);

	private readonly router = inject(Router);

	/** Login form control group. */
	protected readonly loginForm: FormGroup = this.formBuilder.group({
		email: ['', [Validators.required, Validators.email]],
		password: ['', Validators.required],
	});

	/** Hide password flag. */
	protected readonly hidePassword = signal(true);

	/** Email error message. */
	protected readonly emailErrorMessage = signal('');

	private readonly validationMessages: { [key: string]: string; } = {
		required: 'Please fill the required field.',
		email: 'Please enter a valid email address.',
	};

	/** @inheritdoc */
	public ngOnInit(): void {
		const emailControl = this.loginForm.get('email') as AbstractControl;
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
	 * Logs  user with the provided credentials.
	 */
	public onSubmit(): void {
		if (this.loginForm.invalid) {
			return;
		}
		const credentials = new Login(this.loginForm.value);
		this.authService.login(credentials)
			.pipe(takeUntil(this.destroy$))
			.subscribe(
				response => {
					console.log('User is logged in');
					console.log(response);

					// this.router.navigateByUrl('/');
				},
			);

	}

	/** Password control getter. */
	protected get password(): AbstractControl {
		return this.loginForm.get('password') as AbstractControl;
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
}
