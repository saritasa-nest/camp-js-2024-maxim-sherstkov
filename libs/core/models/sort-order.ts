import { SortDirection } from '@angular/material/sort';

/** Parameters for sorting data. */
export type SortParameters = {

	/**
	 * Sorting field by which data is to be sorted (like 'name' or 'date').
	 */
	active: string;

	/**
	 * Sorting direction (ascending, descending or no order).
	 */
	direction: SortDirection;
};
