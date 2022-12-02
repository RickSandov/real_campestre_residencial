import { EStatus, ETypes, ILot } from "interfaces";
import type { NextApiRequest, NextApiResponse } from "next";
import { connect, disconnect } from "server/database";
import { Lot } from "server/models";

type Data =
  | {
      lots: ILot[];
    }
  | {
      message: string;
    };

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const { method } = req;
  switch (method) {
    case "GET": {
      await connect();
      const lots = await Lot.find();
      await disconnect();
      return res.status(200).json({
        lots,
      });
    }

    case "PATCH": {
      const { body } = req;
      const { lot } = body as { lot: ILot };
      console.log(body);
      await connect();
      const lotToEdit = await Lot.findById(lot._id);
      console.log({ lotToEdit });
      if (lotToEdit) {
        const { section, num, area, price, type, status } = lot;
        lotToEdit.section = section;
        lotToEdit.num = num;
        // lotToEdit.area = area;
        // lotToEdit.price = price;
        // lotToEdit.type = type;
        // lotToEdit.status = status;
        await lotToEdit.save();
        await disconnect();
        console.log(lotToEdit);
        console.log({ lotToEdit });
        return res.status(200).json({ message: "Ok" });
      }
      await disconnect();
      res.status(500);
    }

    default:
      res.status(405);
  }
  // const { body } = req;

  // const lots = body.lots;

  // await connect();

  // let num = 1;

  // for (const lot of lots) {
  //   const newLot: ILot = {
  //     xml: lot,
  //     section: "m",
  //     num,
  //     area: 1,
  //     price: 0,
  //     type: ETypes.a,
  //     status: EStatus.available,
  //   };
  //   num++;
  //   const newLotObj = new Lot(newLot);
  //   await newLotObj.save();
  // }

  // await disconnect();

  // res.status(200).json({ name: "Example" });
}
