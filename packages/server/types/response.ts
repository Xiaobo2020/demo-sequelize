import { RESPONSE_CODE, RESPONSE_STATUS } from "../constant";

export type ResponseDataFailure<C = typeof RESPONSE_CODE.FAILURE> = {
  status: typeof RESPONSE_STATUS.FAILURE;
  code: C;
  error: string;
};

export type ResponseDataSuccess<D> = {
  status: typeof RESPONSE_STATUS.SUCCESS;
  code: typeof RESPONSE_CODE.SUCCESS;
  data: D;
};

export type ResponseData<D, C = typeof RESPONSE_CODE.FAILURE> =
  | ResponseDataSuccess<D>
  | ResponseDataFailure<C>;
