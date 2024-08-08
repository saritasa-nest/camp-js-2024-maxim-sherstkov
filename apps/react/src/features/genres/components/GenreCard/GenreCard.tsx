import { memo, FC } from 'react';
import { Genre } from '@js-camp/core/models/genre';

import styles from './GenreCard.module.css';

type Props = {

	/** Genre. */
	readonly genre: Genre;
};

/**
 * Card with genre data.
 * @param genre Genre.
 * */
const GenreCardComponent: FC<Props> = ({ genre }: {genre: Genre;}) => (
	<div className={styles.card}>
		<h2>{genre.name}</h2>
		<span>Id - {genre.id}</span>
	</div>
);

/** Memoized GenreCard component. */
export const GenreCard = memo(GenreCardComponent);
