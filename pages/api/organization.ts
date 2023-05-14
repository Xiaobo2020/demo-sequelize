// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { RESPONSE_CODE, RESPONSE_STATUS } from "@/packages/server/constant";
import { Organization } from "@/packages/server/model";
import { ResponseData, OrganizationAttributes } from "@/packages/server/type";
import type { NextApiRequest, NextApiResponse } from "next";

type Data = ResponseData<OrganizationAttributes[]>;

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  try {
    const records = await Organization.findAll({
      include: ["projects"],
    });
    const results = records.map((r) => r.toJSON());

    res.status(200).json({
      status: RESPONSE_STATUS.SUCCESS,
      code: RESPONSE_CODE.SUCCESS,
      data: results,
    });
  } catch (e) {
    res.status(500).json({
      status: RESPONSE_STATUS.FAILURE,
      code: RESPONSE_CODE.FAILURE,
      error: e instanceof Error ? JSON.stringify(e.message) : JSON.stringify(e),
    });
  }
}
