import { IClient, IDisplayClient } from "interfaces";
import type { NextApiRequest, NextApiResponse } from "next";
import { verifyToken } from "server/helpers/auth";
import {
  createClient,
  editClient,
  getClientsSearch,
  getDisplayClients,
} from "server/helpers/clients";

type Data =
  | {
      clients:
        | IDisplayClient[]
        | {
            name: string;
            phoneNumber: string;
            _id: string;
          }[];
    }
  | {
      error: string;
    }
  | {
      message: string;
    };

export default async function hanlder(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const { method, cookies, body, query } = req;

  try {
    if (query.search) {
      const { search = "" } = query;
      const clients = await getClientsSearch(search as string);
      return res.status(200).json({
        clients: clients.map(({ name, phoneNumber, _id }: any) => {
          return {
            name,
            phoneNumber,
            _id,
          };
        }),
      });
    }

    const user = await verifyToken(cookies.auth || "");

    if (!user)
      return res.status(404).json({
        error: "Invalid user",
      });

    switch (method) {
      case "GET": {
        const clients = await getDisplayClients(user);
        return res.status(200).json({
          clients,
        });
      }

      case "POST": {
        const { phoneNumber, name } = body;
        const client = await createClient({
          phoneNumber,
          name,
          user,
        });
        if (!client) return res.status(500).json({ error: "Server error" });
        return res.status(201).json({
          message: `Cliente ${client.name} agregado con éxito`,
        });
      }

      default:
        return res.status(405).json({
          error: "Method not allowed",
        });
    }
  } catch (error) {
    return res.status(500).json({ error: "Server Error" });
  }
}
