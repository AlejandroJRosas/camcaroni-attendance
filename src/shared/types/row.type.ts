export type SheetRow = {
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

export type Participation = boolean | undefined;
