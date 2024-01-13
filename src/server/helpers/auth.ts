import { IUser } from "interfaces";
import { jwtVerify } from "jose";
import jwt from "jsonwebtoken";
import { getUser } from "./users";

const secret = process.env.SECRET || "";
const expiresIn = "24h";

export const createToken = (userId: string) => {
  const token = jwt.sign({ userId }, secret, { expiresIn });
  return `${token}`;
};

export async function verifyToken(token: string): Promise<IUser | null> {
  try {
    const data = jwt.verify(token, secret);
    const userId = (data as { userId: string }).userId;
    if (!userId) return null;
    const user = await getUser(userId);
    return user;
  } catch (error) {
    console.log("verifyToken(): ", { error });
    return null;
  }
}
