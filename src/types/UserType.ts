export interface UserType {
  id: string;
  name: string;
  email: string;
  role: 'Customer' | 'Administrator';
  status: 'Active' | 'Deleted';
  avatar: string;
  registered: string;
};