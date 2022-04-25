export interface I_sign_in_account {
  id: string;
  password: string;
}

export interface I_sign_up_account {
  id: string;
  password: string;
  check_password: string;
  email: string;
}

export interface I_account {
  id: string;
  password: string;
  hashed: string;
  email: string;
}

export interface I_user {
  id: string;
  hashed: string;
}