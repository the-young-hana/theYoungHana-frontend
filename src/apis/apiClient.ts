import axios, { AxiosInstance } from "axios";
import { getCookie } from "../utils/cookie";
import { usersApi } from "./interfaces/usersApi";
import { studentCardApi } from "./interfaces/studentCardApi";
import { knowledgeApi } from "./interfaces/knowledgeApi";
import { rewardApi } from "./interfaces/rewardApi";
import storiesApi from "./interfaces/storiesApi";
import { eventApi } from "./interfaces/eventApi";

const FCMTOKEN = getCookie("fcm");

class ApiClient
  implements
    usersApi,
    studentCardApi,
    knowledgeApi,
    rewardApi,
    storiesApi,
    eventApi
{
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

  // --------------------------------------notice

  // --------------------------------------story
  async getAccountInfo(deptIdx: number) {
    const response = await this.axiosInstance.request<
      DataResponseType<AccountInfoType>
    >({
      method: "get",
      url: `dept/${deptIdx}`,
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

  async addLikeNum(storyIdx: number) {
    const response = await this.axiosInstance.request<
      DataResponseType<StoryDetailResType>
    >({
      method: "post",
      url: `stories/${storyIdx}/likes`,
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
  async getKnowledge() {
    const response = await this.axiosInstance.request<
      DataResponseType<KnowledgeType[]>
    >({
      method: "get",
      url: "/knowledges",
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

  static getInstance(): ApiClient {
    return this.instance || (this.instance = new this());
  }

  // registerToken(newToken: string) {
  //   this.axiosInstance = this.createAxiosInstance(newToken);
  // }

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
