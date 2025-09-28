import type { NextApiRequest, NextApiResponse } from 'next';
import { GoogleGenerativeAI } from '@google/generative-ai';

type Body = {
  message: string;
  apiKey: string;
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', ['POST']);
    return res.status(405).end('Method Not Allowed');
  }

  const { message, apiKey } = req.body as Body;
  if (!apiKey) return res.status(400).json({ error: 'API key tidak disertakan' });

  try {
    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({ model: 'gemini-2.5-flash' });

    const result = await model.generateContent(message);
    const reply = result.response.text();

    res.status(200).json({ reply });
  } catch (err: any) {
    console.error('Error ke Gemini:', err);
    res.status(500).json({ error: 'Gagal memanggil Gemini API', detail: err.message || err.toString() });
  }
}