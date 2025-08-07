import { NextRequest, NextResponse } from "next/server";
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { v4 as uuid } from "uuid";

const s3 = new S3Client({
  region: process.env.S3_UPLOAD_REGION!,
  credentials: {
    accessKeyId: process.env.S3_UPLOAD_KEY!,
    secretAccessKey: process.env.S3_UPLOAD_SECRET!,
  },
});

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const filename = searchParams.get("filename");
  const filetype = searchParams.get("filetype");

  if (!filename || !filetype) {
    return NextResponse.json({ error: "Missing parameters" }, { status: 400 });
  }

  const key = `images/${uuid()}-${filename}`;

  const command = new PutObjectCommand({
    Bucket: "the-not-project-storage",
    Key: key,
    ContentType: filetype,
  });

  const uploadUrl = await getSignedUrl(s3, command, { expiresIn: 60 }); // expires in 60s

  return NextResponse.json({
    uploadUrl,
    publicUrl: `https://the-not-project-storage.s3.amazonaws.com/${key}`,
  });
}
