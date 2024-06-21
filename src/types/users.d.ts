export type LoginType = {
  success?: boolean;
  name?: string;
  phoneNumber?: string;
  step?: number;
  stepStatus?: null | number;
  token?: string;
  type?: string;
  message?: string;
};
export type LoginReqType = {
  phoneNumber: string;
  password: string;
};
