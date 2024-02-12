import axios from "axios";
import formidable from "formidable";
import { connect, disconnect } from "server/database";
import { getClient } from "server/helpers/clients";
import { uploadFile } from "server/lib/s3";
import fs from "fs";

export const config = {
  api: {
    bodyParser: false,
  },
};

export default async (req: any, res: any) => {
  const form = new formidable.IncomingForm(req);
  form.parse(req, async (err, fields, files) => {
    if (err) {
      console.log(err);
      res.status(500).json({ error: err });
    }
    const { fileName } = fields;
    const file = files.file;
    const { id } = req.query;
    if (!id || !fileName || !file) {
      return res
        .status(406)
        .json({ error: "Revisa la información de la petición" });
    }
    const client = await getClient(id as string);
    await connect();
    // const responseFromS3 = await uploadFile();
    // console.log({ responseFromS3 });
    const key =
      `${fileName}_${client.name}_${String(Date.now())}`.replace(/ /g, "-") +
      "." +
      (file as any).originalFilename.split(".")[1];

    if (file) {
      try {
        const parsedFile = fs.createReadStream((file as any).filepath);
        const url = await uploadFile(parsedFile, key);
        client.docs.push({
          name: fileName,
          key,
          url,
        });
        client.save();
        await disconnect();
      } catch (error) {
        console.log("clients/file/[id] error: ", {
          error: (error as any).request,
        });
      }
    }
    res.status(200).json({});
  });
};
