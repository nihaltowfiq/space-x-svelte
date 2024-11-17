export const successRate = (attempts: number, success: number): string => {
	if (typeof attempts !== 'number' || typeof success !== 'number' || attempts < 0) {
		return 'N/A';
	}

	if (attempts === 0 && success === 0) {
		return '0';
	}

	const rate = (success / attempts) * 100;

	return rate.toFixed(0);
};
