import { S3Client, HeadObjectCommand, PutObjectCommand } from "@aws-sdk/client-s3";
import { ServiceException } from '@aws-sdk/smithy-client';

import crypto from 'crypto';
import path from 'path';

const BUCKET = process.env.S3_BUCKET_NAME!;


const s3 = new S3Client({
  region: process.env.AWS_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!
  }
});

function hashBuffer(buffer: Buffer): string {
  return crypto
    .createHash('sha256')
    .update(buffer)
    .digest('hex');
}

function buildPublicUrl(key: string) {
  return `https://${BUCKET}.s3.amazonaws.com/${key}`;
}

export async function uploadImageToS3(file: Express.Multer.File): Promise<string> {
  const ext = path.extname(file.originalname).toLowerCase();
  const hash = hashBuffer(file.buffer);
  const key = `posts/${hash}${ext}`;

  console.log("uploading image to bucket");
  await s3.send(
    new PutObjectCommand({
      Bucket: BUCKET,
      Key: key,
      Body: file.buffer,
      ContentType: file.mimetype,
    })
  );

  return buildPublicUrl(key);
}
