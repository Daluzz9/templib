export type IApiResponse<T> = {
  code: number;
  status: ResponseStatusEnum;
  data: T;
  message?: string;
  total?: number;
};

export type IApiResponseWithOptionalData<T> = Omit<IApiResponse<T>, "data"> & {
  data?: T;
};

export type IApiResponseWithoutData = Omit<IApiResponse<unknown>, "data">;

export enum ResponseStatusEnum {
  OK = "OK",
  VALIDATE_FAILED = "VALIDATE_FAILED",
}
