import { NextApiRequest, NextApiResponse } from "next";
import { verifyToken } from "server/helpers/auth";
import { setLotBuyer, updateLotInfo } from "server/helpers/lots";

type Data =
  | {
      error: string;
    }
  | { message: string };

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const { method, cookies, body, query } = req;

  try {
    const user = await verifyToken(cookies.auth || "");

    if (!user)
      return res.status(404).json({
        error: "Invalid user",
      });
  } catch (error) {
    console.log({ error });
    return res.status(500).json({ error: "Server Error" });
  }

  switch (method) {
    case "PUT": {
      const { id } = query;
      const { client, price } = body;

      const lotWBuyer = await setLotBuyer(id as string, client, price);
      console.log({ lotWBuyer });
      if (!lotWBuyer)
        return res
          .status(406)
          .json({ error: "Revisa la información de la petición" });
      return res.status(200).json({
        message: "Cliente asignado",
      });
    }

    default:
      return res.status(405).json({ error: "Method not allowed" });
  }
}
