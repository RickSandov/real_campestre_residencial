import S3 from 'aws-sdk/clients/s3';
import dotenv from "dotenv";
import fs from "fs";
dotenv.config();

const bucketName = process.env.AWS_BUCKET_NAME;
const region = process.env.AWS_REGION;
const accessKeyId = process.env.AWS_ACCESS_KEY_ID;
const secretAccessKey = process.env.AWS_SECRET_ACCESS_KEY;

const s3 = new S3({
    region,
    accessKeyId,
    secretAccessKey
})

export async function uploadFile(file, name, formidable) {
    const createReadStream = formidable ? fs.createReadStream(file.filepath) : file.createReadStream;

    const uploadParams = {
        Bucket: bucketName,
        Body: formidable ? createReadStream : createReadStream(),
        Key: name
    }

    return s3.upload(uploadParams).promise();
}


export async function deleteFile(key) {
    const deleteParams = {
        Bucket: bucketName,
        Key: key
    }
    return s3.deleteObject(deleteParams).promise();
}
