export interface Profile {
  id: string;
  name: string;
  email: string;
  phone?: string;
  document?: string;
  company?: string;
  role?: string;
}

export interface ProfileUpdateRequest {
  name: string;
  phone?: string;
  document?: string;
  company?: string;
}
