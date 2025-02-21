import { NextResponse } from "next/server"
import { S3Client, PutObjectCommand, ListObjectsV2Command  } from "@aws-sdk/client-s3"
import { v4 as uuidv4 } from "uuid"

const s3Client = new S3Client({
  region: process.env.AWS_REGION,
  endpoint: `https://s3.${process.env.AWS_REGION}.amazonaws.com`,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
  },
})

export async function POST(req: Request) {
  try {
    const data = await req.formData()
    const file = data.get("file") as File

    if (!file) {
      return NextResponse.json({ error: "ファイルが選択されていません" }, { status: 400 })
    }


    const arrayBuffer = await file.arrayBuffer()
    const buffer = Buffer.from(arrayBuffer)
    const fileKey = `uploads/${uuidv4()}_${file.name}`

    const command = new PutObjectCommand({
      Bucket: process.env.AWS_S3_BUCKET_NAME,
      Key: fileKey,
      Body: buffer,
      ContentType: file.type,
      ACL: "public-read",
    })

    try {
      await s3Client.send(command);
    } catch (error) {
      return NextResponse.json({ error: error }, { status: 400 })
    }


    const fileUrl = `https://${process.env.AWS_S3_BUCKET_NAME}.s3.${process.env.AWS_REGION}.amazonaws.com/${fileKey}`

    return NextResponse.json({ fileUrl })
  } catch (error) {
    console.error("S3 アップロードエラー:", error)
    return NextResponse.json({ error: "アップロードに失敗しました" }, { status: 500 })
  }
}

export async function GET() {
  const command = new ListObjectsV2Command({
    Bucket: process.env.AWS_S3_BUCKET_NAME,
    Prefix: 'uploads/',
    Delimiter: '/',
  })

  try {
    const data = await s3Client.send(command)

    const imageKeys = data.Contents?.filter(item => {
      return item.Key?.match(/\.(jpg|jpeg|png|gif)$/)
    }).map(item => item.Key)

    return NextResponse.json({ images: imageKeys })
  } catch (error) {
    return NextResponse.json({ error: "Failed to retrieve images", details: error }, { status: 500 })
  }
}