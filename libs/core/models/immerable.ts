import { immerable } from 'immer';

/**
 * Abstract class that makes other classes compatible with Immer.
 * @see Immer classes {@link https://immerjs.github.io/immer/complex-objects}.
 */
export abstract class Immerable {
	/** @inheritdoc */
	private readonly [immerable] = true;
}

/** Removes [immerable] property from the given type T. */
export type OmitImmerable<T> = Omit<T, '[immerable]'>;
