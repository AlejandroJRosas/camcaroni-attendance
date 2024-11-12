export type SheetRow = {
	rowNumber: number;
	registeredAt: string;
	name: string;
	telephoneNumber: string;
	job: string;
	area: string;
	interests: string;
	email: string;
	raffleCode: string;
	participation: [Participation, Participation, Participation];
};

export type Participation = boolean | string | undefined;
