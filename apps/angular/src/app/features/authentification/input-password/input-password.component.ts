import { ChangeDetectionStrategy, Component, inject, Input, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatInputModule } from '@angular/material/input';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { FormErrorService } from '@js-camp/angular/core/services/form-error.service';
import { ConfirmValidParentMatcher } from '@js-camp/angular/core/utils/custom-validators';

/** Input password component. */
@Component({
	selector: 'camp-input-password',
	standalone: true,
	templateUrl: './input-password.component.html',
	styleUrl: './input-password.component.css',
	changeDetection: ChangeDetectionStrategy.OnPush,
	imports: [CommonModule, MatInputModule, ReactiveFormsModule, MatIconModule],
})
export class InputPasswordComponent {
	/** Password control. */
	@Input()
	public passwordControl = new FormControl();

	/** Form error service. */
	protected readonly formErrorService = inject(FormErrorService);

	protected readonly confirmValidParentMatcher = new ConfirmValidParentMatcher();

	/** Hide password flag. */
	protected readonly hidePassword = signal(true);

	/**
	 * Handles hide password button click.
	 * @param event The click event.
	 */
	protected clickHidePassword(event: Event): void {
		this.hidePassword.set(!this.hidePassword());
		event.stopPropagation();
	}
}
