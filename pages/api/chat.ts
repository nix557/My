import type { NextApiRequest, NextApiResponse } from 'next';

type Body = {
  message?: string;
  apiKey?: string;
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', ['POST']);
    return res.status(405).end('Method Not Allowed');
  }

  const { message } = req.body as Body;
  if (!message) return res.status(400).json({ error: 'Pesan kosong' });

  // Simple fallback implementation (echo + canned replies).
  // Replace this with actual Gemini API call when ready.
  const m = message.toLowerCase();
  let reply = '';

  if (m.includes('halo') || m.includes('hai')) reply = 'Halo! Ada yang bisa saya bantu?';
  else if (m.includes('siapa') && m.includes('kamu')) reply = 'Saya Nixon Assistant — asisten AI kamu.';
  else reply = `Kamu bilang: "${message}". (Ini balasan sementara. Sambungkan API Gemini di server jika ingin balasan nyata.)`;

  // simulate latency
  await new Promise((r) => setTimeout(r, 400));

  res.status(200).json({ reply });
}
