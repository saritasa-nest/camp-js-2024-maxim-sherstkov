import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserService } from '@js-camp/angular/core/services/user.service';
import { take } from 'rxjs';
import { Router, RouterModule } from '@angular/router';
import { URL_PATHS } from '@js-camp/core/utils/url-paths';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';

/** The header component. */
@Component({
	selector: 'camp-the-header',
	templateUrl: './the-header.component.html',
	styleUrl: './the-header.component.css',
	standalone: true,
	changeDetection: ChangeDetectionStrategy.OnPush,
	imports: [CommonModule, RouterModule, MatToolbarModule, MatButtonModule],
})
export class TheHeaderComponent {
	private readonly userService = inject(UserService);

	private readonly router = inject(Router);

	/** URL paths. */
	protected readonly urls = URL_PATHS;

	/** User login status. */
	protected readonly isUserLoggedIn$ = this.userService.isUserLoggedIn$;

	/** Logs the user out. */
	protected handleLogoutClick(): void {
		this.userService.logout().pipe(take(1))
			.subscribe();
		this.router.navigate([this.urls.home]);
	}
}
