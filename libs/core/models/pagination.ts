
import { Immerable, OmitImmerable } from './immerable';

/** Pagination. */
export class Pagination<T> extends Immerable {

	/** Count. */
	public readonly count: number;

	/** Next request link. */
	public readonly next: string | null;

	/** Previous request link. */
	public readonly previous: string | null;

	/** Results array of request. */
	public readonly results: readonly T[];

	public constructor(data: PaginationConstructorData<T>) {
		super();
		this.count = data.count;
		this.next = data.next;
		this.previous = data.previous;
		this.results = data.results;
	}
}

type PaginationConstructorData<T> = OmitImmerable<Pagination<T>>;
