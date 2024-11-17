export type Status = 'active' | 'retired' | 'under construction'; // 'under_construction'

export type LandPad = {
	id: string;
	full_name: string;
	status: Status;
	location: Location;
	landing_type: string;
	attempted_landings: number;
	successful_landings: number;
	wikipedia: string;
	details: string;
};

type Location = {
	name: string;
	region: string;
	latitude: number;
	longitude: number;
};
