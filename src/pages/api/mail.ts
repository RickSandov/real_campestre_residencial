import { IContactForm } from "interfaces";
import type { NextApiRequest, NextApiResponse } from "next";
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

        const contactExists = await FormContact.findOne({ phoneNumber });

        if (!contactExists) {
          const newContact = new FormContact(body);
          await newContact.save();
        }

        await sendEmail(body);

        return res.status(201).json({
          message: "Mensaje enviado con éxito",
        });
      } catch (error) {
        res.status(500);
      }
    }

    default:
      res.status(404);
  }
}
