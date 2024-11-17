export const successRate = (attempts: number, success: number): string => {
	if (typeof attempts !== 'number' || typeof success !== 'number' || attempts < 0) {
		return 'N/A';
	}

	const rate = (success / attempts) * 100;

	console.log({ rate: rate.toFixed(2) });

	return rate.toFixed(0);
};
