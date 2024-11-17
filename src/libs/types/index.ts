export type LandPad = {
	name: string;
	full_name: string;
	status: Status;
	type: string;
	locality: string;
	region: string;
	latitude: number;
	longitude: number;
	landing_attempts: number;
	landing_successes: number;
	wikipedia: string;
	details: string;
	launches: string[];
	id: string;
};

export type Status = 'under_construction' | 'active' | 'retired' | 'under construction';
