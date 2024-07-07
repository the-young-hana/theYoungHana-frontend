export interface notificationApi {
  notification(): Promise<DataResponseType<notificationResType[]>>;
}

export default notificationApi;
