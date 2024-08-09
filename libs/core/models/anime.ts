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
	public readonly englishTitle: string;

	/** Japanese title. */
	public readonly japaneseTitle: string;

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
		this.englishTitle = data.englishTitle;
		this.japaneseTitle = data.japaneseTitle;
		this.airedStart = data.airedStart;
		this.type = data.type;
		this.status = data.status;
	}
}

type AnimeConstructorData = OmitImmerable<Anime>;

/** Anime enum without `id`. */
export enum AnimeFieldEnum {
	ImageSource = 'imageSource',
	EnglishTitle = 'title_eng',
	JapaneseTitle = 'title_jpn',
	AiredStart = 'aired__startswith',
	Type = 'type',
	Status = 'status',
}
