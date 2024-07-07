export interface userApi {
  postLogin(password: string): Promise<DataResponseType<LoginType>>;
}
