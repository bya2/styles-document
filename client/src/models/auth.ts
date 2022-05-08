export interface I_auth__sign_in_ref {
  id: string;
  hashed: string;
}

export interface I_fb_ref__sds_auth_accounts {
  id: string;
  hashed: string;
  // check_password: string;
  email: string;
  bookmarks: string[];
}

export interface I_auth__sign_up_account {
  [key: string]: string;
  id: string;
  password: string;
  check_password: string;
  email: string;
}

export interface I_auth__sign_in_account {
  [key: string]: string;
  id: string;
  password: string;
}

export interface I_auth__validation {
  id: string;
  hashed: string;
}