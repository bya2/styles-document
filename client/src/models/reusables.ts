export interface obj<T = any> {
  [key: string]: T;
}

export interface map<T> {
  [key: string]: T;
}

export interface cond {
  [key: string]: boolean;
};

export interface item extends obj{
  id: string;
  name?: string;
  content?: string;
  icon?: string;
  Icon?: any;
  items?: item[];
  api?: (obj?: any) => Promise<any>;
}