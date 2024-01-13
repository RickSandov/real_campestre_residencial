import { IUser } from "interfaces";
import { disconnect } from "mongoose";
import type { NextApiRequest, NextApiResponse } from "next";
import { connect } from "server/database";
import { User } from "server/models";
import bcrypt from "bcrypt";

type Data =
  | {
      user: IUser;
    }
  | {
      error: string;
    };

export default async function (
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const { method, body } = req;

  switch (method) {
    case "POST": {
      try {
        const { nickname, phoneNumber, password } = body as IUser;
        await connect();
        const userExists = await User.find({
          "entries.nickname": nickname,
          "entries.phoneNumber": phoneNumber,
        });
        if (userExists.length) {
          await disconnect();
          return res.status(409).json({
            error: "Ya existe el usuario",
          });
        }

        const salt = await bcrypt.genSalt(10);
        body.password = await bcrypt.hash(password, salt);

        const newUser = new User(body);
        await newUser.save();
        await disconnect();
        return res.status(201).json({
          user: newUser,
        });
      } catch (error) {
        console.log(error);
      }
    }

    default:
      return res.status(405).json({
        error: "Method not allowed",
      });
  }
}
