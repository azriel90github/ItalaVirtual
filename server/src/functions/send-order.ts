
interface CreateGoalRequest {
	name: string;
	number: number;
	location: string;
}

export function sendOrder(request: CreateGoalRequest) {}

