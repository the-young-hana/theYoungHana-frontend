interface BaseResponseType {
  code: string;
  error?: string;
  message?: string;
  status: number;
  success: boolean;
  timestamp: string;
}

interface DataResponseType<T> extends Required<BaseResponseType> {
  data?: T;
}
