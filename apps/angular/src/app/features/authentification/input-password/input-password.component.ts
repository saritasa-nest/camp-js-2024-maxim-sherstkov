import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatInputModule } from '@angular/material/input';

/** Input password component. */
@Component({
	selector: 'camp-input-password',
	standalone: true,
	templateUrl: './input-password.component.html',
	styleUrl: './input-password.component.css',
	changeDetection: ChangeDetectionStrategy.OnPush,
	imports: [CommonModule, MatInputModule],
})
export class InputPasswordComponent {

}
