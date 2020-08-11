export interface User {
  email: string;
  password?: string;
}

export interface UserAuth extends User {
  password: string;
}
