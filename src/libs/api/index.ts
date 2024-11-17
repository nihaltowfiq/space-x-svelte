import type { LandPad } from '@libs/types';
import { apiClient } from '@services/api-client';

export const getLandPads = () => {
	return apiClient<LandPad[]>({
		method: 'GET',
		url: '/v4/landpads'
	});
};
