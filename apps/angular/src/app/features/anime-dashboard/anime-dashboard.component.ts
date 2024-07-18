import { CommonModule } from '@angular/common';
import { Component, ChangeDetectionStrategy } from '@angular/core';

import { AnimeTableComponent } from './components/anime-table/anime-table.component';

/** Anime list dashboard component. */
@Component({
	selector: 'camp-anime-dashboard',
	templateUrl: './anime-dashboard.component.html',
	styleUrls: ['./anime-dashboard.component.css'],
	standalone: true,
	imports: [CommonModule, AnimeTableComponent],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AnimeDashboardComponent {

	public constructor() {}
}
