// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { ValueOf } from "@/packages/common/type";
import { validNumber, validString } from "@/packages/common/util/validator";
import { RESPONSE_CODE, RESPONSE_STATUS } from "@/packages/server/constants";
import { Organization, Project } from "@/packages/server/models";
import { ProjectAttributes, ResponseData } from "@/packages/server/types";
import type { NextApiRequest, NextApiResponse } from "next";

const ERROR_CODE = {
  INVALID_PROJECT_NAME: 1,
  DUPLICATE_PROJECT: 2,
  INVALID_ORGANIZATION_PARAM: 3,
  NO_EXIST_ORGANIZATION: 4,
  UNKNOWN: 5,
} as const;

type Data = ResponseData<ProjectAttributes, ValueOf<typeof ERROR_CODE>>;

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  try {
    const { name, organizationId, organizationName } =
      JSON.parse(req.body) || {};

    // name无效
    if (!validString(name)) {
      return res.status(500).json({
        status: RESPONSE_STATUS.FAILURE,
        code: ERROR_CODE.INVALID_PROJECT_NAME,
        error: "Invalid params",
      });
    }

    // organizationId和organizationName都无效
    if (!validNumber(organizationId) && !validString(organizationName)) {
      return res.status(500).json({
        status: RESPONSE_STATUS.FAILURE,
        code: ERROR_CODE.INVALID_ORGANIZATION_PARAM,
        error: "Invalid params",
      });
    }

    // 若organizationId有效，则以organizationId为主要条件进行查询及创建
    if (validNumber(organizationId)) {
      const targetOrganization = await Organization.findByPk(organizationId);
      // 若organizationId不存在，则failure
      if (targetOrganization === null) {
        return res.status(500).json({
          status: RESPONSE_STATUS.FAILURE,
          code: ERROR_CODE.NO_EXIST_ORGANIZATION,
          error: "Invalid params",
        });
      }

      const [targetProject, targetProjectCreated] = await Project.findOrCreate({
        where: {
          name,
          organization_id: organizationId,
        },
      });
      // 若已经存在name和organizationId的project
      if (targetProjectCreated !== true) {
        return res.status(500).json({
          status: RESPONSE_STATUS.FAILURE,
          code: ERROR_CODE.DUPLICATE_PROJECT,
          error: "Invalid params",
        });
      }
      return res.status(200).json({
        status: RESPONSE_STATUS.SUCCESS,
        code: RESPONSE_CODE.SUCCESS,
        data: targetProject.toJSON(),
      });
    }

    // 剩余情况：organizationName有效
    const [targetOrganization, targetOrganizationCreated] =
      await Organization.findOrCreate({
        where: {
          name: organizationName,
        },
      });

    // 若已经存在organizationName的Organization
    if (targetOrganizationCreated !== true) {
      const [targetProject, targetProjectCreated] = await Project.findOrCreate({
        where: {
          name,
          organization_id: targetOrganization.getDataValue("id"),
        },
      });

      // 若已经存在name和organizationId的project
      if (targetProjectCreated !== true) {
        return res.status(500).json({
          status: RESPONSE_STATUS.FAILURE,
          code: ERROR_CODE.DUPLICATE_PROJECT,
          error: "Invalid params",
        });
      }
      return res.status(200).json({
        status: RESPONSE_STATUS.SUCCESS,
        code: RESPONSE_CODE.SUCCESS,
        data: targetProject.toJSON(),
      });
    }

    // 若此前不存在organizationName的Organization，同步创建organization和project
    const record = await Project.create(
      {
        name,
        // @ts-ignore
        organization: {
          name: organizationName,
        },
      },
      {
        include: [Project.Organization],
      }
    );

    return res.status(200).json({
      status: RESPONSE_STATUS.SUCCESS,
      code: RESPONSE_CODE.SUCCESS,
      data: record.toJSON(),
    });
  } catch (e) {
    res.status(500).json({
      status: RESPONSE_STATUS.FAILURE,
      code: ERROR_CODE.UNKNOWN,
      error: e instanceof Error ? JSON.stringify(e.message) : JSON.stringify(e),
    });
  }
}
