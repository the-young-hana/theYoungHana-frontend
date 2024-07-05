export interface eventApi {
  getEventList(
    eventListData: EventListReqType,
  ): Promise<DataResponseType<EventListType[]>>;
  getEventDetail(eventIdx: number): Promise<DataResponseType<EventDetailType>>;
  deleteEvent(eventIdx: number): Promise<DataResponseType<unknown>>;
  postEventJoin(eventIdx: number): Promise<DataResponseType<unknown>>;
  postEventPush(eventIdx: number): Promise<DataResponseType<unknown>>;
}
