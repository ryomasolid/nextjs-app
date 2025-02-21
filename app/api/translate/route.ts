import { NextResponse } from 'next/server';
import {
  TranslateClient,
  TranslateTextCommand,
} from '@aws-sdk/client-translate';

const translateClient = new TranslateClient({
  region: process.env.MY_REGION,
  credentials: {
    accessKeyId: process.env.MY_ACCESS_KEY_ID!,
    secretAccessKey: process.env.MY_SECRET_ACCESS_KEY!,
  },
});

export async function POST(req: Request) {
  try {
    const { text, sourceLang, targetLang } = await req.json();

    if (!text || !sourceLang || !targetLang) {
      return NextResponse.json({ error: 'Invalid request' }, { status: 400 });
    }

    const command = new TranslateTextCommand({
      Text: text,
      SourceLanguageCode: sourceLang,
      TargetLanguageCode: targetLang,
    });

    const response = await translateClient.send(command);

    return NextResponse.json({ translatedText: response.TranslatedText });
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    console.error('Translation error:', error + translateClient + 'あああ');
    return NextResponse.json(
      { error: `Translation failed: ${error.message || error}` },
      { status: 500 }
    );
  }
}
