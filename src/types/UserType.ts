export interface UserType {
	id: string;
	first_name: string;
	last_name: string;
	email: string;
	role: 'Customer' | 'Administrator';
	isActive: boolean;
	profile_photo?: string;
	registrationDate?: string;
};