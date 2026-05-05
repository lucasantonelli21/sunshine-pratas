export interface LoginRequest {
  email: string;
  password: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  role?: string;
}

export interface AuthSession {
  accessToken: string;
  refreshToken?: string;
  user: User;
}

export interface LoginResponse {
  token: string;
  type: 'Bearer' | string;
  userId: string;
  name: string;
  email: string;
  role: string;
}
