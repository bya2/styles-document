export interface IItem {
  key: string;
  name?: string;
  content: string;
  icon?: string;
}

export interface INestedItem extends IItem {
  items__arr: IItem[];
  api: (obj: any) => Promise<any>;
}

// Custom

export interface ISignInKeys { 
  sign_in_item__id: string;
  sign_in_item__password: string;
}

export interface ISignUpKeys {
  sign_up_item__id: string;
  sign_up_item__password: string;
  sign_up_item__check_password?: string;
  sign_up_item__email: string;
}

// export type Items = Item[];


export interface ISignInParams {
  [key: string]: string;
  id: string;
  password: string;
}

export interface ISignUpBody {
  [key: string]: string;
  id: string;
  password: string;
  email: string;
}