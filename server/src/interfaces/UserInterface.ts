export interface User {
  email: string;
  password?: string;
}

export interface UserCreate extends User {
  password: string;
}
