import formidable from "formidable";

export const config = {
  api: {
    bodyParser: false,
  },
};

export default async (req: any, res: any) => {
  const form = new formidable.IncomingForm(req);
  form.parse(req, (err, fields, files) => {
    const { fileName } = fields;
    const { file } = files;
    console.log({ fileName, file });

    res.status(200).json({});
  });
};
