// user.response.ts
export interface User {
  _id: string;
  name: string;
  username: string;
  password: string;
  role: string;
  email: string;
  phone_number: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface UserResponse {
  status: string;
  message: string;
  data: Omit<User, 'password'>;
}

export interface UserDataResponse {
  status: string;
  message: string;
  data: {
    _id: string;
    name: string;
    username: string;
    role: string;
    email: string;
    phone_number: string;
    createdAt?: Date;
    updatedAt?: Date;
  };
}

export interface AuthResponse {
  data: UserResponse;
}

export interface UserData {
  _id: string;
  username: string;
  name: string;
  role: string;
}
