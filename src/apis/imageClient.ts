import axios, { AxiosInstance } from "axios";
import { getCookie } from "../utils/cookie";

export class ImageClient {
  private static instance: ImageClient;
  private axiosInstance: AxiosInstance;

  constructor() {
    this.axiosInstance = this.createAxiosInstance();
  }

  static getInstance(): ImageClient {
    return this.instance || (this.instance = new this());
  }

  async postEvent(eventPostData: FormData) {
    const response = await this.axiosInstance.request<
      DataResponseType<EventPostResType>
    >({
      method: "post",
      url: "/events",
      data: eventPostData,
    });
    return response.data;
  }


  // registerToken(newToken: string) {
  //   this.axiosInstance = this.createAxiosInstance(newToken);
  // }

  logout() {
    this.axiosInstance = this.createAxiosInstance();
  }

  private createAxiosInstance = () => {
    const headers: any = {
      "content-type": "multipart/form-data",
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

        config.headers["Content-Type"] = "multipart/form-data";
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
