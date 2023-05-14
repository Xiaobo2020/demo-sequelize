// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import sequelize from "@/packages/server/sequelize";
import type { NextApiRequest, NextApiResponse } from "next";

type Data = {
  msg: string;
  error?: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  try {
    await sequelize.authenticate();
    res
      .status(200)
      .json({ msg: "Connection has been established successfully." });
  } catch (e) {
    res.status(500).json({
      msg: "Unable to connect to the database",
      error: JSON.stringify(e),
    });
  }
}
