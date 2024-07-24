import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

/** Material progress spinner with basic styles. */
@Component({
	selector: 'camp-basic-progress-spinner',
	standalone: true,
	templateUrl: './basic-progress-spinner.component.html',
	styleUrl: './basic-progress-spinner.component.css',
	changeDetection: ChangeDetectionStrategy.OnPush,
	imports: [CommonModule, MatProgressSpinnerModule],
})
export class BasicProgressSpinnerComponent {
	/** Value for a top and bottom padding. */
	@Input() public padding = '0px';
}
