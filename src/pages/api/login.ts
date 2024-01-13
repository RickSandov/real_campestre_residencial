import type { NextApiRequest, NextApiResponse } from "next";
import { getUser } from "server/helpers/users";
import { createToken } from "../../server/helpers/auth";
import bcrypt from "bcrypt";
import { serialize } from "cookie";
import { IUser } from "interfaces";

type Data =
  | {
      token: string;
      user: IUser;
    }
  | {
      error: string;
    };

export default async function (
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  // res.status(200).json({ name: 'Example' })

  const { method } = req;

  try {
    switch (method) {
      case "POST": {
        const { nickname, password } = req.body;
        const user = await getUser(nickname);
        if (!user) {
          return res
            .status(401)
            .json({ error: "No se pudo autenticar el usuario" });
        }
        const isPasswordCorrect = await bcrypt.compare(password, user.password);

        if (!isPasswordCorrect) {
          return res
            .status(401)
            .json({ error: "No se pudo autenticar el usuario" });
        }
        const token = createToken(user._id);
        res.setHeader(
          "Set-Cookie",
          serialize("auth", token, {
            path: "/",
            httpOnly: true,
            sameSite: "strict",
            maxAge: 60 * 60 * 24 * 30,
          })
        );
        return res.status(200).json({ token, user });
      }

      default:
        return res.status(405).json({
          error: "Method not allowed",
        });
    }
  } catch (error) {
    console.log({ error });
    return res.status(500).json({
      error: "Server error",
    });
  }
}
