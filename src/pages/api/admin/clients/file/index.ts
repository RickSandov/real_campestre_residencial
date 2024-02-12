import { NextApiRequest, NextApiResponse } from "next";
import { connect, disconnect } from "server/database";
import { verifyToken } from "server/helpers/auth";
import { getClient } from "server/helpers/clients";
import { deleteFile } from "server/lib/s3";

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
    case "DELETE": {
      const { key, clientId } = req.query;
      const client = await getClient(clientId as string);
      await deleteFile(key as string);
      await connect();
      const { docs } = client;
      client.docs = docs.filter((doc: any) => doc.key !== key);
      await client.save();
      await disconnect();
      return res.status(200).json({
        message: "hello, success on [DELETE]: admin/clients/file?key=" + key,
      });
    }

    default:
      return res.status(405).json({ error: "Method not allowed" });
  }
}
