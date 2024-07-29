import { AnimeType } from './anime-type';
import { Immerable, OmitImmerable } from './immerable';

/** Anime params. */
export class AnimeParams extends Immerable {

	/** Default values for AnimeParams. */
	public static readonly defaultValues = {
		pageIndex: 0,
		pageSize: 15,
		searchValue: '',
		animeTotal: 0,
		sortOrder: '',
		filterByType: [],
	};

	/** Current page index. */
	public readonly pageIndex: number;

	/** Number of elements that can be on a page. */
	public readonly pageSize: number;

	/** Search input value. */
	public readonly searchValue: string;

	/** Sort order. */
	public readonly sortOrder: string;

	/** Filter values. */
	public readonly filterByType: AnimeType[];

	public constructor(data: Partial<AnimeParamsData> = {}) {
		super();
		this.pageIndex = data.pageIndex ?? AnimeParams.defaultValues.pageIndex;
		this.pageSize = data.pageSize ?? AnimeParams.defaultValues.pageSize;
		this.searchValue = data.searchValue ?? AnimeParams.defaultValues.searchValue;
		this.sortOrder = data.sortOrder ?? AnimeParams.defaultValues.sortOrder;
		this.filterByType = data.filterByType ?? AnimeParams.defaultValues.filterByType;
	}
}

type AnimeParamsData = OmitImmerable<AnimeParams>;
