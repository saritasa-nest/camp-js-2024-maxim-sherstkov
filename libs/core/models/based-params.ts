import { Immerable, OmitImmerable } from './immerable';

/** Anime params. */
export class AnimeParams extends Immerable {

	/** Default values for AnimeParams. */
	public static readonly defaultValues = {
		pageIndex: 0,
		pageSize: 15,
		searchValue: '',
		animeTotal: 0
	};

	/** Current page index. */
	public readonly pageIndex: number;

	/** Number of elements that can be on a page. */
	public readonly pageSize: number;

	/** Search input value. */
	public readonly searchValue: string;

	public constructor(data: Partial<AnimeParamsData> = {}) {
		super();
		this.pageIndex = data.pageIndex ?? AnimeParams.defaultValues.pageIndex;
		this.pageSize = data.pageSize ?? AnimeParams.defaultValues.pageSize;
		this.searchValue = data.searchValue ?? AnimeParams.defaultValues.searchValue;
	}
}

type AnimeParamsData = OmitImmerable<AnimeParams>;
