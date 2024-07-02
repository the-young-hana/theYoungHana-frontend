export interface eventApi {
  getEventList(
    eventReqData: EventListReqType,
  ): Promise<DataResponseType<EventListType[]>>;
}
