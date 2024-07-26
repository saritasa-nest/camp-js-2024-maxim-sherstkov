import { Immerable, OmitImmerable } from './immerable';

/** Anime params. */
export class AnimeParams extends Immerable {

	/** Current page index. */
	public readonly page: number;

	/** Number of elements that can be on a page. */
	public readonly limit: number;

	/** Search input value. */
	public readonly searchValue: string;

	public constructor(data: AnimeParamsData) {
		super();
		this.page = data.page;
		this.limit = data.limit;
		this.searchValue = data.searchValue;
	}
}

type AnimeParamsData = OmitImmerable<AnimeParams>;
