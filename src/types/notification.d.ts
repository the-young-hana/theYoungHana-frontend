interface notificationResType {
  noticeCreatedAt: string;
  notices: {
    noticeIdx: number;
    noticeTitle: string;
    noticeContent: string;
    noticeCategory: NoticeCategory;
  }[];
}
