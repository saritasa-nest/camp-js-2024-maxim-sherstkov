import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { URL_PATHS } from '@js-camp/core/utils/url-paths';

/** Auth component for styles. */
@Component({
	selector: 'camp-auth',
	standalone: true,
	templateUrl: './auth.component.html',
	styleUrl: './auth.component.css',
	changeDetection: ChangeDetectionStrategy.OnPush,
	imports: [CommonModule, RouterModule, MatCardModule],
})
export class AuthComponent {
	private readonly router = inject(Router);

	/** Page title. */
	protected readonly pageTitle = this.getPageTitle();

	private getPageTitle(): string {
		if (this.router.url.endsWith(URL_PATHS.register)) {
			return 'Register';
		} else if (this.router.url.endsWith(URL_PATHS.login)) {
			return 'Login';
		}
		return 'Page';
	}
}
