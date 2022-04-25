export interface I_sign_in_keys { 
  sign_in_item__id: string;
  sign_in_item__password: string;
}

export interface I_sign_up_keys {
  sign_up_item__id: string;
  sign_up_item__password: string;
  sign_up_item__check_password?: string;
  sign_up_item__email: string;
}

export interface I_sign_in_params {
  [key: string]: string;
  id: string;
  password: string;
}

export interface I_sign_up_body {
  [key: string]: string;
  id: string;
  password: string;
  email: string;
}

export type T_SVG = React.FunctionComponent<React.SVGAttributes<SVGElement>>;