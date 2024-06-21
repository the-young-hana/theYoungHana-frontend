import { LoginReqType, LoginType } from "../../types/users";

export interface usersApi {
  postLogin(user: LoginReqType): Promise<LoginType>;
}
