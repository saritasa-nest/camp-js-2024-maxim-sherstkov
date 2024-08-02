import { SortDirection } from '@angular/material/sort';

/** Sorting order object. */
export type SortOrder = {

	/** Sorted field. */
	active: string;

	/** Sorting direction. */
	direction: SortDirection;
};
