import { AxiosHeaders } from 'axios';

export type ApiResponse<T> = {
  config: object;
  data: T;
  header: AxiosHeaders;
};

export type ApiError = {
  message: string;
};

export type UninterceptedApiError = {
  message: string | Record<string, string[]>;
};

export interface PaginatedApiResponse<T> {
  code: number;
  status: string;
  data: T;
  meta: {
    last_page: number;
    total: number;
  };
}

export type ApiReturn<T> = {
  status: boolean;
  message: string;
  error: string;
  data: T;
};
