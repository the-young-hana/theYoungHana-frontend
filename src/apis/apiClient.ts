import axios, { AxiosInstance } from "axios";
import { getCookie } from "../utils/cookie";

const FCMTOKEN = getCookie("fcm");

class ApiClient {
  private static instance: ApiClient;
  private axiosInstance: AxiosInstance;

  constructor() {
    this.axiosInstance = this.createAxiosInstance();
  }

  // --------------------------------------user
  async postLogin(password: string) {
    const response = await this.axiosInstance.request<
      DataResponseType<LoginType>
    >({
      method: "post",
      url: "/member/login",
      data: { password, fcmToken: FCMTOKEN },
    });
    return response.data;
  }

  async theyounghanaLogin() {
    const response = await this.axiosInstance.request<
      DataResponseType<{ deptIdx: number }>
    >({
      method: "post",
      url: "/student/login",
    });
    return response;
  }

  // --------------------------------------student
  async getStudentCard() {
    const response = await this.axiosInstance.request<
      DataResponseType<StudentCardType>
    >({
      method: "get",
      url: "/students",
    });
    return response.data;
  }

  async getStudentQR() {
    const response = await this.axiosInstance.request<
      DataResponseType<{ qrImage: string }>
    >({
      method: "get",
      url: "/students/qr",
    });
    return response.data;
  }

  // --------------------------------------event
  async getEventList(eventListData: EventListReqType) {
    const response = await this.axiosInstance.request<
      DataResponseType<EventListType[]>
    >({
      method: "get",
      url: `/events?value=${eventListData.value}&isEnd=${eventListData.isEnd}&page=${eventListData.page}`,
    });
    return response.data;
  }

  async getEventDetail(eventIdx: number) {
    const response = await this.axiosInstance.request<
      DataResponseType<EventDetailType>
    >({
      method: "get",
      url: `/events/${eventIdx}`,
    });
    return response.data;
  }

  async deleteEvent(eventIdx: number) {
    const response = await this.axiosInstance.request<
      DataResponseType<unknown>
    >({
      method: "delete",
      url: `/events/${eventIdx}`,
    });
    return response.data;
  }

  async postEventJoin(eventIdx: number) {
    const response = await this.axiosInstance.request<
      DataResponseType<unknown>
    >({
      method: "post",
      url: `/events/${eventIdx}/join`,
    });
    return response.data;
  }

  async postEventPush(eventIdx: number) {
    const response = await this.axiosInstance.request<
      DataResponseType<unknown>
    >({
      method: "post",
      url: `/events/${eventIdx}/push`,
    });
    return response.data;
  }

  async getEventWinners(eventIdx: number) {
    const response = await this.axiosInstance.request<
      DataResponseType<WinnerListType[]>
    >({
      method: "get",
      url: `/events/${eventIdx}/winners`,
    });
    return response.data;
  }

  async putEvent(eventIdx: number, eventPutData: EventPostReqType) {
    const response = await this.axiosInstance.request<
      DataResponseType<EventPostResType>
    >({
      method: "put",
      url: `/events/${eventIdx}`,
      data: eventPutData,
    });
    return response.data;
  }
  // --------------------------------------story
  async getAccountInfo() {
    const response = await this.axiosInstance.request<
      DataResponseType<AccountInfoType>
    >({
      method: "get",
      url: `dept`,
    });
    return response.data;
  }

  async getTransactions(filter: TransactionsReqType) {
    const response = await this.axiosInstance.request<
      DataResponseType<TransactionsResType>
    >({
      method: "get",
      url: `transactions/${filter.deptIdx}?start=${filter.start}&end=${filter.end}&type=${filter.type}&sort=${filter.sort}&page=${filter.page}`,
    });
    return response.data;
  }

  async getStories(deptIdx: number, page: number) {
    const response = await this.axiosInstance.request<
      DataResponseType<StoriesResType[]>
    >({
      method: "get",
      url: `stories/${deptIdx}?page=${page}`,
    });
    return response.data;
  }

  async getStoryDetail(storyIdx: number) {
    const response = await this.axiosInstance.request<
      DataResponseType<StoryDetailResType>
    >({
      method: "get",
      url: `stories/${storyIdx}/detail`,
    });
    return response.data;
  }

  async editStory(storyIdx: number, updatedStory: UpdateStryReqType) {
    const response = await this.axiosInstance.request<BaseResponseType>({
      method: "put",
      url: `stories/${storyIdx}`,
      data: updatedStory,
    });
    return response.data;
  }

  async deleteStory(storyIdx: number) {
    const response = await this.axiosInstance.request<BaseResponseType>({
      method: "delete",
      url: `stories/${storyIdx}`,
    });
    return response.data;
  }

  async addLikeNum(storyIdx: number) {
    const response = await this.axiosInstance.request<
      DataResponseType<StoryDetailResType>
    >({
      method: "post",
      url: `stories/${storyIdx}/likes`,
    });
    return response.data;
  }

