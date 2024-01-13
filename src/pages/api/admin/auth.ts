import type { NextApiRequest, NextApiResponse } from "next";
import jwt from "jsonwebtoken";
import { createToken } from "server/helpers/auth";

type Data =
  | {
      jwt: string;
    }
  | {
      error: string;
    };

const secret = process.env.SECRET || "";

export default async function (
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const { method } = req;
  let error = "Method not allowed";

  switch (method) {
    case "POST": {
      // const { userId } = req.body;
      // const jwt = await createToken(userId);
      // if (jwt) {
      //   return res.status(201).json({ jwt });
      // }
      return res.status(401).json({ error: String(error) });
    }

    default:
      return res.status(405).json({
        error: String(error),
      });
  }
}
