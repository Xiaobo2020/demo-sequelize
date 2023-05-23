// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { ValueOf } from "@/packages/common/type";
import { RESPONSE_CODE, RESPONSE_STATUS } from "@/packages/server/constant";
import { Organization } from "@/packages/server/model";
import { OrganizationAttributes, ResponseData } from "@/packages/server/types";
import type { NextApiRequest, NextApiResponse } from "next";

const ERROR_CODE = {
  INVALID_PARAM: 1,
  DUPLICATE_ORGANIZATION: 2,
  UNKNOWN: 3,
} as const;

type Data = ResponseData<OrganizationAttributes, ValueOf<typeof ERROR_CODE>>;

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  try {
    const { name } = JSON.parse(req.body) || {};
    if (typeof name !== "string" || !name) {
      return res.status(500).json({
        status: RESPONSE_STATUS.FAILURE,
        code: ERROR_CODE.INVALID_PARAM,
        error: "Invalid param",
      });
    }

    const [record, created] = await Organization.findOrCreate({
      where: {
        name,
      },
    });

    if (!created) {
      return res.status(500).json({
        status: RESPONSE_STATUS.FAILURE,
        code: ERROR_CODE.DUPLICATE_ORGANIZATION,
        error: "Invalid param",
      });
    }

    const result = record.toJSON();
    res.status(200).json({
      status: RESPONSE_STATUS.SUCCESS,
      code: RESPONSE_CODE.SUCCESS,
      data: result,
    });
  } catch (e) {
    res.status(500).json({
      status: RESPONSE_STATUS.FAILURE,
      code: ERROR_CODE.UNKNOWN,
      error: e instanceof Error ? JSON.stringify(e.message) : JSON.stringify(e),
    });
  }
}
