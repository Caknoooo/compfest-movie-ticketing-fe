export const role = ['User', 'Admin'];

export type LoginForm = {
  email: string;
  password: string;
};

export type LoginResponse = {
  token: string;
  role: (typeof role)[number];
};

export type SignupForm = {
  nama: string;
  no_telp: string;
  email: string;
  password: string;
  tanggal_lahir: Date;
};

export type PostSignupForm = {
  nama: string;
  no_telp: string;
  email: string;
  password: string;
  tanggal_lahir: string;
};

export type SignupResponse = {
  id: string;
  nama: string;
  no_telp: string;
  email: string;
  password: string;
  role: string;
  created_at: string;
  updated_at: string;
};

export type GetMeResponse = {
  id: string;
  nama: string;
  no_telp: string;
  email: string;
  password: string;
  age: number;
  role: (typeof role)[number];
  saldo: number;
  created_at: string;
  updated_at: string;
};

export type User = {
  id: string;
  nama: string;
  no_telp: string;
  email: string;
  age: number;
  role: (typeof role)[number];
  saldo: number;
  token: string;
};
