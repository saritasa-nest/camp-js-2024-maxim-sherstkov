import { Sort } from '@angular/material/sort';

import { AnimeType } from './anime-type';
import { Immerable, OmitImmerable } from './immerable';

/** Anime query params. */
export class AnimeQuery extends Immerable {

	/** Default values for AnimeParams. */
	// eslint-disable-next-line @typescript-eslint/naming-convention
	public static readonly DEFAULT_VALUES = {
		pageIndex: 0,
		pageSize: 15,
		searchValue: '',
		animeTotal: 0,
		sort: {
			active: '',
			direction: '',
		} as Sort,
		filterByType: [],
	};

	/** Current page index. */
	public readonly pageIndex: number;

	/** Number of elements that can be on a page. */
	public readonly pageSize: number;

	/** Search input value. */
	public readonly searchValue: string;

	/** Sort order. */
	public readonly sort: Sort;

	/** Filter values. */
	public readonly filterByType: readonly AnimeType[];

	public constructor(data: Partial<AnimeParamsData> = AnimeQuery.DEFAULT_VALUES) {
		super();
		this.pageIndex = data.pageIndex ?? AnimeQuery.DEFAULT_VALUES.pageIndex;
		this.pageSize = data.pageSize ?? AnimeQuery.DEFAULT_VALUES.pageSize;
		this.searchValue = data.searchValue ?? AnimeQuery.DEFAULT_VALUES.searchValue;
		this.sort = data.sort ?? AnimeQuery.DEFAULT_VALUES.sort;
		this.filterByType = data.filterByType ?? AnimeQuery.DEFAULT_VALUES.filterByType;
	}
}

type AnimeParamsData = OmitImmerable<AnimeQuery>;
