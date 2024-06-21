import axios, { AxiosInstance } from "axios";
import { API_BASE_URL } from "./url";
import { getCookie } from "../utils/cookie";
import { usersApi } from "./interfaces/usersApi";
import { LoginReqType, LoginType } from "../types/users";

export class ApiClient implements usersApi {
  private static instance: ApiClient;
  private axiosInstance: AxiosInstance;

  constructor() {
    this.axiosInstance = this.createAxiosInstance();
  }

  async postLogin(user: LoginReqType) {
    const response = await this.axiosInstance.request<LoginType>({
      method: "post",
      url: "/users/login",
      data: user,
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
      baseURL: API_BASE_URL,
      timeout: 100000,
      headers,
    });

    newInstance.interceptors.request.use(
      (config) => {
        const TOKEN = getCookie("token");
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
