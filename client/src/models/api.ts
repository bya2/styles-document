export interface I_api_result<T = any> {
  code?: number;
  ok: boolean;
  message?: string;
  data?: T;
}
