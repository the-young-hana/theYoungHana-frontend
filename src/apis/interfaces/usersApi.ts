export interface usersApi {
  postLogin(password: string): Promise<DataResponseType<LoginType>>;
}
