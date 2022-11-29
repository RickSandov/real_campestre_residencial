import { IContactForm } from "interfaces";
import type { NextApiRequest, NextApiResponse } from "next";
import { connect, disconnect } from "server/database";
import { sendEmail } from "server/helpers";
import { FormContact } from "server/models";

type Data = {
  message: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const { body, method } = req;

  switch (method) {
    case "POST": {
      try {
        const { email, name, phoneNumber, message } = body as IContactForm;
        await connect();
        const contactExists = await FormContact.findOne({ phoneNumber });

        if (!contactExists) {
          const newContact = new FormContact(body);
          await newContact.save();
        }

        await disconnect();
        await sendEmail(body);

        return res.status(201).json({
          message: "Mensaje enviado con éxito",
        });
      } catch (error) {
        await disconnect();
        res.status(500);
      }
    }

    default:
      res.status(404);
  }
}
