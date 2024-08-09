import { HttpParams } from '@angular/common/http';
import { Params } from '@angular/router';

/**
 * Creates an instance of HttpParams of the given object.
 * @param params Params object.
 */
export function toHttpParams<T extends Params>(params: T): HttpParams {
	return new HttpParams({ fromObject: params });
}
