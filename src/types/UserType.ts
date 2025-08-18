export interface UserType {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  role: 'Customer' | 'Administrator';
  status: 'Active' | 'Deleted';
  profile_photo?: string | null;
  registered?: string;
};