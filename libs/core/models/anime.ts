import { AnimeType } from './anime-type';
import { AnimeStatus } from './anime-status';

import { Immerable, OmitImmerable } from './immerable';

/** Anime. */
export class Anime extends Immerable {

	/** Id. */
	public readonly id: number;

	/** Image source. */
	public readonly imageSrc: string | null;

	/** English title. */
	public readonly titleEnglish: string;

	/** Japanese title. */
	public readonly titleJapanese: string;

	/** Aired start. */
	public readonly airedStart: Date | null;

	/** Type. */
	public readonly type: AnimeType;

	/** Status. */
	public readonly status: AnimeStatus;

	public constructor(data: AnimeConstructorData) {
		super();
		this.id = data.id;
		this.imageSrc = data.imageSrc;
		this.titleEnglish = data.titleEnglish;
		this.titleJapanese = data.titleJapanese;
		this.airedStart = data.airedStart;
		this.type = data.type;
		this.status = data.status;
	}
}

type AnimeConstructorData = OmitImmerable<Anime>;
