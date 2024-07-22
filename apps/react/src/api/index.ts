import axios from 'axios';

import { CONFIG } from './config';

/** HTTP Axios client for requests. */
export const http = axios.create({
	baseURL: CONFIG.apiUrl,
});
