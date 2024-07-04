export interface eventApi {
  getEventList(
    eventListData: EventListReqType,
  ): Promise<DataResponseType<EventListType[]>>;
  getEventDetail(eventIdx: number): Promise<DataResponseType<EventDetailType>>;
  deleteEvent(eventIdx: number): Promise<DataResponseType<unknown>>;
}