  async getStoryComments(storyIdx: number, lastCommentIdx: number) {
    const response = await this.axiosInstance.request<
      DataResponseType<StoryCommentResType[]>
    >({
      method: "get",
      url: `stories/${storyIdx}/comments?lastCommentIdx=${lastCommentIdx}`,
    });
    return response.data;
  }

  async addStoryComments(storyIdx: number, newComment: StoryCommentReqType) {
    const response = await this.axiosInstance.request<BaseResponseType>({
      method: "post",
      url: `stories/${storyIdx}/comments`,
      data: newComment,
    });
    return response.data;
  }

  async editStoryComments(
    storyIdx: number,
    commentIdx: number,
    newComment: StoryCommentReqType,
  ) {
    const response = await this.axiosInstance.request<BaseResponseType>({
      method: "put",
      url: `stories/${storyIdx}/comments/${commentIdx}`,
      data: newComment,
    });
    return response.data;
  }

  async deleteStoryComments(storyIdx: number, commentIdx: number) {
    const response = await this.axiosInstance.request<BaseResponseType>({
      method: "delete",
      url: `stories/${storyIdx}/comments/${commentIdx}`,
    });
    return response.data;
  }

  // --------------------------------------reward
  async getRewards() {
    const response = await this.axiosInstance.request<
      DataResponseType<RewardsType>
    >({
      method: "get",
      url: "/rewards",
    });
    return response.data;
  }

  async getRanking(page: number) {
    const response = await this.axiosInstance.request<
      DataResponseType<RankingType[]>
    >({
      method: "get",
      url: `/rewards/rank?page=${page}`,
    });
    return response.data;
  }

  async getPresent() {
    const response = await this.axiosInstance.request<
      DataResponseType<{ point: number }>
    >({
      method: "get",
      url: `/rewards/present`,
    });
    return response.data;
  }

  async getQuiz() {
    const response = await this.axiosInstance.request<
      DataResponseType<QuizType>
    >({
      method: "get",
      url: "/rewards/quiz",
    });
    return response.data;
  }

  async postQuizAnswer(quizData: QuizAnswerReqType) {
    const response = await this.axiosInstance.request<
      DataResponseType<QuizAnswerType>
    >({
      method: "post",
      url: "/rewards/quiz",
      data: quizData,
    });
    return response.data;
  }

  // --------------------------------------knowledge
  async getKnowledge(page: number) {
    const response = await this.axiosInstance.request<
      DataResponseType<KnowledgeType[]>
    >({
      method: "get",
      url: `/knowledges?lastKnowledgeIdx=${page}`,
    });
    return response.data;
  }

  async getKnowledgeDetail(knowledgeIdx: number) {
    const response = await this.axiosInstance.request<
      DataResponseType<KnowledgeDetailType>
    >({
      method: "get",
      url: `knowledges/${knowledgeIdx}`,
    });
    return response.data;
  }

  // --------------------------------------notification
  async notification() {
    const response = await this.axiosInstance.request<
      DataResponseType<notificationResType[]>
    >({
      method: "get",
      url: "/member/notice",
    });
    return response.data;
  }

  // --------------------------------------transfer
  async postTransfer(transferData: TransferReqType) {
    const response = await this.axiosInstance.request<
      DataResponseType<TransferResType>
    >({
      method: "post",
      url: "/transactions",
      data: transferData,
    });
    return response.data;
  }

  // --------------------------------------account
  async getAccounts() {
    const response = await this.axiosInstance.request<
      DataResponseType<AccountsType[]>
    >({
      method: "get",
      url: "/accounts",
    });
    return response.data;
  }

  async postAccountsPwd(accountPwdReqData: AccountsPwdType) {
    const response = await this.axiosInstance.request<
      DataResponseType<{ isPwCorrect: boolean }>
    >({
      method: "post",
      url: "/accounts",
      data: accountPwdReqData,
    });
    return response.data;
  }

  static getInstance(): ApiClient {
    return this.instance || (this.instance = new this());
  }

  logout() {
    this.axiosInstance = this.createAxiosInstance();
  }

  private createAxiosInstance = () => {
    const headers: any = {
      "content-type": "application/json",
    };

    const newInstance = axios.create({
      baseURL: import.meta.env.VITE_API_BASE_URL,
      withCredentials: true,
      timeout: 100000,
      headers,
    });

    newInstance.interceptors.request.use(
      (config) => {
        const TOKEN = getCookie("accessToken");
        if (TOKEN) {
          config.headers["Authorization"] = `Bearer ${TOKEN}`;
        }

        config.headers["Content-Type"] = "application/json";
        return config;
      },
      (error) => {
        console.log(error);
        return Promise.reject(error);
      },
    );

    return newInstance;
  };
}

export default ApiClient;
